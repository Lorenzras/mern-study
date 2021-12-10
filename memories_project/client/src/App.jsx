import {
  Container, Switch,
} from '@mui/material';

import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/" component={Auth} />
        </Switch>

        <Home />
      </Container>
    </BrowserRouter>
  );
}
