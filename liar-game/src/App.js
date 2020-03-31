import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SettingGames from './pages/SettingGames';
import SelectForm from './pages/SelectForm';
import Success from './pages/Success';
import LoadingForm from './pages/LoadingForm';
// import IndexRoute from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={SettingGames} />
          {/* <Route path="/selectform" component={SelectForm} />
          <Route path="/success" component={Success} />
          <Route path="/loading" component={LoadingForm} /> */}
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
