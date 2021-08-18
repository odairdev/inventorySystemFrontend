import { Router } from 'react-router-dom'
import { AuthContextProvider } from './contexts/auth';

import { Routes } from './routes';
import history from './routes/history';


function App() {
  return (

    <AuthContextProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthContextProvider>

  );
}

export default App;
