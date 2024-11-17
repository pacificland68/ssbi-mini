"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
const api_auth = require("../../api/auth.js");
if (!Array) {
  const _component_a_divider = common_vendor.resolveComponent("a-divider");
  _component_a_divider();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "register",
  setup(__props) {
    let regInfo = common_vendor.reactive({});
    const registerSendCode = () => {
      let type = utils_index.isPhoneOrEmail(regInfo.phoneNumberOrEmail);
      if (type == 1) {
        regInfo.email = regInfo.phoneNumberOrEmail;
      } else if (type == 2) {
        regInfo.phoneNumber = regInfo.phoneNumberOrEmail;
      }
      regInfo.loginType = utils_index.isPhoneOrEmail(regInfo.phoneNumberOrEmail);
      getRegisterCaptcha();
    };
    const handleRegister = () => {
      api_auth.register(regInfo).then((res) => {
        console.log("register info", res);
      });
    };
    const getRegisterCaptcha = () => {
      let params = {
        email: regInfo.email,
        phoneNumber: regInfo.phoneNumber
      };
      api_auth.getSendRegisterCode(params).then((res) => {
        common_vendor.index.showToast({
          title: "发送成功",
          duration: 2e3
        });
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(regInfo).fullName,
        b: common_vendor.o(($event) => common_vendor.unref(regInfo).fullName = $event.detail.value),
        c: common_vendor.unref(regInfo).org,
        d: common_vendor.o(($event) => common_vendor.unref(regInfo).org = $event.detail.value),
        e: common_vendor.unref(regInfo).phoneNumberOrEmail,
        f: common_vendor.o(($event) => common_vendor.unref(regInfo).phoneNumberOrEmail = $event.detail.value),
        g: common_vendor.unref(regInfo).password,
        h: common_vendor.o(($event) => common_vendor.unref(regInfo).password = $event.detail.value),
        i: common_vendor.unref(regInfo).passwordCheck,
        j: common_vendor.o(($event) => common_vendor.unref(regInfo).passwordCheck = $event.detail.value),
        k: common_vendor.o(
          //@ts-ignore
          (...args) => _ctx.authCaptcha && _ctx.authCaptcha(...args)
        ),
        l: common_vendor.unref(regInfo).code,
        m: common_vendor.o(($event) => common_vendor.unref(regInfo).code = $event.detail.value),
        n: common_vendor.p({
          type: "vertical"
        }),
        o: common_vendor.o(registerSendCode),
        p: common_vendor.o(handleRegister)
      };
    };
  }
});
wx.createPage(_sfc_main);
