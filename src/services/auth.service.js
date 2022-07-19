// Authentication Service: 
import axios from "axios";

const API_URL = "https://mawingu.cbaloop.com/cba/api/v1/"

// Login Function and save token to local storage.
const login = (username, password) => {
    return axios.post(API_URL + "access/login", {
        username,
        password
    }).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

// Logout Function
const logout = () => {
   localStorage.removeItem("user"); 
}

// Get Current User Function
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const AuthService = {
    login,
    logout,
    getCurrentUser
};
export default AuthService;
