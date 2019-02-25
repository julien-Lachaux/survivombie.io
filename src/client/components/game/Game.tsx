import * as React from 'react';
import { Stage, Container, AppConsumer } from '@inlet/react-pixi';
import GameEngine from './engine/GameEngine';

interface IGameProps {
  app: PIXI.Application;
}

interface IGameState {
  backgroundColor: number;
}

export default class Game extends React.Component<IGameProps, IGameState> {
  constructor(props: IGameProps) {
    super(props);
    this.state = {
      backgroundColor: 0x012b30,
    };
  }

  public render() {
    return (
      <>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          options={{
            resolution: 1,
            backgroundColor: this.state.backgroundColor,
          }}
        >
          <Container>
            <AppConsumer>{app => <GameEngine app={app} />}</AppConsumer>
          </Container>
        </Stage>
      </>
    );
  }
}
