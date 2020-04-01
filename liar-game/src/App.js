import React from 'react';
import {Route, HashRouter } from 'react-router-dom';
import SettingGames from './pages/SettingGames';
import SelectForm from './pages/SelectForm';
import Success from './pages/Success';
import LoadingForm from './pages/LoadingForm';

function App() {
  return (
    <HashRouter>
      <div>
        <Route exact path="/" component={SettingGames} />
        <Route path="/selectform" component={SelectForm} />
        <Route path="/success:myKey" component={Success} />
        <Route path="/loading" component={LoadingForm} />
      </div>
    </HashRouter>

  );
}

export default App;
