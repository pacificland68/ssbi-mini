"use strict";
const common_vendor = require("../../common/vendor.js");
const api_auth = require("../../api/auth.js");
const utils_index = require("../../utils/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    let account = common_vendor.ref();
    let password = common_vendor.ref();
    let code = common_vendor.ref();
    let codeImage = common_vendor.ref();
    let uuid = common_vendor.ref();
    api_auth.authCaptcha().then((res) => {
      uuid.value = res.uuid;
      codeImage.value = "data:image/gif;base64," + res.img;
    });
    const jumpRegister = () => {
      common_vendor.index.redirectTo({
        url: "/pages/login/register"
      });
    };
    const handleLogin = () => {
      if (!account || !password) {
        common_vendor.index.showToast({
          title: "请输入用户名和密码",
          icon: "none"
        });
        return;
      }
      let params = {
        account: account.value,
        password: password.value,
        code: code.value,
        loginType: utils_index.isPhoneOrEmail(account.value),
        uuid: uuid.value
      };
      if (utils_index.isPhoneOrEmail(account.value) === 1) {
        params["email"] = account.value;
      } else if (utils_index.isPhoneOrEmail(account.value) === 2) {
        params["phoneNumber"] = account.value;
      }
      api_auth.login(params).then((res) => {
        if (res.code === 200) {
          common_vendor.index.redirectTo({
            url: "/pages/index/index"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(account),
        b: common_vendor.o(($event) => common_vendor.isRef(account) ? account.value = $event.detail.value : account = $event.detail.value),
        c: common_vendor.unref(password),
        d: common_vendor.o(($event) => common_vendor.isRef(password) ? password.value = $event.detail.value : password = $event.detail.value),
        e: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(api_auth.authCaptcha) && common_vendor.unref(api_auth.authCaptcha)(...args)
        ),
        f: common_vendor.unref(code),
        g: common_vendor.o(($event) => common_vendor.isRef(code) ? code.value = $event.detail.value : code = $event.detail.value),
        h: common_vendor.unref(codeImage)
      }, common_vendor.unref(codeImage) ? {
        i: common_vendor.unref(codeImage),
        j: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(api_auth.authCaptcha) && common_vendor.unref(api_auth.authCaptcha)(...args)
        )
      } : {
        k: common_vendor.t(_ctx.$t("刷新")),
        l: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(api_auth.authCaptcha) && common_vendor.unref(api_auth.authCaptcha)(...args)
        )
      }, {
        m: common_vendor.o(handleLogin),
        n: common_vendor.o(jumpRegister)
      });
    };
  }
});
wx.createPage(_sfc_main);
