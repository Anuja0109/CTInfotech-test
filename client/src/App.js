import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Routes from './routes';
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';
import Alerts from './components/layout/Alerts';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <>
      <Header />
      <Route path='/' component={Landing} exact />
      <section className="container">
        <Alerts />
        <Routes />
      </section>
      </>
    </Router>
    </Provider>
  );
}

export default App;
