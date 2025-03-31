import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Header from './components/ui/Header.js';  
import MediaView from './components/Media/MediaView.js';
import DirectorView from './components/Director/DirectorView';
import GeneroView from './components/Genero/GeneroView.js';
import ProductoraView from './components/Productora/ProductoraView';
import TipoView from './components/Tipo/TipoView.js';
;

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={MediaView} />
        <Route exact path='/Director' component={DirectorView} />
        <Route exact path='/Genero' component={GeneroView} />
        <Route exact path='/Productora' component={ProductoraView} />
        <Route exact path='/Tipo' component={TipoView} />
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
