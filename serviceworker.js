/* 监听安装事件，install 事件一般是被用来设置你的浏览器的离线缓存逻辑 */
this.addEventListener('install', function (event) {

	/* 通过这个方法可以防止缓存未完成，就关闭serviceWorker */
	event.waitUntil(
		/* 创建一个名叫V1的缓存版本 */
		caches.open('v1').then(function (cache) {
			/* 指定要缓存的内容，地址为相对于跟域名的访问路径 */
			return cache.addAll([
				'.',
				'index.html',
				'main.js',
				'base.css',
				'main.css',
				'weather.css',
				'waves.min.css',
				'waves.min.js',
				'jquery.min.js'
			]);
		})
	);
});

/* 注册fetch事件，拦截全站的请求 */
this.addEventListener('fetch', function (event) {
	try {
		event.respondWith(caches.match(event.request));
	} catch (error) {
		;
	}
});