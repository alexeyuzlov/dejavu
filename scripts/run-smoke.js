const net = require("node:net");
const { spawn } = require("node:child_process");

const mode = process.argv[2] || "preview";
const port = Number(process.env.SMOKE_PORT) || 4173;
const host = "127.0.0.1";
const timeoutMs = Number(process.env.SMOKE_TIMEOUT_MS) || 60_000;
const isWindows = process.platform === "win32";

const serverArgs =
  mode === "dev"
    ? ["run", "dev", "--", "--port", String(port), "--strictPort"]
    : ["run", "preview", "--", "--port", String(port), "--strictPort"];

let serverProcess;

function waitForPort(targetPort, targetHost, timeout) {
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const attempt = () => {
      const socket = net.createConnection(targetPort, targetHost);

      socket.on("connect", () => {
        socket.end();
        resolve();
      });

      socket.on("error", () => {
        socket.destroy();
        if (Date.now() - startTime >= timeout) {
          reject(
            new Error(
              `Timed out waiting for ${targetHost}:${targetPort} after ${timeout}ms`,
            ),
          );
          return;
        }

        setTimeout(attempt, 250);
      });
    };

    attempt();
  });
}

function stopServer() {
  if (!serverProcess || serverProcess.killed) {
    return;
  }

  serverProcess.kill("SIGTERM");
}

function handleSignal(signal) {
  stopServer();
  process.exit(signal === "SIGINT" ? 130 : 1);
}

process.on("SIGINT", handleSignal);
process.on("SIGTERM", handleSignal);

async function run() {
  serverProcess = spawn("npm", serverArgs, {
    stdio: "inherit",
    shell: isWindows,
  });

  serverProcess.on("exit", (code) => {
    if (code && code !== 0) {
      process.exit(code);
    }
  });

  try {
    await waitForPort(port, host, timeoutMs);
  } catch (error) {
    stopServer();
    throw error;
  }

  const testProcess = spawn("npx", ["playwright", "test"], {
    stdio: "inherit",
    shell: isWindows,
  });

  testProcess.on("exit", (code) => {
    stopServer();
    process.exit(code ?? 1);
  });
}

run().catch((error) => {
  stopServer();
  console.error(error.message || error);
  process.exit(1);
});
