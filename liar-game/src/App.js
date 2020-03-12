import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SettingGames from './pages/SettingGames';
import SelectForm from './pages/SelectForm';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={SettingGames} />
          <Route path="/selectform" component={SelectForm} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
