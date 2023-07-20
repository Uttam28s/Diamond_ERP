import { route } from '../routes/route';
import { useAuth } from './useAuth';
import { Navigate, Outlet } from 'react-router-dom';


export const PrivateRoute = () => useAuth() ? <Outlet /> : <Navigate to="/login" />;

export const RestrictedRoutes = () => !useAuth() ? <Outlet /> : <Navigate to={routes.addProducts} />