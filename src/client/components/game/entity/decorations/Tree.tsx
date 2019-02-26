import * as React from 'react';
import * as PIXI from 'pixi.js';
import { Sprite } from '@inlet/react-pixi';
import Decoration from './Decoration';
import { DecorationStatus } from './Decoration';

export enum TreeVariant {
    'spring_1'
}

export default class Tree extends Decoration {

    constructor(props: any) {
        super(props);

        this.name = 'tree';
        this.texturesPack = [
            {
                name: TreeVariant.spring_1,
                src: require('../../../../../../assets/images/decorations/trees/tree-spring_1.png')
            }
        ];
        this.setSpriteTextureFromVariant(this.props.variant);

        this.state = {
            status: DecorationStatus.ok,
        };
    }

    public render() {
        const treeTexture = PIXI.Texture.from(this.textureSrc);
        return (
            <Sprite
                x={this.props.position.x}
                y={this.props.position.y}
                width={150}
                height={150}
                image={this.textureSrc}
                scale={new PIXI.Point(1, 1)}
                anchor={new PIXI.ObservablePoint(() => {}, {}, 0.5)}
            />
        );
    }

    private setSpriteTextureFromVariant(variant: TreeVariant): void {
        const texture = this.texturesPack.find(e => e.name === variant);
        if (texture === undefined) {
            console.log('texture non définie dans le texture pack');
        } else {
            this.textureSrc = texture.src;
        }
    }

}