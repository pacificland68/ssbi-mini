"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://113.64.244.20:9098/test/unified-gw";
function request(options) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || "GET",
      data: options.data || {},
      header: {
        "Content-Type": "application/json",
        "Authorization": common_vendor.index.getStorageSync("token") || ""
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
exports.request = request;
