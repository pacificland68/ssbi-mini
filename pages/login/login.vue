<template>
	<view class="login-container">
	    <view class="form-group" :class="{ 'has-error': errors.account }">
	          <input
	            class="input"
	            placeholder="请输入邮箱或者手机号"
	            v-model="account"
	            @input="clearError('account')"
	          />
	          <view v-if="errors.account" class="error-text">{{ errors.account }}</view>
	        </view>
	    
	        <!-- 密码 -->
	        <view class="form-group" :class="{ 'has-error': errors.password }">
	          <input
	            class="input"
	            type="password"
	            placeholder="请输入密码"
	            v-model="password"
	            @input="clearError('password')"
	          />
	          <view v-if="errors.password" class="error-text">{{ errors.password }}</view>
	        </view>
	    
	        <!-- 验证码 -->
	        <view class="form-group" :class="{ 'has-error': errors.code }">
	          <input
	            v-model="code"
	            placeholder="请输入验证码"
	            size="large"
	            @input="clearError('code')"
	          />
	          <span class="loginc_img">
	            <img :src="codeImage" alt="" v-if="codeImage" @click="authCaptcha" />
	            <span v-else @click="authCaptcha">
	              <i class="iconfont icon-refresh"></i>
	              刷新
	            </span>
	          </span>
	          <view v-if="errors.code" class="error-text">{{ errors.code }}</view>
	        </view>

	    <button class="btn" @click="handleLogin">登录</button>
		<view>
			<span>还没有账号？</span><button @click="jumpRegister">注册</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { login, authCaptcha } from '../../api/auth';
	import isPhoneOrEmail from '@/utils/index.js'

	let account = ref("");
	let password = ref("");
	let code = ref("")
	let codeImage = ref()
	let uuid = ref()
	let errors = ref({
		account: "",
		password: "",
		code: ""
	})
	
	// 清除某个错误提示
	const clearError = (field) => {
		errors.value[field] = ""
	}
	
	// 表单校验
	const validateForm = () => {
	      let valid = true;
	
	      // 校验邮箱或手机号
	      if (!account.value.trim()) {
	        errors.value.account = "邮箱或者手机号不能为空";
	        valid = false;
	      }
	
	      // 校验密码
	      if (!password.value.trim()) {
	        errors.value.password = "密码不能为空";
	        valid = false;
	      }
	
	      // 校验验证码
	      if (!this.code.trim()) {
	        errors.value.code = "验证码不能为空";
	        valid = false;
	      }
	
	      return valid;
	    }
	
	// 获取验证码
	authCaptcha().then(res => {
		uuid.value = res.uuid
		codeImage.value = 'data:image/gif;base64,' + res.img;
	})
	
	// 跳转到注册页面
	const jumpRegister = () => {
		uni.redirectTo({
			url:"/pages/login/register"
		})
	}
	
	// 判断邮箱还是手机号
	// const isPhoneOrEmail = (str) => {
	// 	const phoneRegex = /^1[3-9]\d{9}$/;
	// 	  const emailRegex = /@/;
	// 	  //邮箱返回1 电话返回2 未知返回3
	// 	  if (phoneRegex.test(str)) {
	// 	    return 2;
	// 	  } else if (emailRegex.test(str)) {
	// 	    return 1;
	// 	  } else {
	// 	    return 3;
	// 	  }
	// }
	
	const handleLogin = () => {
		
		if(validateForm()){
			let params = {
				account: account.value,
				password: password.value,
				code: code.value,
				loginType: isPhoneOrEmail(account.value),
				uuid: uuid.value
			}
			
			if(isPhoneOrEmail(account.value) === 1){
				params['email'] = account.value
			}else if(isPhoneOrEmail(account.value) === 2){
				params['phoneNumber'] = account.value
			}
			
			login(params).then(res => {
				if(res.code === 200){
					uni.redirectTo({
						url:"/pages/index/index"
					})
				}
			})
		}
	}
</script>

<style lang="less">
.login-container {
  padding: 20px;
}
.form-group {
  margin-bottom: 20px;
}
.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.btn {
  width: 100%;
  padding: 10px;
  background-color: #007aff;
  color: #fff;
  text-align: center;
  border-radius: 4px;
}

.form-group.has-error .input {
  border-color: red;
}

.error-text {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
