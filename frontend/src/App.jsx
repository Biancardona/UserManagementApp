import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import ProtectedLayout from './layout/ProtectedLayout';
import AccountConfirm from './pages/AccountConfirm';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/AdminUsers';
import { AuthProvider } from './context/AuthProvider';
import { DataLoaderProvider } from './context/DataLoaderProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataLoaderProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='confirmed/:id' element={<AccountConfirm />} />
            </Route>
            <Route path='/admin' element={<ProtectedLayout />}>
              <Route index element={<Admin />} />
            </Route>
          </Routes>
        </DataLoaderProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
