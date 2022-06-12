import { useState, useEffect } from 'react';
import './App.css';
import MainMint from './MainMint';
import NavBar from './NavBar';

import { 
  useAccount, 
  useNetwork, 
  chain
} from 'wagmi';


function App() {
  const [switchNetReq, setSwitchNet] = useState(false);

  return (
    <div className="App">
      <NavBar switchNetReq={switchNetReq} setSwitchNet={setSwitchNet} />
      <MainMint switchNetReq={switchNetReq} />
    </div>
  );
}

export default App;
