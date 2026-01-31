import api from "./api"
import TokenService from "./token-services";
const API_URL = import.meta.env.VITE_AUTH_URL;

const register = async (username, password, name, telephone, email, address) => {
    return await api.post(API_URL + "/register", {
        username,
        password,
        name,
        telephone,
        email,
        address
    });
};

const login = async (username, password) => {
    const response = await api.post(API_URL + "/login", { username, password });
    const { status, data } = response;
    if (status === 200) {
        if (data?.accessToken) {
            TokenService.setUser(data);
        }
    }
    return response;
};

const logout = () => {
    TokenService.removeUser();
    return true;
}

const authenticationService = {
    register,
    login,
    logout
};

export default authenticationService;