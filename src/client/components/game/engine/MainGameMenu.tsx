import * as React from 'react';
import * as PIXI from 'pixi.js';
import { Sprite, Text } from '@inlet/react-pixi';
import { Player } from '../entity/Player';

interface IMainGameMenuProps {
    app: PIXI.Application;
}

enum GameStatus {'menu', 'game', 'end'}

interface IMainGameMenuState {
    step: GameStatus;
}

export class MainGameMenu extends React.Component<IMainGameMenuProps, IMainGameMenuState> {

    constructor(props: IMainGameMenuProps) {
        super(props);
        this.state = { step: GameStatus.menu };
    }

    public startGame() {
        this.setState({ step: GameStatus.game });
    }

    public stopGame() {
        this.setState({ step: GameStatus.end });
    }

    public exitGame() {
        this.setState({ step: GameStatus.menu });
    }

    public render() {
        switch (this.state.step) {
            case GameStatus.menu:
                return <>
                    <Text
                        text='Welcome To Survivombie.io'
                        x={80}
                        y={50}
                        style={
                            new PIXI.TextStyle({
                                align: 'center',
                                fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                                fontSize: 25,
                                fontWeight: '400',
                                fill: ['#ffffff', '#00ff99'], // gradient
                                strokeThickness: 5,
                                letterSpacing: 10,
                                dropShadow: true,
                                dropShadowColor: '#ccced2',
                                dropShadowBlur: 1,
                                dropShadowAngle: Math.PI / 4,
                                dropShadowDistance: 1,
                                wordWrap: true,
                                wordWrapWidth: 500,
                            })
                        }
                    />
                    <Text
                        text='Start Game'
                        interactive={true}
                        pointerdown={() => {
                            this.startGame();
                        }}
                        x={120}
                        y={250}
                        style={
                            new PIXI.TextStyle({
                                align: 'center',
                                fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                                fontSize: 25,
                                fontWeight: '400',
                                fill: ['#000', '#00ff77'], // gradient
                                strokeThickness: 5,
                                letterSpacing: 10,
                                dropShadow: true,
                                dropShadowColor: '#ccced2',
                                dropShadowBlur: 1,
                                dropShadowAngle: Math.PI / 4,
                                dropShadowDistance: 1,
                                wordWrap: true,
                                wordWrapWidth: 500,
                            })
                        }
                    />
                </>;
                break;
            case GameStatus.game:
                return <Player app={this.props.app} />;
                break;
            default:
                return <></>;
                break;
        }
    }
}