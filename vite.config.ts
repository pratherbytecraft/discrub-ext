import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import chromeManifest from "./public/manifest.json";
import { crx, ManifestV3Export } from "@crxjs/vite-plugin";
import { existsSync } from "fs";
import { resolve } from "path";

// @transcend-io/conflux imports its helpers from @babel/runtime-corejs3, which
// drags the core-js polyfills into main.js. The Chrome Web Store flags one of
// them as obfuscated code, so every such import is pointed at a native shim in
// src/vendor/native-runtime instead. An import with no shim fails the build.
const nativeRuntime = resolve(__dirname, "src/vendor/native-runtime");
const nativeRuntimePlugin = {
  name: "native-runtime",
  enforce: "pre" as const,
  resolveId(source: string) {
    const match = /^@babel\/runtime-corejs3\/(.+)$/.exec(source);
    if (!match) return null;
    const shim = resolve(nativeRuntime, `${match[1]}.js`);
    if (!existsSync(shim)) {
      throw new Error(`No native shim for ${source}, add ${shim}`);
    }
    return shim;
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: { main: "index.html", button_injection: "button_injection.html" },
      output: { entryFileNames: "[name].js" },
    },
  },
  plugins: [
    nativeRuntimePlugin,
    react(),
    crx({
      manifest: chromeManifest as ManifestV3Export,
    }),
  ],
});
