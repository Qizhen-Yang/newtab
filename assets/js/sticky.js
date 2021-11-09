const EMPTY = "无内容";
const PLACEHOLDER  = "随便记点什么 ...";

function read()
{
	let content = localStorage.getItem("newtabSticky");
	if (content == 0 || content == null)
	{
		$("#savelog").html(EMPTY);
		$("#md").html(PLACEHOLDER);
	}
	else
	{
		$("#sticky").val(content);
		$("#md").html(marked.parse(content));
	}
}

function save()
{
	let content = $("#sticky").val();
	localStorage.setItem("newtabSticky", content);
	if (content == 0 || content == null)
	{
		$("#savelog").html(EMPTY);
		$("#md").html(PLACEHOLDER);
	}
	else
	{
		$("#md").html(marked.parse(content));
		$("#savelog").html("已保存");
	}
}

function printnote()
{
	let p = window.open("打印", "_blank");
	p.document.write($("#md").html());
	p.document.close();
	p.print();
	p.close();
}

function edit()
{
	$("#sticky").css({"height": "20rem", "padding": "0.75rem 1rem", "border": "solid 1px #ffffff"});
	$("#md").css("display", "none");
	$("#sticky").focus();
}

function preview()
{
	$("#sticky").css({"height": "0", "padding": "0", "border": "transparent"});
	$("#md").css("display", "block");
	$("#sticky").focus();
}

read();
preview();