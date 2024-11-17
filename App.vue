<script>
	export default {
		onLaunch: function() {
			this.checkAuth()
		},
		onShow: function() {
			this.checkAuth()
		},
		onHide: function() {
			console.log('App Hide')
		},
		
		methods:{
			checkAuth(){
				const isLoggedIn = uni.getStorageSync('isLoggedIn')
				const pages = getCurrentPages()
				const currentPage = pages.length ? pages[pages.length - 1].route : ''
				
				if(!isLoggedIn && currentPage !== 'pages/login/login'){
					uni.redirectTo({
						url: '/pages/login/login'
					})
				}
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
