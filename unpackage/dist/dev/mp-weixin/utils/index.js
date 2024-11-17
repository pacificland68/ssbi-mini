"use strict";
function isPhoneOrEmail(str) {
  const phoneRegex = /^1[3-9]\d{9}$/;
  const emailRegex = /@/;
  if (phoneRegex.test(str)) {
    return 2;
  } else if (emailRegex.test(str)) {
    return 1;
  } else {
    return 3;
  }
}
exports.isPhoneOrEmail = isPhoneOrEmail;
