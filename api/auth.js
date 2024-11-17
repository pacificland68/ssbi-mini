import request from '@/utils/request'
import CryptoJS from 'crypto-js';

let $passwordKey =CryptoJS.enc.Utf8.parse('fE1Lgxq2F4HnUKg32zpIrg==') ;
function generateRandomCode(length = 16) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return  result
 
}

const iv=generateRandomCode()
function setEncryption(params) {
  function getEncryptPassword (password){
    const encryptedContent = CryptoJS.AES.encrypt(password, $passwordKey , {
      iv:  CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,  
      padding: CryptoJS.pad.Pkcs7
    })
    return encryptedContent.ciphertext.toString()
  }
 
 
  if (params.password) {
    params.password=getEncryptPassword(params.password)
    params.iv=iv
  }
  console.log(params);
  return params
  
}

// 登录
export function login(params) {
  const encryptedParams = setEncryption(params)
  return request({
    url: "/web/account/login",
    method: "POST",
    data: encryptedParams
  });
}

// 获取图形验证码
export function authCaptcha(){
	return request({
		url: "/code"
	})
}

// 获取手机号或者邮箱验证码
export function getSendRegisterCode(params){
	return request({
		url: "/web/account/sendRegisterCode",
		method: "POST",
		data: params
	})
}

// 注册
export function register(params) {
	const encryptedParams = setEncryption(params)
	return request({
		url: "/web/account/register",
		method: "POST",
		data: encryptedParams
	})
}