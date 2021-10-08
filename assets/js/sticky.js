const EMPTY = "便笺内容为空"
const PLACEHOLDER  = "随便记点什么 ..."

read();
preview();

function read()
{
	var content = localStorage.getItem("newtabSticky");
	document.getElementById("sticky").value = content;
	document.getElementById("md").innerHTML = marked(content);
	if (content == 0)
	{
		document.getElementById("savelog").innerHTML = EMPTY;
		document.getElementById("md").innerHTML = PLACEHOLDER;
	}
}

function save()
{
	var content = document.getElementById("sticky").value;
	localStorage.setItem("newtabSticky", content);
	document.getElementById("md").innerHTML = marked(content);
	document.getElementById("savelog").innerHTML = new Date().toLocaleString() + " 保存到了 localStorage";
	if (content == 0)
	{
		document.getElementById("savelog").innerHTML = EMPTY;
		document.getElementById("md").innerHTML = PLACEHOLDER;
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
	document.getElementById("md").style.display = "none";
	document.getElementById("sticky").style.display = "block";
	document.getElementById("sticky").focus();
}

function preview()
{
	document.getElementById("sticky").style.display = "none";
	document.getElementById("md").style.display = "block";
}