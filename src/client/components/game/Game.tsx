import * as React from 'react';
import { Stage, Container, AppConsumer } from '@inlet/react-pixi';
import { MainGameMenu } from './engine/MainGameMenu';

interface IGameProps {
  app: PIXI.Application;
}

interface IGameState {
  backgroundColor: number;
}

export default class Game extends React.Component<IGameProps, IGameState> {

  constructor(props: IGameProps) {
    super(props);
    window.addEventListener('resize', () => {
      this.resizeGameScreen(window.innerWidth, window.innerHeight);
    });
    this.state = {
      backgroundColor: 0x012b30
    };
    console.log('ok');
  }

  public resizeGameScreen(width: number, height: number): void {
    this.props.app.renderer.resize(width, height);
  }

  public render() {
    return <>
      <Stage width={window.innerWidth} height={window.innerHeight} options={{ backgroundColor: 0x012b30 }}>
          <Container>
              <AppConsumer>
                  {app => <MainGameMenu app={app} />}
              </AppConsumer>
          </Container>
      </Stage>
    </>;
  }
}
