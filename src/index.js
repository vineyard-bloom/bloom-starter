import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import config from 'config/config.json';
import { WebServiceStub } from 'stubs/web-service-stub';
import { WebService } from 'services/web-service';

import store from 'redux-store/store';
import AppContainer from 'containers/app-container.jsx';
import 'styles/main.scss';

window.WebService = config.app.useWebServiceStub ? new WebServiceStub() : new WebService()

class AppRoot extends React.Component {
  render() {
    return (
      <BrowserRouter history={ createBrowserHistory() }>
        <Provider store={ store }>
          <AppContainer />
        </Provider>
      </BrowserRouter>
    )
  };
}

var docRoot = document.getElementById('root');

ReactDOM.render(<AppRoot />, docRoot);