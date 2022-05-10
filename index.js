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

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: "",
    capsLock: false,
  },

  init() {},
  _createKeys() {},
  _triggerEvent(handlerName) {},
  _toggleCapsLock() {},
  open(initialValue, oninput, onclose) {},
  close() {},
};
