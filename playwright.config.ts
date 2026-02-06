import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    retries: process.env.CI ? 2 : 0,
    use: {
        baseURL: "http://127.0.0.1:8080",
        trace: "on-first-retry",
    },
    webServer: {
        command: "npx grunt connect:playwright",
        url: "http://127.0.0.1:8080",
        reuseExistingServer: false,
    },
});
