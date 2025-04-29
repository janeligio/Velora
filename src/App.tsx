import Routes from './routes';
import { AuthProvider } from './providers/auth-provider';
import { SessionManager } from './providers/session-manager-provider';
import { ThemeProvider } from './providers/theme-provider';
// import { PageLogger } from './components/PageLogger/PageLogger';
import './App.css';

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <SessionManager>
            {/* <PageLogger /> */}
            <Routes />
          </SessionManager>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
