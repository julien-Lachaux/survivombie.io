import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getVersion } from '../shared/utils';
// Pages
import { Header } from './components/header/Header';
import { Home } from './components/home/Home';
import Game from './components/game/Game';
import { UsersList } from './components/user/UsersList';

const css = require('./App.css');

console.log(`The App version is ${getVersion()}`);

const AppImpl = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path='/' component={Game} />
      </Switch>
    </div>
  </BrowserRouter>
);

export const App = hot(module)(AppImpl);
