$("#contextmenu").hide();

document.oncontextmenu = function (e) {
	$("#contextmenu").css({"left": e.pageX, "top": e.pageY});
	$("#contextmenu").fadeIn(200);
	return false;
}

document.onclick = function (e) {
	if (e.target != $("#contextmenu")[0] && e.target != $("#contextmenu *")[0])
		$("#contextmenu").fadeOut(200);	
}