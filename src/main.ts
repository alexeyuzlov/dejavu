import { Game } from "./game";

window.addEventListener("load", () => {
    const buildSha = import.meta.env.VITE_BUILD_SHA;
    const buildTime = import.meta.env.VITE_BUILD_TIME;

    if (buildSha || buildTime) {
        console.info("Build:", buildSha ?? "unknown", buildTime ?? "unknown");
    }

    new Game();
});
