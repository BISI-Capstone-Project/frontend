import logo from './ac.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './Main';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         BISI Capston Project 2023
        </p>
        <Main />
      </header>
    </div>
  );
}

export default App;
