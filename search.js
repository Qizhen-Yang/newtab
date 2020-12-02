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
function searchgoogle()
{
	var google=document.getElementById("google");
	window.open("https://www.google.com/search?q="+google.value);
	location.reload();
}
function searchgooglem()
{
	var googlem=document.getElementById("googlem");
	window.open("https://g.dgclouds.net/search?q="+googlem.value);
	location.reload();
}