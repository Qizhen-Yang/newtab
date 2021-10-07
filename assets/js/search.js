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