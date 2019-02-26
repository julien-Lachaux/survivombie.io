import * as React from 'react';
import * as PIXI from 'pixi.js';
import { Sprite } from '@inlet/react-pixi';

interface IMainGameMenuProps {
    app: PIXI.Application;
}

enum IMouvement {
    'top',
    'bottom',
    'left',
    'right',
    'topLeft',
    'topRight',
    'bottomLeft',
    'bottomRight',
    'static'
}

interface IMainGameMenuState {
    position: PIXI.Point;
    mouvement: IMouvement;
}

const KeypressFunctions = [];
const KeyupFunctions = [];
function keyListener(event: KeyboardEvent, functionsArray: any) {
    const key = event.key;
    if (functionsArray[key.charCodeAt(0)] !== undefined) {
        functionsArray[key.charCodeAt(0)].call();
    }
}

// TODO refaire le system de mouvement
export class Player extends React.Component<IMainGameMenuProps, IMainGameMenuState> {

    public vitesse: number = 0.9;

    constructor(props: IMainGameMenuProps) {
        super(props);
        this.state = {
            position: new PIXI.Point(this.props.app.screen.width / 2, this.props.app.screen.height / 2),
            mouvement: IMouvement.static
        };
    }

    public componentDidMount(): void {
        // touche enfoncé
        KeypressFunctions['z'.charCodeAt(0)] = () => { this.move(IMouvement.top); };
        KeypressFunctions['s'.charCodeAt(0)] = () => { this.move(IMouvement.bottom); };
        KeypressFunctions['q'.charCodeAt(0)] = () => { this.move(IMouvement.left); };
        KeypressFunctions['d'.charCodeAt(0)] = () => { this.move(IMouvement.right); };
        document.addEventListener('keydown', (event: KeyboardEvent) => { keyListener(event, KeypressFunctions); });

        // touche relaché
        KeyupFunctions['z'.charCodeAt(0)] = () => { this.stopMove(IMouvement.top); };
        KeyupFunctions['s'.charCodeAt(0)] = () => { this.stopMove(IMouvement.bottom); };
        KeyupFunctions['q'.charCodeAt(0)] = () => { this.stopMove(IMouvement.left); };
        KeyupFunctions['d'.charCodeAt(0)] = () => { this.stopMove(IMouvement.right); };
        document.addEventListener('keyup', (event: KeyboardEvent) => { keyListener(event, KeyupFunctions); });
    }

    public tick = (delta: number): void => {
        switch (this.state.mouvement) {
            // mouvement classique
            case IMouvement.top:
                this.setState({ position: new PIXI.Point(this.state.position.x, this.state.position.y - this.vitesse) });
                break;
            case IMouvement.bottom:
                this.setState({ position: new PIXI.Point(this.state.position.x, this.state.position.y + this.vitesse) });
                break;
            case IMouvement.left:
                this.setState({ position: new PIXI.Point(this.state.position.x - this.vitesse, this.state.position.y) });
                break;
            case IMouvement.right:
                this.setState({ position: new PIXI.Point(this.state.position.x + this.vitesse, this.state.position.y) });
                break;

            // mouvement combiné
            case IMouvement.topLeft:
                this.setState({ position: new PIXI.Point(this.state.position.x - this.vitesse, this.state.position.y - this.vitesse) });
                break;
        }
    }

    /**
     * mouvement du joueur
     * UP: y--
     * DOWN: y++
     * LEFT: x--
     * RIGHT: x++
     */
    public move(direction: IMouvement): void {
        if (this.state.mouvement !== direction) {
            if (this.state.mouvement === IMouvement.top && direction === IMouvement.left || this.state.mouvement === IMouvement.left && direction === IMouvement.top) { // top left
                this.setState({ mouvement: IMouvement.topLeft });
            } else if (this.state.mouvement === IMouvement.top && direction === IMouvement.right || this.state.mouvement === IMouvement.right && direction === IMouvement.top) { // top right
                this.setState({ mouvement: IMouvement.topRight });
            } else if (this.state.mouvement === IMouvement.bottom && direction === IMouvement.left || this.state.mouvement === IMouvement.left && direction === IMouvement.bottom) { // bottom left
                this.setState({ mouvement: IMouvement.bottomLeft });
            } else if (this.state.mouvement === IMouvement.bottom && direction === IMouvement.right || this.state.mouvement === IMouvement.right && direction === IMouvement.top) { // bottom right
                this.setState({ mouvement: IMouvement.bottomRight });
            } else {
                this.setState({ mouvement: direction });
            }
            this.props.app.ticker.add(this.tick);
        }
    }

    public stopMove(direction: IMouvement): void {
        if (this.state.mouvement === direction) {
            this.setState({ mouvement: IMouvement.static });
            this.props.app.ticker.remove(this.tick);
        } else {
            // resolve change direction
        }
    }

    public render() {
        return <Sprite
            x={this.state.position.x}
            y={this.state.position.y}
            image={'https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png'}
            scale={new PIXI.Point(1, 1)}
            anchor={new PIXI.ObservablePoint(() => {}, {}, 0.5)}
            interactive={true}
            pointerdown={() => {
                this.tick(1);
            }}
        />;
    }
}