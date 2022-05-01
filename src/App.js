import { useState } from 'react';
import './App.css';
// We divide our app into 3 components: NavBar, MainMint and the App itself
import MainMint from './MainMint';
import NavBar from './NavBar';

function App() {
  const [accounts, setAccounts] = useState([]);
  return (

    <div className="overlay">
      <div className="App">
        <NavBar accounts={accounts} setAccounts={setAccounts} />
        <MainMint accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className="movingBackground"></div>
    </div>
  );
}

export default App;
