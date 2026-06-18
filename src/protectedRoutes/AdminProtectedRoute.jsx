import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";


const AdminProtectedRoute = ({children}) => {
    const token = Cookies.get("admin_jwt_token")

    if (!token) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default AdminProtectedRoute