import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginAdmin from './pages/admin/LoginAdmin';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import UsersCtrl from './pages/admin/UsersCtrl';
import EmpresaCtrl from './pages/admin/EmpresaCtrl';
import EstudianteCtrl from './pages/admin/EstudianteCtrl';
import NotificacionCtrl from './pages/admin/NotificacionCtrl';
import OfertaCtrl from './pages/admin/OfertaCtrl';
import PostulacionCtrl from './pages/admin/PostulacionCtrl';
import SeguimientoCtrl from './pages/admin/SeguimientoCtrl';
import LoginUser from './pages/users/LoginUser';
import DashboardUser from './pages/users/DashboardUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />}>
          <Route path="users" element={<UsersCtrl />} />
          <Route path="empresa" element={<EmpresaCtrl />} />
          <Route path="estudiante" element={<EstudianteCtrl />} />
          <Route path="notificacion" element={<NotificacionCtrl />} />
          <Route path="oferta" element={<OfertaCtrl />} />
          <Route path="postulacion" element={<PostulacionCtrl />} />
          <Route path="seguimiento" element={<SeguimientoCtrl />} />
        </Route>
        <Route path="/login/user" element={<LoginUser />} />
        <Route path="/user/dashboard" element={<DashboardUser />}>
        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;