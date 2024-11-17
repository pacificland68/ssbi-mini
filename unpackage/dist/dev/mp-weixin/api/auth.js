"use strict";
const utils_request = require("../utils/request.js");
const common_vendor = require("../common/vendor.js");
let $passwordKey = common_vendor.CryptoJS.enc.Utf8.parse("fE1Lgxq2F4HnUKg32zpIrg==");
function generateRandomCode(length = 16) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const iv = generateRandomCode();
function setEncryption(params) {
  function getEncryptPassword(password) {
    const encryptedContent = common_vendor.CryptoJS.AES.encrypt(password, $passwordKey, {
      iv: common_vendor.CryptoJS.enc.Utf8.parse(iv),
      mode: common_vendor.CryptoJS.mode.CBC,
      padding: common_vendor.CryptoJS.pad.Pkcs7
    });
    return encryptedContent.ciphertext.toString();
  }
  if (params.password) {
    params.password = getEncryptPassword(params.password);
    params.iv = iv;
  }
  console.log(params);
  return params;
}
function login(params) {
  const encryptedParams = setEncryption(params);
  return utils_request.request({
    url: "/web/account/login",
    method: "POST",
    data: encryptedParams
  });
}
function authCaptcha() {
  return utils_request.request({
    url: "/code"
  });
}
function getSendRegisterCode(params) {
  return utils_request.request({
    url: "/web/account/sendRegisterCode",
    method: "POST",
    data: params
  });
}
function register(params) {
  const encryptedParams = setEncryption(params);
  return utils_request.request({
    url: "/web/account/register",
    method: "POST",
    data: encryptedParams
  });
}
exports.authCaptcha = authCaptcha;
exports.getSendRegisterCode = getSendRegisterCode;
exports.login = login;
exports.register = register;
