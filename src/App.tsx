import { Toaster } from 'react-hot-toast';
import './App.css';
import Routes from './routes/Index';


function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes />
    </div>
  );
}

export default App;
