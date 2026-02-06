import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    retries: process.env.CI ? 2 : 0,
    use: {
        baseURL: "http://127.0.0.1:4173",
        trace: "on-first-retry",
    },
    webServer: {
        command: "npm run build && vite preview --host 0.0.0.0 --port 4173",
        url: "http://127.0.0.1:4173",
        reuseExistingServer: false,
    },
});
