import { BrowserRouter as Router } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './routes';
import { DocumentTitle } from './components/DocumentTitle';
function App() {
  return (
    <AuthProvider>
      <Router>
        <DocumentTitle />
        <AppRouter />
      </Router>
    </AuthProvider>
  );
}

export default App