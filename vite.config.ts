import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: "node_modules/phaser/build/phaser.min.js",
                    dest: "vendor",
                },
            ],
        }),
    ],
});
