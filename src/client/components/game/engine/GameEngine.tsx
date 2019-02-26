import * as React from 'react';
import { AppConsumer } from '@inlet/react-pixi';
import { MainGameMenu } from './../menu/MainGameMenu';

interface IGameEngineProps {
  app: PIXI.Application;
}

interface IGameEngineState {
  backgroundColor: number;
}

export default class GameEngine extends React.Component<IGameEngineProps, IGameEngineState> {
  constructor(props: IGameEngineProps) {
    super(props);
    window.addEventListener('resize', () => {
      this.resizeGameScreen(window.innerWidth, window.innerHeight);
    });
    this.props.app.renderer.view.style.position = 'absolute';
    this.props.app.renderer.view.style.display = 'block';
    this.props.app.renderer.autoResize = true;
    this.state = {
      backgroundColor: 0x012b30,
    };
    console.log('pixi engine started ! !');
  }

  public resizeGameScreen(width: number, height: number): void {
    this.props.app.renderer.resize(width, height);
  }

  public render() {
    return (
      <>
        <AppConsumer>{app => <MainGameMenu app={app} />}</AppConsumer>
      </>
    );
  }
}
