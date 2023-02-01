import { Lightning } from "@lightningjs/sdk";

export class MovieItem extends Lightning.Component {
    static _template() {
        return {
            x: 0,
            y: 0,
            w: 185 + 10,
            h: 265+24+24 + 10,
            Border: {
                x: 0,
                y: 0,
                w: 185 + 10,
                h: 265+24+24 + 10,
                rect: true,
                color: 0x00000000,
                shader: {type: Lightning.shaders.Outline, stroke: 1, color: 0xffaaffff},
                visible: this.bindProp('outline')
            },
            Image: {
                x: 5,
                y: 5,
                w: 185,
                h: 265,
                src: this.bindProp('image_url')
            },
            Title: {
                x: 5,
                y: 265 + 5,
                w: 185,
                h: 48,
                text: {
                    text: this.bindProp('title'),
                    textAlign: 'center',
                    fontSize: this.bindProp('fontSize')
                }
            },
            flexItem: {
                margin: 15
            }
        }
    }

    _handleEnter() {
        
    }

    _focus() {
        this.patch({
            color: 0xff00ff00
        });
    }

    _unfocus() {
        this.patch({
            color: 0xffffffff
        });
    }
}