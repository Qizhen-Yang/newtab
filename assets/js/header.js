date = new Date();

function search()
{
	var n = document.getElementById("engines").selectedIndex;
	var url = [
			"https://www.baidu.com/s?wd=",
			"https://www.bing.com/search?q=",
			"https://goo.gle.workers.dev/search?q=",
			"https://www.zhihu.com/search?q=",
			"https://www.google.com/search?q="];
	window.open(url[n] + document.getElementById("searchbox").value);
	document.getElementById("searchbox").value = "";
}

function fix(num, length)
{
	return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}

function setdate()
{
	document.getElementById('time').innerText = fix(date.getHours(), 2) + ":" + fix(date.getMinutes(), 2);
	document.getElementById('date').innerText = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
}

setInterval("setdate();", 1000);