function searchbaidu()
{
	var baidu=document.getElementById("baidu");
	window.open("https://www.baidu.com/s?wd="+baidu.value);
	location.reload();
}
function searchbing()
{
	var bing=document.getElementById("bing");
	window.open("https://bing.com/search?q="+bing.value);
	location.reload();
}