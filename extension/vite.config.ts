import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import webExtension, {readJsonFile} from "vite-plugin-web-extension";

const generateManifest = () => {
  const manifest = readJsonFile("src/manifest.json");
  const pkg = readJsonFile("package.json");
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

const getOutFolder = (): string => {
  if (process.env.TARGET === "chrome") {
    return "dist/chrome"
  } else if (process.env.TARGET === "firefox") {
    return "dist/firefox"
  } else {
    return "dist"
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true,
    outDir: getOutFolder()
  },
  plugins: [
    vue(),
    webExtension({
      manifest: generateManifest,
      watchFilePaths: ["package.json", "manifest.json"],
      browser: process.env.TARGET || "chrome"
    }),
  ],
});
