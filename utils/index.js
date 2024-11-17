function isPhoneOrEmail(str) {
		const phoneRegex = /^1[3-9]\d{9}$/;
		  const emailRegex = /@/;
		  //邮箱返回1 电话返回2 未知返回3
		  if (phoneRegex.test(str)) {
		    return 2;
		  } else if (emailRegex.test(str)) {
		    return 1;
		  } else {
		    return 3;
		  }
	}
	
export default isPhoneOrEmail