import './App.scss';
import 'regenerator-runtime/runtime';
import 'boarder-components/dist/index.css';
import { h, FunctionalComponent } from 'preact';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import { Container, Flex } from 'boarder-components';

import Header from 'client/components/Header/Header';

const ExploreCards = loadable(
  () => import('client/components/pages/ExploreCards/ExploreCards'),
);

const App: FunctionalComponent = () => {
  return (
    <Container>
      <Flex direction="column" between={4}>
        <Route path="/:login">
          <Header />
        </Route>

        <Switch>
          <Route path="/:login">
            <ExploreCards />
          </Route>
        </Switch>
      </Flex>
    </Container>
  );
};

export default App;
