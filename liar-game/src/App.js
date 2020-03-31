import React from 'react';
import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom';
import SettingGames from './pages/SettingGames';
import SelectForm from './pages/SelectForm';
import Success from './pages/Success';
import LoadingForm from './pages/LoadingForm';
// import IndexRoute from 'react-router';

function App() {
  return (
    <HashRouter>
      <div>
        hi~!~!
        {/* <Switch> */}
          <Route exact path="/" component={SettingGames} />
          <Route path="/selectform" component={SelectForm} />
          <Route path="/success" component={Success} />
          <Route path="/loading" component={LoadingForm} />
        {/* </Switch> */}
      </div>
    </HashRouter>

  );
}

export default App;
