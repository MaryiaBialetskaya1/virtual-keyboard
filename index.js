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

  init() {
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard__key");

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },
  _createKeys() {},
  _triggerEvent(handlerName) {},
  _toggleCapsLock() {},
  open(initialValue, oninput, onclose) {},
  close() {},
};
