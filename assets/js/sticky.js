const EMPTY = "无内容"
const PLACEHOLDER  = "随便记点什么 ..."

function read()
{
	var content = localStorage.getItem("newtabSticky");
	if (content == 0 || content == null)
	{
		document.getElementById("savelog").innerHTML = EMPTY;
		document.getElementById("md").innerHTML = PLACEHOLDER;
	}
	else
	{
		document.getElementById("sticky").value = content;
		document.getElementById("md").innerHTML = marked(content);
	}
}

function save()
{
	var content = document.getElementById("sticky").value;
	localStorage.setItem("newtabSticky", content);
	if (content == 0 || content == null)
	{
		document.getElementById("savelog").innerHTML = EMPTY;
		document.getElementById("md").innerHTML = PLACEHOLDER;
	}
	else
	{
		document.getElementById("md").innerHTML = marked(content);
		document.getElementById("savelog").innerHTML = "已保存";
	}
}

function printnote()
{
	var p = window.open("打印", "_blank");
	p.document.write(document.getElementById("md").innerHTML);
	p.document.close();
	p.print();
	p.close();
}

function edit()
{
	document.getElementById("sticky").style.height = "20rem";
	document.getElementById("sticky").style.padding = "0.75rem 1rem";
	document.getElementById("sticky").style.border = "solid 1px #ffffff";
	document.getElementById("md").style.display = "none";
	document.getElementById("sticky").focus();
}

function preview()
{
	document.getElementById("sticky").style.height = "0";
	document.getElementById("sticky").style.padding = "0";
	document.getElementById("sticky").style.border = "transparent";
	document.getElementById("md").style.display = "block";
	document.getElementById("sticky").focus();
}

read();
preview();