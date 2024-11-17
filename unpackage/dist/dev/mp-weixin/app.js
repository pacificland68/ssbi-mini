"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/login/login.js";
  "./pages/login/register.js";
}
const _sfc_main = {
  onLaunch: function() {
    this.checkAuth();
  },
  onShow: function() {
    this.checkAuth();
  },
  onHide: function() {
    console.log("App Hide");
  },
  methods: {
    checkAuth() {
      const isLoggedIn = common_vendor.index.getStorageSync("isLoggedIn");
      const pages = getCurrentPages();
      const currentPage = pages.length ? pages[pages.length - 1].route : "";
      if (!isLoggedIn && currentPage !== "pages/login/login") {
        common_vendor.index.redirectTo({
          url: "/pages/login/login"
        });
      }
    }
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
