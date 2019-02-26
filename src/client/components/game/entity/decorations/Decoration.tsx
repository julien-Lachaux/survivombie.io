import * as React from 'react';
import * as PIXI from 'pixi.js';
import { Sprite } from '@inlet/react-pixi';

export interface IDecorationProps {
    variant: any;
    position: PIXI.Point;
}

export interface IDecorationState {
    status: DecorationStatus;
}

export interface ITexturesPackElement {
    name: any;
    src: string;
}

export enum DecorationStatus {
    'ok',
    'break'
}

export default abstract class Decoration extends React.Component<IDecorationProps, IDecorationState> {
    public name: string;
    public textureSrc: string;
    protected texturesPack: ITexturesPackElement[];
}