import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Protected from './components/Protected';
import UserProvider from './context/UserCtx';
import ChatPage from './pages/Chat';
import SignPage from './pages/Sign';

function App() {
  return (
    <Router>
      <UserProvider>
        <div id="chatbot">
          <Routes>
            <Route path="/:signSlug" element={<SignPage />} />
            <Route
              path="/"
              element={
                <Protected>
                  <ChatPage />
                </Protected>
              }
            />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
