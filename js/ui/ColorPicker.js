import Pickr from "@simonwep/pickr";

/*
Handles the Pickr color picker creation and life cycle
*/
export class ColorPicker{
    constructor({ element, defaultColor = "#ff0000", onChange }) {
        this.pickr = Pickr.create({
            el: element,
            theme: "classic",

            default: defaultColor,

            components: {
                preview: true,
                opacity: true,
                hue: true,

                interaction: {
                    hex: true,
                    rgba: true,
                    input: true,
                    save: false
                }
            }
        });

        this.pickr.on("change", (color) => {
            if (!color) return;

            const [r, g, b, a] = color.toRGBA();
            onChange?.({ r, g, b, a });
        });
    }

    setColor({ r, g, b, a = 1 }) {
        this.pickr.setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
    }

    show() {
        this.pickr.show();
    }

    hide() {
        this.pickr.hide();
    }

    destroy() {
        this.pickr.destroyAndRemove();
    }
}