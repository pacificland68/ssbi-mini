"use strict";
const common_vendor = require("../../common/vendor.js");
const api_auth = require("../../api/auth.js");
const utils_index = require("../../utils/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    let account = common_vendor.ref("");
    let password = common_vendor.ref("");
    let code = common_vendor.ref("");
    let codeImage = common_vendor.ref();
    let uuid = common_vendor.ref();
    let errors = common_vendor.ref({
      account: "",
      password: "",
      code: ""
    });
    const clearError = (field) => {
      errors.value[field] = "";
    };
    const validateForm = () => {
      let valid = true;
      if (!account.value.trim()) {
        errors.value.account = "邮箱或者手机号不能为空";
        valid = false;
      }
      if (!password.value.trim()) {
        errors.value.password = "密码不能为空";
        valid = false;
      }
      if (!this.code.trim()) {
        errors.value.code = "验证码不能为空";
        valid = false;
      }
      return valid;
    };
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
      if (validateForm()) {
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
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o([($event) => common_vendor.isRef(account) ? account.value = $event.detail.value : account = $event.detail.value, ($event) => clearError("account")]),
        b: common_vendor.unref(account),
        c: common_vendor.unref(errors).account
      }, common_vendor.unref(errors).account ? {
        d: common_vendor.t(common_vendor.unref(errors).account)
      } : {}, {
        e: common_vendor.unref(errors).account ? 1 : "",
        f: common_vendor.o([($event) => common_vendor.isRef(password) ? password.value = $event.detail.value : password = $event.detail.value, ($event) => clearError("password")]),
        g: common_vendor.unref(password),
        h: common_vendor.unref(errors).password
      }, common_vendor.unref(errors).password ? {
        i: common_vendor.t(common_vendor.unref(errors).password)
      } : {}, {
        j: common_vendor.unref(errors).password ? 1 : "",
        k: common_vendor.o([($event) => common_vendor.isRef(code) ? code.value = $event.detail.value : code = $event.detail.value, ($event) => clearError("code")]),
        l: common_vendor.unref(code),
        m: common_vendor.unref(codeImage)
      }, common_vendor.unref(codeImage) ? {
        n: common_vendor.unref(codeImage),
        o: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(api_auth.authCaptcha) && common_vendor.unref(api_auth.authCaptcha)(...args)
        )
      } : {
        p: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(api_auth.authCaptcha) && common_vendor.unref(api_auth.authCaptcha)(...args)
        )
      }, {
        q: common_vendor.unref(errors).code
      }, common_vendor.unref(errors).code ? {
        r: common_vendor.t(common_vendor.unref(errors).code)
      } : {}, {
        s: common_vendor.unref(errors).code ? 1 : "",
        t: common_vendor.o(handleLogin),
        v: common_vendor.o(jumpRegister)
      });
    };
  }
});
wx.createPage(_sfc_main);
