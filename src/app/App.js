
import 'antd/dist/antd.css';
import './App.scss';
import getStreets from '../services/locations';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from "../store/store";
import MainPage from '../pages/main-page';
function App() {
  useEffect(() => {
    getStreets();
  })
  return (
    <Provider store={store}>
      <div className="App">
        <MainPage />
      </div>
    </Provider>
  );
}

export default App;
