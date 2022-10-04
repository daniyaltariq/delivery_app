import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/dasboard';
import SignIn from './Pages/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={
          <SignIn />
        } />
        <Route path='/dashboard' exact element={
          <Dashboard />
        } />
      </Routes>
    </Router>
  );
}

export default App;
