import Cookies from "js-cookie";

export const getAuthConfig = () =>{
    const token = Cookies.get("jwt_token")

    return {headers : { Authorization: `Bearer ${token}`}}
}

