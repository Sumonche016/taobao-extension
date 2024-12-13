import type { Manifest } from "webextension-polyfill";

const manifest: Manifest.WebExtensionManifest = {
  manifest_version: 3,
  name: "Kiebo Google Extension",
  version: "1.0",
  description: "Kiebo Google Extension",
  permissions: ["activeTab", "sidePanel", "storage"],

  options_ui: {
    page: "src/pages/options/index.html",
  },
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: {
      "128": "icon128.png",
    },
  },
  // rewrite newtab content to custom page
  // chrome_url_overrides: {
  //   newtab: 'src/pages/newtab/index.html',
  // },
  devtools_page: "src/pages/devtools/index.html",
  // @ts-ignore
  side_panel: {
    default_path: "src/pages/panel/index.html",
  },
  icons: {
    "128": "icon128.png",
  },

  content_scripts: [
    {
      matches: [
        "https://item.taobao.com/*",
        "https://detail.tmall.com/*",
        "https://detail.1688.com/*",
      ], //["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["contentStyle.css"],
    },
  ],

  web_accessible_resources: [
    {
      resources: [
        "contentStyle.css",
        "icon128.png",
        "icon48.png",
        "icon32.png",
        "icon16.png",
      ],
      matches: [],
    },
  ],
};

export default manifest;
