function updateTime() {
	let d = new Date();
	let h = d.getHours();
	let m = d.getMinutes();
	h = h < 10 ? '0' + h : h;
	m = m < 10 ? '0' + m : m;
	let y = d.getFullYear();
	let mo = d.getMonth() + 1;
	let dt = d.getDate();
	let time = h + ':' + m;
	let date = y + ' 年 ' + mo + ' 月 ' + dt + ' 日';
	$('#time').text(time);
	$('#date').text(date);
	setTimeout(updateTime, 1000);
}

var current = 1;
var resultList = {
	'百度': 'https://www.baidu.com/s?ie=utf-8&wd=',
	'必应': 'https://www.bing.com/search?q=',
	'谷歌': 'https://www.google.com/search?q=',
	'知乎': 'https://www.zhihu.com/search?type=content&q=',
	'Wikipedia': 'https://zh.wikipedia.org/wiki/',
	'Yandex': 'https://yandex.com/search/?text=',
	'GitHub': 'https://github.com/search?q='
};
$('#result').append('<div id="calc">计算结果</div>');
for (let key in resultList) {
	let item = $('<div>').html('<b>' + key + '</b>' + '<span class="right">搜索</span>');
	item.attr('data-url', resultList[key]);
	item.click(function () {
		current = $(this).index();
		updateResult();
		search();
	});
	$('#result').append(item);
}
function updateResult(show = true) {
	let text = $('#search').val();
	if (text && show) {
		$('#result').slideDown();
		$('#result > .active').removeClass('active');
		$('#result > *').eq(current).addClass('active');
		if (/[0-9+\-*/()^.e\s]+/.exec(text) == text) {
			try {
				text = text.replace('^', '**');
				text = text.replace(/\s/g, '');
				let calc = eval(text).toString();
				if (text == calc) {
					throw 'error';
				}
				else {
					$('#calc').html('<b>= ' + calc.replace('Infinity', '∞') + '</b><span class="right">计算结果</span>');
					$('#calc').slideDown();
				}
			}
			catch {
				$('#calc').slideUp();
			}
		}
		else {
			$('#calc').slideUp();
		}
	}
	else {
		$('#result').slideUp();
		$('#calc').slideUp();
	}
}

$('#search').blur(function () {
	updateResult(false);
});
$('#search').focus(function () {
	updateResult();
});
$('#search').keyup(function () {
	updateResult();
});
$('#search').keydown(function (e) {
	if ($('#search').val()) {
		if (e.keyCode == 38) {
			if (current > 1) {
				current--;
			}
			updateResult();
			return false;
		}
		else if (e.keyCode == 40) {
			if (current < $('#result > *').length - 1) {
				current++;
			}
			updateResult();
			return false;
		}
		else if (e.keyCode == 27) {
			$('#search').blur();
			return false;
		}
	}
});

function search() {
	let url = $('#result > .active').attr('data-url');
	let text = encodeURI($('#search').val());
	if (text) {
		window.open(url + text);
		$('#search').val('');
		updateResult(false);
	}
}

function hitokoto() {
	$('#hitokotoRefresh').hide();
	$.ajax({
		type: 'GET',
		url: 'https://v1.hitokoto.cn/?c=i',
		dataType: 'jsonp',
		success(data) {
			var data_ = eval('(' + data + ')');
			$('#hitokoto').text('「' + data_['hitokoto'] + '」');
			$('#hitokoto').attr('from', '《' + data_['from'] + '》');
			$('#hitokotoRefresh').css('display', '');
		},
		error(textStatus, errorThrown) {
			$('#hitokoto').text('网络错误');
			$('#hitokoto').attr('from', '请稍后再试');
			$('#hitokotoRefresh').css('display', '');
			msg('「一言」加载失败', 'error')
		}
	});
}

function msg(text, type = 'info') {
	let id = ~~(Math.random() * 100);
	$('#msg').append('<div class="' + type + '" id="' + id + '">' + text + '</div>');
	setTimeout(function () {
		$('#' + id).addClass('close');
		setTimeout(function () {
			$('#' + id).remove();
		}, 200);
	}, 1200);
}

function popup(id) {
	$('#mask').fadeIn();
	$('#popup').fadeIn();
	$('#popupContent').html($('#' + id).html());
}
$('#popupClose').click(function () {
	$('#popup').fadeOut();
	$('#mask').fadeOut();
});

WIDGET = {
	"CONFIG": {
		"modules": "1024",
		"background": "5",
		"tmpColor": "FFFFFF",
		"tmpSize": "14",
		"cityColor": "FFFFFF",
		"citySize": "14",
		"aqiSize": "14",
		"weatherIconSize": "24",
		"alertIconSize": "24",
		"padding": "10px 10px 10px 10px",
		"shadow": "0",
		"language": "auto",
		"fixed": "true",
		"vertical": "center",
		"horizontal": "center",
		"left": "10",
		"top": "10",
		"key": "d02d25dc9e674a1889a2af63fd10f1f5"
	}
};

window.onload = function () {
	Waves.attach('button, .button');
	Waves.attach('.list > *', ['waves-effect', 'waves-block']);
	Waves.init();

	updateTime();
	$.ajax({
		type: 'GET',
		url: 'https://ghraw.qizhen-yang.workers.dev/shanru-wang/picaday/main/picaday.json',
		dataType: 'json',
		success(data) {
			msg('图库请求成功', 'success')
			let total = data['max'];
			let bgid = ~~(new Date().getTime() / 86400000) % total + 1;
			$('#bg').attr('src', 'https://ghraw.qizhen-yang.workers.dev/shanru-wang/picaday/main/Picaday/' + bgid + '.JPG');
			msg('正在下载图片');
		},
		error(textStatus, errorThrown) {
			msg('请求图库失败', 'error')
		}
	});
	hitokoto();
	$('body').append('<script src="https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0"></script><script src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>');
	
	$("#version").text("23w03a");
};

// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker.register('serviceworker.js');
// }

document.onerror = function (e, i) {
	console.log(e, i);
}
