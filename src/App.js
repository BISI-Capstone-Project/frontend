import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Main from './Main';

function App() {
  return (
    <div className="App">
      <div>
        <ToastContainer />
      </div>
      <Main />
    </div>
  );
}

export default App;
