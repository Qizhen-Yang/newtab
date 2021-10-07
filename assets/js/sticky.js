function read()
{
	document.getElementById("sticky").value = localStorage.getItem("newtabSticky");
}

function save()
{
	localStorage.setItem("newtabSticky", document.getElementById("sticky").value);
	document.getElementById("savelog").innerText = new Date().toLocaleString() + "\t保存到了 localStorage";
}