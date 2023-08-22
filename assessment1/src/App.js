import { Provider } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeComponent from './components/HomeComponent';
import { store } from './redux/store';
import { TreeView } from './components/TreeView';

function App() {
  return (
    <Provider store={store}>
      {/* <HomeComponent/> */}
      <TreeView/>
    </Provider>
  );
}

export default App;
