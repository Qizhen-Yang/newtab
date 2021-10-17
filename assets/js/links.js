function formatLinks()
{
	$("#link-buttons").children("a").addClass("button");
	$("#link-buttons").children("a").attr("target", "_blank");
}

function readLinks()
{
	var links = localStorage.getItem("newtabLinks");
	if (links != 0 && links != null)
	{
		$("#link-buttons").html(links);
	}
}

function saveLinks()
{
	var links = $("#link-buttons").html();
	localStorage.setItem("newtabLinks", links);
}

formatLinks();
$("#add-link-form").children("input").css({"width": "8rem", "height": "2.4rem", "display": "inline-block"});