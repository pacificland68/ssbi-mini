const BASE_URL = "http://113.64.244.20:9098/test/unified-gw"

function request(options){
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}${options.url}`,
			method: options.method || "GET",
			data: options.data || {},
			header:{
				"Content-Type": "application/json",
				"Authorization": uni.getStorageSync("token") || ""
			},
			success: (res) => {
				if(res.statusCode === 200){
					resolve(res.data)
				}else{
					reject(res.data)
				}
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export default request