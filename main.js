const VERSION = "23w04a";

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
	let date = y + ' �� ' + mo + ' �� ' + dt + ' ��';
	$('#time').text(time);
	$('#date').text(date);
	setTimeout(updateTime, 1000);
}

var current = localStorage.getItem('searchId');
if (current == 0 || current == null) {
	current = 1;
}
var resultList = {
	'�ٶ�': 'https://www.baidu.com/s?ie=utf-8&wd=',
	'��Ӧ': 'https://www.bing.com/search?q=',
	'�ȸ�': 'https://www.google.com/search?q=',
	'֪��': 'https://www.zhihu.com/search?type=content&q=',
	'Wikipedia': 'https://zh.wikipedia.org/wiki/',
	'Yandex': 'https://yandex.com/search/?text=',
	'GitHub': 'https://github.com/search?q='
};
$('#result').append('<div id="calc">������</div>');
for (let key in resultList) {
	let item = $('<div>').html('<b>' + key + '</b>' + '<span class="right">����</span>');
	item.attr('data-url', resultList[key]);
	item.click(function () {
		current = $(this).index();
		updateResult();
		search();
	});
	$('#result').append(item);
}
function updateResult(show = true) {
	localStorage.setItem('searchId', current);
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
					$('#calc').html('<b>= ' + calc.replace('Infinity', '��') + '</b><span class="right">������</span>');
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
			$('#hitokoto').text('��' + data_['hitokoto'] + '��');
			$('#hitokoto').attr('from', '��' + data_['from'] + '��');
			$('#hitokotoRefresh').css('display', '');
		},
		error(textStatus, errorThrown) {
			$('#hitokoto').text('�������');
			$('#hitokoto').attr('from', '���Ժ�����');
			$('#hitokotoRefresh').css('display', '');
			msg('��һ�ԡ�����ʧ��', 'error')
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
		url: 'https://ghraw.qizhen-yang.cn/shanru-wang/picaday/main/picaday.json',
		dataType: 'json',
		success(data) {
			let total = data['max'];
			let bgid = ~~(new Date().getTime() / 86400000) % total + 1;
			$('#bg').attr('src', 'https://ghraw.qizhen-yang.cn/shanru-wang/picaday/main/Picaday/' + bgid + '.JPG');
		},
		error(textStatus, errorThrown) {
			msg('����ͼ��ʧ��', 'error')
		}
	});
	hitokoto();
	$('body').append('<script src="https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0"></script><script src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>');
	
	$("#version").text(VERSION);
};

if ('serviceWorker' in navigator) {
	/* ��ҳ�������ɾʹ���һ��serviceWorker */
	window.addEventListener('load', function () {
		/* ������ָ����Ӧ��ִ������ */
		/* scope �����ǿ�ѡ�ģ���������ָ�������� service worker ���Ƶ����ݵ���Ŀ¼�� ��������������ָ���� '/'����ʾ �������µ��������ݡ���Ҳ��Ĭ��ֵ�� */
		navigator.serviceWorker.register('./serviceworker.js', {scope: './'})
			.then(function (registration) {
				console.log('ServiceWorker registration successful with scope: ', registration.scope);
			})
			.catch(function (err) {

				console.log('ServiceWorker registration failed: ', err);
			});
	});
}

document.onerror = function (e, i) {
	console.log(e, i);
}
