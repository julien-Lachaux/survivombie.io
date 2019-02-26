import * as React from 'react';
import * as PIXI from 'pixi.js';
import { Text, ParticleContainer } from '@inlet/react-pixi';
import { Player } from '../entity/Player';
import Tree from '../entity/decorations/Tree';
import { TreeVariant } from '../entity/decorations/Tree';

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
                const titlePosition = {
                    x: this.props.app.screen.width / 2,
                    y: (this.props.app.screen.height / 3.5),
                    anchor: new PIXI.ObservablePoint(() => {}, {}, 0.5)
                };
                const subTitlePosition = {
                    x: this.props.app.screen.width / 2,
                    y: (this.props.app.screen.height / 2),
                    anchor: new PIXI.ObservablePoint(() => {}, {}, 0.5)
                };
                return <>
                    <Text
                        text='Welcome To Survivombie.io'
                        x={titlePosition.x}
                        y={titlePosition.y}
                        anchor={titlePosition.anchor}
                        style={
                            new PIXI.TextStyle({
                                align: 'center',
                                fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                                fontSize: 65,
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
                        x={subTitlePosition.x}
                        y={subTitlePosition.y}
                        anchor={subTitlePosition.anchor}
                        style={
                            new PIXI.TextStyle({
                                align: 'center',
                                fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                                fontSize: 35,
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
                return <>
                    <Player app={this.props.app} />
                    <ParticleContainer position={[150, 150]} properties={{ position: true }}>
                        <Tree variant={TreeVariant.spring_1} position={new PIXI.Point(250, 250)} />
                        <Tree variant={TreeVariant.spring_1} position={new PIXI.Point(500, 500)} />
                        <Tree variant={TreeVariant.spring_1} position={new PIXI.Point(50, 50)} />
                    </ParticleContainer>
                </>;
                break;
            default:
                return <></>;
                break;
        }
    }
}