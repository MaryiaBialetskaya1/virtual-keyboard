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
  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "`",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "=",
      "backspace",
      "Tab",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "{",
      "}",
      "|",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      ";",
      "'",
      "enter",
      "shift",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "space",
    ];
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["backspace", "|", "enter", "?"].indexOf(key) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--activatable"
          );
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "Tab":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_tab");

          keyElement.addEventListener("click", () => {
            this.properties.value += "   ";
            this._triggerEvent("oninput");
          });

          break;

        case "shift":
          keyElement.classList.add("keyboard__key--wide");

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },
  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },
  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },
  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  },
  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  },
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});

for (let i = 0; i < keyLayout.length; i++) {
  keyLayout[i].setAttribute("keyname", keyLayout[i].innerText);
  keyLayout[i].setAttribute(
    "lowerCaseName",
    keyLayout[i].innerText.toLowerCase()
  );
}
window.addEventListener("keydown", function (e) {
  for (let i = 0; i < keyLayout.length; i++) {
    if (
      e.key == keyLayout[i].getAttribute("keyname") ||
      e.key == keyLayout[i].getAttribute("lowerCaseName")
    ) {
      keyLayout[i].classList.add("active");
    }
    if (e.code == "Space") {
      spaceKey.classList.add("active");
    }
    if (e.code == "ShiftLeft") {
      shift_right.classList.remove("active");
    }
    if (e.code == "ShiftRight") {
      shift_left.classList.remove("active");
    }
    if (e.code == "CapsLock") {
      caps_lock_key.classList.toggle("active");
    }
  }
});

window.addEventListener("keyup", function (e) {
  for (let i = 0; i < keyLayout.length; i++) {
    if (
      e.key == keyLayout[i].getAttribute("keyname") ||
      e.key == keyLayout[i].getAttribute("lowerCaseName")
    ) {
      keyLayout[i].classList.remove("active");
      keyLayout[i].classList.add("remove");
    }
    if (e.code == "Space") {
      spaceKey.classList.remove("active");
      spaceKey.classList.add("remove");
    }
    if (e.code == "ShiftLeft") {
      shift_right.classList.remove("active");
      shift_right.classList.remove("remove");
    }
    if (e.code == "ShiftRight") {
      shift_left.classList.remove("active");
      shift_left.classList.remove("remove");
    }
    setTimeout(() => {
      keyLayout[i].classList.remove("remove");
    }, 200);
  }
});
