//CLICKHUB ENGINE CLICKHUB ENGINE CLICKHUB ENGINE
// VERSION 2.2
main = document.getElementById("main");

const utils = {
    toHex: (n) => {
        var hex = n.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },
    cssToHex: (rgb) => {
        return !rgb.startsWith("rgb")
            ? rgb
            : rgb
                  .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
                  .slice(1)
                  .map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
                  .join("");
    },

    rgb: (r, g, b) => "#" + utils.toHex(r) + utils.toHex(g) + utils.toHex(b),
    hex: (color) => (color[0] != "#" ? "#" + color : color),

    random: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
};

const page = Object.create(null, {
    background: {
        get() {
            return utils.cssToHex(document.body.style.backgroundColor);
        },
        set(color) {
            document.body.style.backgroundColor = color;
        },
        enumerable: true,
    },
    getBackground: {
        value: function () {
            return this.background;
        },
        enumerable: true,
    },
    setBackground: {
        value: function (color) {
            this.background = color;
        },
        enumerable: true,
    },

    title: {
        get() {
            return document.title;
        },
        set(text) {
            document.title = text;
        },
        enumerable: true,
    },
    getTitle: {
        value: function () {
            return this.title;
        },
        enumerable: true,
    },
    setTitle: {
        value: function (text) {
            this.title = text;
        },
        enumerable: true,
    },
});

const lowEngine = Object.create(null, {
    getElement: {
        value: function (id) {
            return document.getElementById(id);
        },
        enumerable: true,
    },
    createElement: {
        value: function (type, text = null) {
            const element = document.createElement(type);

            element.innerHTML = text;
            main.appendChild(element);

            return element;
        },
        enumerable: true,
    },
    appendButton: {
        value: function (obj) {
            Object.defineProperties(obj, {
                onClick: {
                    value: function (func) {
                        this.element.onclick = func;
                        return this;
                    },
                    enumerable: true,
                },
            });
        },
        enumerable: true,
    },
    appendBackground: {
        value: function (obj) {
            Object.defineProperties(obj, {
                background: {
                    get() {
                        return utils.cssToHex(this.element.style.background);
                    },
                    set(value) {
                        this.element.style.background = value;
                    },
                    enumerable: true,
                },
                getBackground: {
                    value: function () {
                        return this.background;
                    },
                    enumerable: true,
                },
                setBackground: {
                    value: function (color) {
                        this.background = color;
                        return this;
                    },
                    enumerable: true,
                },
            });
        },
        enumerable: true,
    },
});

const engine = Object.create(lowEngine, {
    createDefault: {
        value: function (type, text) {
            buttonElement = lowEngine.createElement(type, text);

            outputDefault = Object.create(engine, {
                element: {
                    value: buttonElement,
                },

                color: {
                    get() {
                        console.log(this.element.style.color);
                        return utils.cssToHex(this.element.style.color);
                    },
                    set(value) {
                        this.element.style.color = value;
                    },
                    enumerable: true,
                },
                getColor: {
                    value: function () {
                        return this.color;
                    },
                    enumerable: true,
                },
                setColor: {
                    value: function (color) {
                        this.color = color;
                        return this;
                    },
                    enumerable: true,
                },

                text: {
                    get() {
                        return this.element.innerHTML;
                    },
                    set(value) {
                        this.element.innerHTML = value;
                    },
                    enumerable: true,
                },
                getText: {
                    value: function (text) {
                        return this.text;
                    },
                    enumerable: true,
                },
                setText: {
                    value: function (text) {
                        this.text = text;
                        return this;
                    },
                    enumerable: true,
                },

                moveTo: {
                    value: function (beforeElement) {
                        main.insertBefore(this.element, beforeElement.element);
                        return this;
                    },
                    enumerable: true,
                },

                visible: {
                    get() {
                        return this.element.style.display != "none";
                    },
                    set(value) {
                        this.element.style.display = value ? "" : "none";
                    },
                    enumerable: true,
                },
                show: {
                    value: function () {
                        this.visible = true;
                        return this;
                    },
                    enumerable: true,
                },
                hide: {
                    value: function () {
                        this.visible = false;
                        return this;
                    },
                    enumerable: true,
                },

                delete: {
                    value: function () {
                        main.removeChild(this.element);
                    },
                    enumerable: true,
                },
            });

            return outputDefault;
        },
    },
    createHeader: {
        value: function (text) {
            outputHeader = engine.createDefault("h1", text);
            return outputHeader;
        },
        enumerable: true,
    },
    createText: {
        value: function (text) {
            outputText = engine.createDefault("h3", text);
            return outputText;
        },
        enumerable: true,
    },
    createButton: {
        value: function (text) {
            outputButton = engine.createDefault("button", text);
            lowEngine.appendButton(outputButton);
            lowEngine.appendBackground(outputButton);

            return outputButton;
        },
        enumerable: true,
    },
    space: {
        value: function (amount) {
            divSpace = document.createElement("div");

            for (let i = 0; i < amount; i++) {
                divSpace.appendChild(document.createElement("br"));
            }

            main.appendChild(divSpace);
            return divSpace;
        },
        enumerable: true,
    },
});

engine.createInput = Object.create(engine, {
    default: {
        value: function (type) {
            inputDefault = engine.createDefault("input");
            inputDefault.element.type = type;

            return inputDefault;
        },
        enumerable: false,
    },
    text: {
        value: function () {
            inputText = engine.createInput.default("text");
            lowEngine.appendBackground(inputText);

            Object.defineProperties(inputText, {
                value: {
                    get() {
                        return this.element.value;
                    },
                    set(value) {
                        this.element.value = value;
                    },
                },
                getValue: {
                    value: function () {
                        return this.value;
                    },
                    enumerable: true,
                },
                setValue: {
                    value: function (value) {
                        this.value = value;
                        return value;
                    },
                    enumerable: true,
                },
            });

            inputText.getValue = function () {
                return this.element.value;
            };
            inputText.setValue = function (value) {
                this.element.value = value;
                return value;
            };

            return inputText;
        },
        enumerable: true,
    },
    textArea: {
        value: function () {
            inputTextArea = engine.createInput.default("textarea");
            lowEngine.appendBackground(inputTextArea);

            Object.defineProperties(inputTextArea, {
                value: {
                    get() {
                        return this.element.value;
                    },
                    set(value) {
                        this.element.value = value;
                    },
                },
                getValue: {
                    value: function () {
                        return this.value;
                    },
                    enumerable: true,
                },
                setValue: {
                    value: function (value) {
                        this.value = value;
                        return value;
                    },
                    enumerable: true,
                },
            });

            inputText.getValue = function () {
                return this.element.value;
            };
            inputText.setValue = function (value) {
                this.element.value = value;
                return value;
            };

            return inputTextArea;
        },
        enumerable: true,
    },
    button: {
        value: function (text) {
            inputButton = engine.createInput.default("button");
            inputButton.element.value = text;

            lowEngine.appendButton(inputButton);
            lowEngine.appendBackground(inputButton);

            return inputButton;
        },
        enumerable: true,
    },
});
