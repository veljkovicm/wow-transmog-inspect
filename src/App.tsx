import { useEffect } from 'react';

import './App.css';

import { getCharData } from './actions/actions';


const App: React.FC = () => {

  useEffect(() => {
    getCharData('eu', 'twisting-nether', 'cvarak');
  }, []);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
