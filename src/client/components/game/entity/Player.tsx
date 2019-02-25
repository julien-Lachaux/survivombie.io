import * as React from 'react';
import * as PIXI from 'pixi.js';
import { Sprite } from '@inlet/react-pixi';

interface IMainGameMenuProps {
    app: PIXI.Application;
}

interface IMainGameMenuState {
    position: PIXI.Point;
}

const KeypressFunctions = [];
function keyListener(event) {
    event = event || window.event;
    const key = event.key || event.which || event.keyCode;
    KeypressFunctions[key.charCodeAt(0)].call();
}

export class Player extends React.Component<IMainGameMenuProps, IMainGameMenuState> {

    constructor(props: IMainGameMenuProps) {
        super(props);
        this.state = {
            position: new PIXI.Point(250, 250)
        };
    }

    public componentDidMount() {
        KeypressFunctions['z'.charCodeAt(0)] = () => { this.moveUp(); };
        KeypressFunctions['s'.charCodeAt(0)] = () => { this.moveDown(); };
        KeypressFunctions['q'.charCodeAt(0)] = () => { this.moveLeft(); };
        KeypressFunctions['d'.charCodeAt(0)] = () => { this.moveRight(); };

        document.addEventListener('keydown', keyListener);

        console.log(KeypressFunctions);
    }

    /**
     * @TODO a remplacer par attaquer
     */
    public leftClick() { this.moveLeft(); }

    /**
     * mouvement du joueur
     * UP: y--
     * DOWN: y++
     * LEFT: x--
     * RIGHT: x++
     */
    public moveUp() { this.setState({ position: new PIXI.Point(this.state.position.x, this.state.position.y - 10) }); }
    public moveDown() { this.setState({ position: new PIXI.Point(this.state.position.x, this.state.position.y + 10) }); }
    public moveLeft() { this.setState({ position: new PIXI.Point(this.state.position.x - 10, this.state.position.y) }); }
    public moveRight() { this.setState({ position: new PIXI.Point(this.state.position.x + 10, this.state.position.y) }); }

    public render() {
        return <Sprite
            x={this.state.position.x}
            y={this.state.position.y}
            image={'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png'}
            scale={new PIXI.Point(1, 1)}
            anchor={[0.5, 0.5]}
            interactive={true}
            pointerdown={() => {
                this.leftClick();
            }}
        />;
    }
}