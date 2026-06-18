import Cookies from "js-cookie"

export const getAdminAuthConfig = () => {
  const token =
    Cookies.get("admin_jwt_token")

  return {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }
}