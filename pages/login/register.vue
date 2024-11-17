<template>
	<view class="login-container">
	    <view class="form-group">
	      <input class="input" placeholder="请输入真实姓名" v-model="regInfo.fullName" />
	    </view>
		<view class="form-group">
		  <input class="input" placeholder="请输入单位名称" v-model="regInfo.org" />
		</view>
		<view class="form-group">
		  <input class="input" placeholder="请输入手机号或邮箱" v-model="regInfo.phoneNumberOrEmail" />
		</view>
	    <view class="form-group">
	      <input class="input" type="password" placeholder="请输入密码" v-model="regInfo.password" />
	    </view>
		<view class="form-group">
		  <input class="input" type="password" placeholder="确认密码" v-model="regInfo.passwordCheck" />
		</view>
		<view class="form-group">
			<input v-model="regInfo.code" placeholder="请输入验证码" size="large" @search="authCaptcha">
				<template #suffix>
				    <a-divider type="vertical" />
					<span @click="registerSendCode" style="color: #005aea; cursor: pointer; font-size: 14px">获取验证码</span>
				</template>
			</input>
			
		</view>
	    <button class="btn" @click="handleRegister">注册</button>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive } from 'vue'
	import isPhoneOrEmail from '@/utils/index.js'
	import { getSendRegisterCode, register } from '../../api/auth.js'
	
	let regInfo:any = reactive({})
	
	// 获取验证码
	const registerSendCode = () => {
		let type = isPhoneOrEmail(regInfo.phoneNumberOrEmail);
		  if (type == 1) {
		    regInfo.email = regInfo.phoneNumberOrEmail;
		  } else if (type == 2) {
		    regInfo.phoneNumber = regInfo.phoneNumberOrEmail;
		  }
		regInfo.loginType = isPhoneOrEmail(regInfo.phoneNumberOrEmail)
		
		getRegisterCaptcha();
	}
	
	// 请求注册
	const handleRegister = () => {
		register(regInfo).then(res => {
			console.log('register info', res)
		})
	}
	
	// 请求手机或者邮箱的验证码
	const getRegisterCaptcha = () => {
		let params = {
			email: regInfo.email,
			phoneNumber: regInfo.phoneNumber
		}
		getSendRegisterCode(params).then(res => {
			uni.showToast({
				title: '发送成功',
				duration: 2000
			});
			
		})
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
</style>