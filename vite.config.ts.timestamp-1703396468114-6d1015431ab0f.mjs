// vite.config.ts
import react from "file:///C:/Users/ASUS/Dropbox/PC/Desktop/klubstack-extenstion/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve as resolve3 } from "path";
import { defineConfig } from "file:///C:/Users/ASUS/Dropbox/PC/Desktop/klubstack-extenstion/node_modules/vite/dist/node/index.js";

// utils/plugins/make-manifest.ts
import * as fs from "fs";
import * as path from "path";

// utils/log.ts
function colorLog(message, type) {
  let color = type || COLORS.FgBlack;
  switch (type) {
    case "success":
      color = COLORS.FgGreen;
      break;
    case "info":
      color = COLORS.FgBlue;
      break;
    case "error":
      color = COLORS.FgRed;
      break;
    case "warning":
      color = COLORS.FgYellow;
      break;
  }
  console.log(color, message);
}
var COLORS = {
  Reset: "\x1B[0m",
  Bright: "\x1B[1m",
  Dim: "\x1B[2m",
  Underscore: "\x1B[4m",
  Blink: "\x1B[5m",
  Reverse: "\x1B[7m",
  Hidden: "\x1B[8m",
  FgBlack: "\x1B[30m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgYellow: "\x1B[33m",
  FgBlue: "\x1B[34m",
  FgMagenta: "\x1B[35m",
  FgCyan: "\x1B[36m",
  FgWhite: "\x1B[37m",
  BgBlack: "\x1B[40m",
  BgRed: "\x1B[41m",
  BgGreen: "\x1B[42m",
  BgYellow: "\x1B[43m",
  BgBlue: "\x1B[44m",
  BgMagenta: "\x1B[45m",
  BgCyan: "\x1B[46m",
  BgWhite: "\x1B[47m"
};

// package.json
var package_default = {
  name: "vite-web-extension",
  displayName: "KLUBSTACK",
  version: "1.1.0",
  description: "KLUBSTACK - Community Building like never before!",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/JohnBra/web-extension.git"
  },
  scripts: {
    build: "vite build",
    dev: "nodemon",
    webdev: "vite --port 3001 --open"
  },
  type: "module",
  dependencies: {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.15.0",
    "@mui/lab": "^5.0.0-alpha.155",
    "@mui/material": "^5.14.20",
    "@react-spring/web": "^9.7.3",
    axios: "^1.6.2",
    react: "^18.2.0",
    "react-dnd": "^16.0.1",
    "react-dnd-html5-backend": "^16.0.1",
    "react-dom": "^18.2.0",
    "react-draggable": "^4.4.6",
    "react-icons": "^4.12.0",
    "react-router-dom": "^6.21.1",
    vite: "^5.0.6",
    "vite-plugin-css-injected-by-js": "^3.1.1",
    "webextension-polyfill": "^0.10.0"
  },
  devDependencies: {
    "@types/chrome": "^0.0.241",
    "@types/node": "^18.11.18",
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@types/webextension-polyfill": "^0.10.0",
    "@vitejs/plugin-react-swc": "^3.0.1",
    autoprefixer: "^10.4.13",
    "fs-extra": "^11.1.0",
    nodemon: "^2.0.20",
    postcss: "^8.4.21",
    prettier: "^3.0.0",
    "react-modern-drawer": "^1.2.2",
    sass: "^1.69.5",
    tailwindcss: "^3.2.4",
    "ts-node": "^10.9.1",
    typescript: "^4.9.4"
  }
};

// src/manifest.ts
var manifest = {
  manifest_version: 3,
  name: package_default.displayName,
  version: package_default.version,
  description: package_default.description,
  options_ui: {
    page: "src/pages/options/index.html"
  },
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module"
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: {
      "16": "icon16.png",
      "32": "icon32.png",
      "48": "icon48.png",
      "128": "icon128.png"
    }
  },
  // rewrite newtab content to custom page
  // chrome_url_overrides: {
  //   newtab: 'src/pages/newtab/index.html',
  // },
  devtools_page: "src/pages/devtools/index.html",
  // @ts-ignore
  side_panel: {
    default_path: "src/pages/panel/index.html"
  },
  icons: {
    "16": "icon16.png",
    "32": "icon32.png",
    "48": "icon48.png",
    "128": "icon128.png"
  },
  permissions: ["activeTab", "sidePanel"],
  content_scripts: [
    {
      matches: ["https://mail.google.com/*"],
      //["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["contentStyle.css"]
    }
  ],
  web_accessible_resources: [
    {
      resources: [
        "contentStyle.css",
        "icon128.png",
        "icon48.png",
        "icon32.png",
        "icon16.png"
      ],
      matches: []
    }
  ]
};
var manifest_default = manifest;

// utils/plugins/make-manifest.ts
var __vite_injected_original_dirname = "C:\\Users\\ASUS\\Dropbox\\PC\\Desktop\\klubstack-extenstion\\utils\\plugins";
var { resolve } = path;
var outDir = resolve(__vite_injected_original_dirname, "..", "..", "public");
function makeManifest() {
  return {
    name: "make-manifest",
    buildEnd() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }
      const manifestPath = resolve(outDir, "manifest.json");
      fs.writeFileSync(manifestPath, JSON.stringify(manifest_default, null, 2));
      colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
    }
  };
}

// utils/plugins/build-content-script.ts
import { build } from "file:///C:/Users/ASUS/Dropbox/PC/Desktop/klubstack-extenstion/node_modules/vite/dist/node/index.js";
import { resolve as resolve2 } from "path";

// utils/constants.ts
var outputFolderName = "dist";

// utils/plugins/build-content-script.ts
import cssInjectedByJsPlugin from "file:///C:/Users/ASUS/Dropbox/PC/Desktop/klubstack-extenstion/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
var __vite_injected_original_dirname2 = "C:\\Users\\ASUS\\Dropbox\\PC\\Desktop\\klubstack-extenstion\\utils\\plugins";
var packages = [
  {
    content: resolve2(__vite_injected_original_dirname2, "../../", "src/pages/content/index.tsx")
  }
];
var outDir2 = resolve2(__vite_injected_original_dirname2, "../../", outputFolderName);
function buildContentScript() {
  return {
    name: "build-content",
    async buildEnd() {
      for (const _package of packages) {
        await build({
          publicDir: false,
          plugins: [cssInjectedByJsPlugin()],
          build: {
            outDir: outDir2,
            sourcemap: process.env.__DEV__ === "true",
            emptyOutDir: false,
            rollupOptions: {
              input: _package,
              output: {
                entryFileNames: (chunk) => {
                  return `src/pages/${chunk.name}/index.js`;
                }
              }
            }
          },
          configFile: false
        });
      }
      colorLog("Content code build sucessfully", "success");
    }
  };
}

// vite.config.ts
var __vite_injected_original_dirname3 = "C:\\Users\\ASUS\\Dropbox\\PC\\Desktop\\klubstack-extenstion";
var root = resolve3(__vite_injected_original_dirname3, "src");
var pagesDir = resolve3(root, "pages");
var assetsDir = resolve3(root, "assets");
var outDir3 = resolve3(__vite_injected_original_dirname3, outputFolderName);
var publicDir = resolve3(__vite_injected_original_dirname3, "public");
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [react(), makeManifest(), buildContentScript()],
  publicDir,
  build: {
    outDir: outDir3,
    sourcemap: process.env.__DEV__ === "true",
    emptyOutDir: false,
    rollupOptions: {
      external: ["@pages/content/SideMenu"],
      input: {
        devtools: resolve3(pagesDir, "devtools", "index.html"),
        panel: resolve3(pagesDir, "panel", "index.html"),
        background: resolve3(pagesDir, "background", "index.ts"),
        popup: resolve3(pagesDir, "popup", "index.html"),
        newtab: resolve3(pagesDir, "newtab", "index.html"),
        options: resolve3(pagesDir, "options", "index.html")
      },
      output: {
        entryFileNames: (chunk) => `src/pages/${chunk.name}/index.js`
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzIiwgInV0aWxzL2xvZy50cyIsICJwYWNrYWdlLmpzb24iLCAic3JjL21hbmlmZXN0LnRzIiwgInV0aWxzL3BsdWdpbnMvYnVpbGQtY29udGVudC1zY3JpcHQudHMiLCAidXRpbHMvY29uc3RhbnRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQVNVU1xcXFxEcm9wYm94XFxcXFBDXFxcXERlc2t0b3BcXFxca2x1YnN0YWNrLWV4dGVuc3Rpb25cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFTVVNcXFxcRHJvcGJveFxcXFxQQ1xcXFxEZXNrdG9wXFxcXGtsdWJzdGFjay1leHRlbnN0aW9uXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9BU1VTL0Ryb3Bib3gvUEMvRGVza3RvcC9rbHVic3RhY2stZXh0ZW5zdGlvbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgbWFrZU1hbmlmZXN0IGZyb20gXCIuL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdFwiO1xyXG5pbXBvcnQgYnVpbGRDb250ZW50U2NyaXB0IGZyb20gXCIuL3V0aWxzL3BsdWdpbnMvYnVpbGQtY29udGVudC1zY3JpcHRcIjtcclxuaW1wb3J0IHsgb3V0cHV0Rm9sZGVyTmFtZSB9IGZyb20gXCIuL3V0aWxzL2NvbnN0YW50c1wiO1xyXG5cclxuY29uc3Qgcm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKTtcclxuY29uc3QgcGFnZXNEaXIgPSByZXNvbHZlKHJvb3QsIFwicGFnZXNcIik7XHJcbmNvbnN0IGFzc2V0c0RpciA9IHJlc29sdmUocm9vdCwgXCJhc3NldHNcIik7XHJcbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCBvdXRwdXRGb2xkZXJOYW1lKTtcclxuY29uc3QgcHVibGljRGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwicHVibGljXCIpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBzcmNcIjogcm9vdCxcclxuICAgICAgXCJAYXNzZXRzXCI6IGFzc2V0c0RpcixcclxuICAgICAgXCJAcGFnZXNcIjogcGFnZXNEaXIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW3JlYWN0KCksIG1ha2VNYW5pZmVzdCgpLCBidWlsZENvbnRlbnRTY3JpcHQoKV0sXHJcbiAgcHVibGljRGlyLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXIsXHJcbiAgICBzb3VyY2VtYXA6IHByb2Nlc3MuZW52Ll9fREVWX18gPT09IFwidHJ1ZVwiLFxyXG4gICAgZW1wdHlPdXREaXI6IGZhbHNlLFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogW1wiQHBhZ2VzL2NvbnRlbnQvU2lkZU1lbnVcIl0sXHJcbiAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgZGV2dG9vbHM6IHJlc29sdmUocGFnZXNEaXIsIFwiZGV2dG9vbHNcIiwgXCJpbmRleC5odG1sXCIpLFxyXG4gICAgICAgIHBhbmVsOiByZXNvbHZlKHBhZ2VzRGlyLCBcInBhbmVsXCIsIFwiaW5kZXguaHRtbFwiKSxcclxuICAgICAgICBiYWNrZ3JvdW5kOiByZXNvbHZlKHBhZ2VzRGlyLCBcImJhY2tncm91bmRcIiwgXCJpbmRleC50c1wiKSxcclxuICAgICAgICBwb3B1cDogcmVzb2x2ZShwYWdlc0RpciwgXCJwb3B1cFwiLCBcImluZGV4Lmh0bWxcIiksXHJcbiAgICAgICAgbmV3dGFiOiByZXNvbHZlKHBhZ2VzRGlyLCBcIm5ld3RhYlwiLCBcImluZGV4Lmh0bWxcIiksXHJcbiAgICAgICAgb3B0aW9uczogcmVzb2x2ZShwYWdlc0RpciwgXCJvcHRpb25zXCIsIFwiaW5kZXguaHRtbFwiKSxcclxuICAgICAgfSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IChjaHVuaykgPT4gYHNyYy9wYWdlcy8ke2NodW5rLm5hbWV9L2luZGV4LmpzYCxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQVNVU1xcXFxEcm9wYm94XFxcXFBDXFxcXERlc2t0b3BcXFxca2x1YnN0YWNrLWV4dGVuc3Rpb25cXFxcdXRpbHNcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQVNVU1xcXFxEcm9wYm94XFxcXFBDXFxcXERlc2t0b3BcXFxca2x1YnN0YWNrLWV4dGVuc3Rpb25cXFxcdXRpbHNcXFxccGx1Z2luc1xcXFxtYWtlLW1hbmlmZXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9BU1VTL0Ryb3Bib3gvUEMvRGVza3RvcC9rbHVic3RhY2stZXh0ZW5zdGlvbi91dGlscy9wbHVnaW5zL21ha2UtbWFuaWZlc3QudHNcIjtpbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCBjb2xvckxvZyBmcm9tICcuLi9sb2cnO1xyXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi4vLi4vc3JjL21hbmlmZXN0JztcclxuaW1wb3J0IHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSc7XHJcblxyXG5jb25zdCB7IHJlc29sdmUgfSA9IHBhdGg7XHJcblxyXG5jb25zdCBvdXREaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJ3B1YmxpYycpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZU1hbmlmZXN0KCk6IFBsdWdpbk9wdGlvbiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6ICdtYWtlLW1hbmlmZXN0JyxcclxuICAgIGJ1aWxkRW5kKCkge1xyXG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMob3V0RGlyKSkge1xyXG4gICAgICAgIGZzLm1rZGlyU3luYyhvdXREaXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBtYW5pZmVzdFBhdGggPSByZXNvbHZlKG91dERpciwgJ21hbmlmZXN0Lmpzb24nKTtcclxuXHJcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMobWFuaWZlc3RQYXRoLCBKU09OLnN0cmluZ2lmeShtYW5pZmVzdCwgbnVsbCwgMikpO1xyXG5cclxuICAgICAgY29sb3JMb2coYE1hbmlmZXN0IGZpbGUgY29weSBjb21wbGV0ZTogJHttYW5pZmVzdFBhdGh9YCwgJ3N1Y2Nlc3MnKTtcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFTVVNcXFxcRHJvcGJveFxcXFxQQ1xcXFxEZXNrdG9wXFxcXGtsdWJzdGFjay1leHRlbnN0aW9uXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBU1VTXFxcXERyb3Bib3hcXFxcUENcXFxcRGVza3RvcFxcXFxrbHVic3RhY2stZXh0ZW5zdGlvblxcXFx1dGlsc1xcXFxsb2cudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0FTVVMvRHJvcGJveC9QQy9EZXNrdG9wL2tsdWJzdGFjay1leHRlbnN0aW9uL3V0aWxzL2xvZy50c1wiO3R5cGUgQ29sb3JUeXBlID0gXCJzdWNjZXNzXCIgfCBcImluZm9cIiB8IFwiZXJyb3JcIiB8IFwid2FybmluZ1wiIHwga2V5b2YgdHlwZW9mIENPTE9SUztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yTG9nKG1lc3NhZ2U6IHN0cmluZywgdHlwZT86IENvbG9yVHlwZSkge1xyXG4gIGxldCBjb2xvcjogc3RyaW5nID0gdHlwZSB8fCBDT0xPUlMuRmdCbGFjaztcclxuXHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlIFwic3VjY2Vzc1wiOlxyXG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0dyZWVuO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgXCJpbmZvXCI6XHJcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnQmx1ZTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiZXJyb3JcIjpcclxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdSZWQ7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcIndhcm5pbmdcIjpcclxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdZZWxsb3c7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2coY29sb3IsIG1lc3NhZ2UpO1xyXG59XHJcblxyXG5jb25zdCBDT0xPUlMgPSB7XHJcbiAgUmVzZXQ6IFwiXFx4MWJbMG1cIixcclxuICBCcmlnaHQ6IFwiXFx4MWJbMW1cIixcclxuICBEaW06IFwiXFx4MWJbMm1cIixcclxuICBVbmRlcnNjb3JlOiBcIlxceDFiWzRtXCIsXHJcbiAgQmxpbms6IFwiXFx4MWJbNW1cIixcclxuICBSZXZlcnNlOiBcIlxceDFiWzdtXCIsXHJcbiAgSGlkZGVuOiBcIlxceDFiWzhtXCIsXHJcbiAgRmdCbGFjazogXCJcXHgxYlszMG1cIixcclxuICBGZ1JlZDogXCJcXHgxYlszMW1cIixcclxuICBGZ0dyZWVuOiBcIlxceDFiWzMybVwiLFxyXG4gIEZnWWVsbG93OiBcIlxceDFiWzMzbVwiLFxyXG4gIEZnQmx1ZTogXCJcXHgxYlszNG1cIixcclxuICBGZ01hZ2VudGE6IFwiXFx4MWJbMzVtXCIsXHJcbiAgRmdDeWFuOiBcIlxceDFiWzM2bVwiLFxyXG4gIEZnV2hpdGU6IFwiXFx4MWJbMzdtXCIsXHJcbiAgQmdCbGFjazogXCJcXHgxYls0MG1cIixcclxuICBCZ1JlZDogXCJcXHgxYls0MW1cIixcclxuICBCZ0dyZWVuOiBcIlxceDFiWzQybVwiLFxyXG4gIEJnWWVsbG93OiBcIlxceDFiWzQzbVwiLFxyXG4gIEJnQmx1ZTogXCJcXHgxYls0NG1cIixcclxuICBCZ01hZ2VudGE6IFwiXFx4MWJbNDVtXCIsXHJcbiAgQmdDeWFuOiBcIlxceDFiWzQ2bVwiLFxyXG4gIEJnV2hpdGU6IFwiXFx4MWJbNDdtXCIsXHJcbn0gYXMgY29uc3Q7XHJcbiIsICJ7XHJcbiAgXCJuYW1lXCI6IFwidml0ZS13ZWItZXh0ZW5zaW9uXCIsXHJcbiAgXCJkaXNwbGF5TmFtZVwiOiBcIktMVUJTVEFDS1wiLFxyXG4gIFwidmVyc2lvblwiOiBcIjEuMS4wXCIsXHJcbiAgXCJkZXNjcmlwdGlvblwiOiBcIktMVUJTVEFDSyAtIENvbW11bml0eSBCdWlsZGluZyBsaWtlIG5ldmVyIGJlZm9yZSFcIixcclxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcclxuICBcInJlcG9zaXRvcnlcIjoge1xyXG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXHJcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9Kb2huQnJhL3dlYi1leHRlbnNpb24uZ2l0XCJcclxuICB9LFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcImJ1aWxkXCI6IFwidml0ZSBidWlsZFwiLFxyXG4gICAgXCJkZXZcIjogXCJub2RlbW9uXCIsXHJcbiAgICBcIndlYmRldlwiOiBcInZpdGUgLS1wb3J0IDMwMDEgLS1vcGVuXCJcclxuICB9LFxyXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQGVtb3Rpb24vcmVhY3RcIjogXCJeMTEuMTEuMVwiLFxyXG4gICAgXCJAZW1vdGlvbi9zdHlsZWRcIjogXCJeMTEuMTEuMFwiLFxyXG4gICAgXCJAbXVpL2ljb25zLW1hdGVyaWFsXCI6IFwiXjUuMTUuMFwiLFxyXG4gICAgXCJAbXVpL2xhYlwiOiBcIl41LjAuMC1hbHBoYS4xNTVcIixcclxuICAgIFwiQG11aS9tYXRlcmlhbFwiOiBcIl41LjE0LjIwXCIsXHJcbiAgICBcIkByZWFjdC1zcHJpbmcvd2ViXCI6IFwiXjkuNy4zXCIsXHJcbiAgICBcImF4aW9zXCI6IFwiXjEuNi4yXCIsXHJcbiAgICBcInJlYWN0XCI6IFwiXjE4LjIuMFwiLFxyXG4gICAgXCJyZWFjdC1kbmRcIjogXCJeMTYuMC4xXCIsXHJcbiAgICBcInJlYWN0LWRuZC1odG1sNS1iYWNrZW5kXCI6IFwiXjE2LjAuMVwiLFxyXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXHJcbiAgICBcInJlYWN0LWRyYWdnYWJsZVwiOiBcIl40LjQuNlwiLFxyXG4gICAgXCJyZWFjdC1pY29uc1wiOiBcIl40LjEyLjBcIixcclxuICAgIFwicmVhY3Qtcm91dGVyLWRvbVwiOiBcIl42LjIxLjFcIixcclxuICAgIFwidml0ZVwiOiBcIl41LjAuNlwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1jc3MtaW5qZWN0ZWQtYnktanNcIjogXCJeMy4xLjFcIixcclxuICAgIFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTAuMFwiXHJcbiAgfSxcclxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcIkB0eXBlcy9jaHJvbWVcIjogXCJeMC4wLjI0MVwiLFxyXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4xOC4xMS4xOFwiLFxyXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMC4yN1wiLFxyXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjAuMTBcIixcclxuICAgIFwiQHR5cGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIl4wLjEwLjBcIixcclxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI6IFwiXjMuMC4xXCIsXHJcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjEzXCIsXHJcbiAgICBcImZzLWV4dHJhXCI6IFwiXjExLjEuMFwiLFxyXG4gICAgXCJub2RlbW9uXCI6IFwiXjIuMC4yMFwiLFxyXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4yMVwiLFxyXG4gICAgXCJwcmV0dGllclwiOiBcIl4zLjAuMFwiLFxyXG4gICAgXCJyZWFjdC1tb2Rlcm4tZHJhd2VyXCI6IFwiXjEuMi4yXCIsXHJcbiAgICBcInNhc3NcIjogXCJeMS42OS41XCIsXHJcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuMi40XCIsXHJcbiAgICBcInRzLW5vZGVcIjogXCJeMTAuOS4xXCIsXHJcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNC45LjRcIlxyXG4gIH1cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFTVVNcXFxcRHJvcGJveFxcXFxQQ1xcXFxEZXNrdG9wXFxcXGtsdWJzdGFjay1leHRlbnN0aW9uXFxcXHNyY1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQVNVU1xcXFxEcm9wYm94XFxcXFBDXFxcXERlc2t0b3BcXFxca2x1YnN0YWNrLWV4dGVuc3Rpb25cXFxcc3JjXFxcXG1hbmlmZXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9BU1VTL0Ryb3Bib3gvUEMvRGVza3RvcC9rbHVic3RhY2stZXh0ZW5zdGlvbi9zcmMvbWFuaWZlc3QudHNcIjtpbXBvcnQgdHlwZSB7IE1hbmlmZXN0IH0gZnJvbSBcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiO1xyXG5pbXBvcnQgcGtnIGZyb20gXCIuLi9wYWNrYWdlLmpzb25cIjtcclxuXHJcbmNvbnN0IG1hbmlmZXN0OiBNYW5pZmVzdC5XZWJFeHRlbnNpb25NYW5pZmVzdCA9IHtcclxuICBtYW5pZmVzdF92ZXJzaW9uOiAzLFxyXG4gIG5hbWU6IHBrZy5kaXNwbGF5TmFtZSxcclxuICB2ZXJzaW9uOiBwa2cudmVyc2lvbixcclxuICBkZXNjcmlwdGlvbjogcGtnLmRlc2NyaXB0aW9uLFxyXG4gIG9wdGlvbnNfdWk6IHtcclxuICAgIHBhZ2U6IFwic3JjL3BhZ2VzL29wdGlvbnMvaW5kZXguaHRtbFwiLFxyXG4gIH0sXHJcbiAgYmFja2dyb3VuZDoge1xyXG4gICAgc2VydmljZV93b3JrZXI6IFwic3JjL3BhZ2VzL2JhY2tncm91bmQvaW5kZXguanNcIixcclxuICAgIHR5cGU6IFwibW9kdWxlXCIsXHJcbiAgfSxcclxuICBhY3Rpb246IHtcclxuICAgIGRlZmF1bHRfcG9wdXA6IFwic3JjL3BhZ2VzL3BvcHVwL2luZGV4Lmh0bWxcIixcclxuICAgIGRlZmF1bHRfaWNvbjoge1xyXG4gICAgICBcIjE2XCI6IFwiaWNvbjE2LnBuZ1wiLFxyXG4gICAgICBcIjMyXCI6IFwiaWNvbjMyLnBuZ1wiLFxyXG4gICAgICBcIjQ4XCI6IFwiaWNvbjQ4LnBuZ1wiLFxyXG4gICAgICBcIjEyOFwiOiBcImljb24xMjgucG5nXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgLy8gcmV3cml0ZSBuZXd0YWIgY29udGVudCB0byBjdXN0b20gcGFnZVxyXG4gIC8vIGNocm9tZV91cmxfb3ZlcnJpZGVzOiB7XHJcbiAgLy8gICBuZXd0YWI6ICdzcmMvcGFnZXMvbmV3dGFiL2luZGV4Lmh0bWwnLFxyXG4gIC8vIH0sXHJcbiAgZGV2dG9vbHNfcGFnZTogXCJzcmMvcGFnZXMvZGV2dG9vbHMvaW5kZXguaHRtbFwiLFxyXG4gIC8vIEB0cy1pZ25vcmVcclxuICBzaWRlX3BhbmVsOiB7XHJcbiAgICBkZWZhdWx0X3BhdGg6IFwic3JjL3BhZ2VzL3BhbmVsL2luZGV4Lmh0bWxcIixcclxuICB9LFxyXG4gIGljb25zOiB7XHJcbiAgICBcIjE2XCI6IFwiaWNvbjE2LnBuZ1wiLFxyXG4gICAgXCIzMlwiOiBcImljb24zMi5wbmdcIixcclxuICAgIFwiNDhcIjogXCJpY29uNDgucG5nXCIsXHJcbiAgICBcIjEyOFwiOiBcImljb24xMjgucG5nXCIsXHJcbiAgfSxcclxuICBwZXJtaXNzaW9uczogW1wiYWN0aXZlVGFiXCIsIFwic2lkZVBhbmVsXCJdLFxyXG4gIGNvbnRlbnRfc2NyaXB0czogW1xyXG4gICAge1xyXG4gICAgICBtYXRjaGVzOiBbXCJodHRwczovL21haWwuZ29vZ2xlLmNvbS8qXCJdLCAvL1tcImh0dHA6Ly8qLypcIiwgXCJodHRwczovLyovKlwiLCBcIjxhbGxfdXJscz5cIl0sXHJcbiAgICAgIGpzOiBbXCJzcmMvcGFnZXMvY29udGVudC9pbmRleC5qc1wiXSxcclxuICAgICAgY3NzOiBbXCJjb250ZW50U3R5bGUuY3NzXCJdLFxyXG4gICAgfSxcclxuICBdLFxyXG4gIHdlYl9hY2Nlc3NpYmxlX3Jlc291cmNlczogW1xyXG4gICAge1xyXG4gICAgICByZXNvdXJjZXM6IFtcclxuICAgICAgICBcImNvbnRlbnRTdHlsZS5jc3NcIixcclxuICAgICAgICBcImljb24xMjgucG5nXCIsXHJcbiAgICAgICAgXCJpY29uNDgucG5nXCIsXHJcbiAgICAgICAgXCJpY29uMzIucG5nXCIsXHJcbiAgICAgICAgXCJpY29uMTYucG5nXCIsXHJcbiAgICAgIF0sXHJcbiAgICAgIG1hdGNoZXM6IFtdLFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFuaWZlc3Q7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQVNVU1xcXFxEcm9wYm94XFxcXFBDXFxcXERlc2t0b3BcXFxca2x1YnN0YWNrLWV4dGVuc3Rpb25cXFxcdXRpbHNcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQVNVU1xcXFxEcm9wYm94XFxcXFBDXFxcXERlc2t0b3BcXFxca2x1YnN0YWNrLWV4dGVuc3Rpb25cXFxcdXRpbHNcXFxccGx1Z2luc1xcXFxidWlsZC1jb250ZW50LXNjcmlwdC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvQVNVUy9Ecm9wYm94L1BDL0Rlc2t0b3Ava2x1YnN0YWNrLWV4dGVuc3Rpb24vdXRpbHMvcGx1Z2lucy9idWlsZC1jb250ZW50LXNjcmlwdC50c1wiO2ltcG9ydCBjb2xvckxvZyBmcm9tICcuLi9sb2cnO1xyXG5pbXBvcnQgeyBQbHVnaW5PcHRpb24sIGJ1aWxkIH0gZnJvbSAndml0ZSc7IFxyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IG91dHB1dEZvbGRlck5hbWUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWNzcy1pbmplY3RlZC1ieS1qcydcclxuXHJcbmNvbnN0IHBhY2thZ2VzID0gW1xyXG4gIHtcclxuICAgIGNvbnRlbnQ6ICByZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLycsICdzcmMvcGFnZXMvY29udGVudC9pbmRleC50c3gnKVxyXG4gIH0sXHJcbl07XHJcblxyXG5jb25zdCBvdXREaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLycsICBvdXRwdXRGb2xkZXJOYW1lKTsgXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZENvbnRlbnRTY3JpcHQoKTogUGx1Z2luT3B0aW9uIHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ2J1aWxkLWNvbnRlbnQnLFxyXG4gICAgYXN5bmMgYnVpbGRFbmQoKSB7XHJcbiAgICAgIGZvciAoY29uc3QgX3BhY2thZ2Ugb2YgcGFja2FnZXMpIHtcclxuICAgICAgICBhd2FpdCBidWlsZCh7XHJcbiAgICAgICAgICBwdWJsaWNEaXI6IGZhbHNlLFxyXG4gICAgICAgICAgcGx1Z2luczogWyBjc3NJbmplY3RlZEJ5SnNQbHVnaW4oKSBdLFxyXG4gICAgICAgICAgYnVpbGQ6IHtcclxuICAgICAgICAgICAgb3V0RGlyLFxyXG4gICAgICAgICAgICBzb3VyY2VtYXA6IHByb2Nlc3MuZW52Ll9fREVWX18gPT09ICd0cnVlJyxcclxuICAgICAgICAgICAgZW1wdHlPdXREaXI6IGZhbHNlLFxyXG4gICAgICAgICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgaW5wdXQ6IF9wYWNrYWdlLFxyXG4gICAgICAgICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgICAgICAgZW50cnlGaWxlTmFtZXM6IChjaHVuaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gYHNyYy9wYWdlcy8ke2NodW5rLm5hbWV9L2luZGV4LmpzYDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjb25maWdGaWxlOiBmYWxzZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBjb2xvckxvZygnQ29udGVudCBjb2RlIGJ1aWxkIHN1Y2Vzc2Z1bGx5JywgJ3N1Y2Nlc3MnKTtcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEFTVVNcXFxcRHJvcGJveFxcXFxQQ1xcXFxEZXNrdG9wXFxcXGtsdWJzdGFjay1leHRlbnN0aW9uXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBU1VTXFxcXERyb3Bib3hcXFxcUENcXFxcRGVza3RvcFxcXFxrbHVic3RhY2stZXh0ZW5zdGlvblxcXFx1dGlsc1xcXFxjb25zdGFudHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0FTVVMvRHJvcGJveC9QQy9EZXNrdG9wL2tsdWJzdGFjay1leHRlbnN0aW9uL3V0aWxzL2NvbnN0YW50cy50c1wiO2V4cG9ydCBjb25zdCBvdXRwdXRGb2xkZXJOYW1lID0gJ2Rpc3QnO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStWLE9BQU8sV0FBVztBQUNqWCxTQUFTLFdBQUFBLGdCQUFlO0FBQ3hCLFNBQVMsb0JBQW9COzs7QUNGb1gsWUFBWSxRQUFRO0FBQ3JhLFlBQVksVUFBVTs7O0FDQ1AsU0FBUixTQUEwQixTQUFpQixNQUFrQjtBQUNsRSxNQUFJLFFBQWdCLFFBQVEsT0FBTztBQUVuQyxVQUFRLE1BQU07QUFBQSxJQUNaLEtBQUs7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLElBQ0YsS0FBSztBQUNILGNBQVEsT0FBTztBQUNmO0FBQUEsSUFDRixLQUFLO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxJQUNGLEtBQUs7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLEVBQ0o7QUFFQSxVQUFRLElBQUksT0FBTyxPQUFPO0FBQzVCO0FBRUEsSUFBTSxTQUFTO0FBQUEsRUFDYixPQUFPO0FBQUEsRUFDUCxRQUFRO0FBQUEsRUFDUixLQUFLO0FBQUEsRUFDTCxZQUFZO0FBQUEsRUFDWixPQUFPO0FBQUEsRUFDUCxT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QUEsWUFDbkMsYUFBYTtBQUFBLFlBQ2IsZUFBZTtBQUFBLGNBQ2IsT0FBTztBQUFBLGNBQ1AsUUFBUTtBQUFBLGdCQUNOLGdCQUFnQixDQUFDLFVBQVU7QUFDekIseUJBQU8sYUFBYSxNQUFNLElBQUk7QUFBQSxnQkFDaEM7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBLFlBQVk7QUFBQSxRQUNkLENBQUM7QUFBQSxNQUNIO0FBQ0EsZUFBUyxrQ0FBa0MsU0FBUztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUNGOzs7QUx6Q0EsSUFBTUMsb0NBQW1DO0FBT3pDLElBQU0sT0FBT0MsU0FBUUMsbUNBQVcsS0FBSztBQUNyQyxJQUFNLFdBQVdELFNBQVEsTUFBTSxPQUFPO0FBQ3RDLElBQU0sWUFBWUEsU0FBUSxNQUFNLFFBQVE7QUFDeEMsSUFBTUUsVUFBU0YsU0FBUUMsbUNBQVcsZ0JBQWdCO0FBQ2xELElBQU0sWUFBWUQsU0FBUUMsbUNBQVcsUUFBUTtBQUU3QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLEdBQUcsYUFBYSxHQUFHLG1CQUFtQixDQUFDO0FBQUEsRUFDdkQ7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQUFDO0FBQUEsSUFDQSxXQUFXLFFBQVEsSUFBSSxZQUFZO0FBQUEsSUFDbkMsYUFBYTtBQUFBLElBQ2IsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLHlCQUF5QjtBQUFBLE1BQ3BDLE9BQU87QUFBQSxRQUNMLFVBQVVGLFNBQVEsVUFBVSxZQUFZLFlBQVk7QUFBQSxRQUNwRCxPQUFPQSxTQUFRLFVBQVUsU0FBUyxZQUFZO0FBQUEsUUFDOUMsWUFBWUEsU0FBUSxVQUFVLGNBQWMsVUFBVTtBQUFBLFFBQ3RELE9BQU9BLFNBQVEsVUFBVSxTQUFTLFlBQVk7QUFBQSxRQUM5QyxRQUFRQSxTQUFRLFVBQVUsVUFBVSxZQUFZO0FBQUEsUUFDaEQsU0FBU0EsU0FBUSxVQUFVLFdBQVcsWUFBWTtBQUFBLE1BQ3BEO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0IsQ0FBQyxVQUFVLGFBQWEsTUFBTSxJQUFJO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInJlc29sdmUiLCAicmVzb2x2ZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJyZXNvbHZlIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIm91dERpciIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJyZXNvbHZlIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIm91dERpciJdCn0K
