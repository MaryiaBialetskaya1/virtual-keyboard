const input = document.createElement("textarea");
input.setAttribute("id", "textlabel");
input.setAttribute("type", "text");
input.classList.add("use-keyboard-input");

document.body.appendChild(input);

const label = document.createElement("label");
label.setAttribute("for", "textlabel");
label.innerHTML = "Inset your text here: ";

const textlabelText = document.getElementById("textlabel");
document.body.insertBefore(label, textlabelText);
