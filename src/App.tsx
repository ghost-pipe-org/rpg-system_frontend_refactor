import { BrowserRouter as Router } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './routes';
import { DocumentTitle } from './components/DocumentTitle';
import { ProtectedRoute } from './components/ProtectedRoute';
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