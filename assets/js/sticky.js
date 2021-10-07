const EMPTY = "便笺内容为空"

function read()
{
	var content = localStorage.getItem("newtabSticky")
	document.getElementById("sticky").value = content;
	if (content == "")
		document.getElementById("savelog").innerHTML = EMPTY;
}

function save()
{
	localStorage.setItem("newtabSticky", document.getElementById("sticky").value);
	document.getElementById("savelog").innerHTML = new Date().toLocaleString() + " 保存到了 localStorage";
}

function printnote()
{
	var p = window.open("打印", "_blank");
	p.document.write(document.getElementById("sticky").value);
	p.document.close();
	p.print();
	p.close();
}