import axios from "axios";

const baseURL = process.env.REACT_APP_URL_USERS_API;

const register = (phone, password, fullName, role) => {
  return axios.post(baseURL, "/create", {
    phoneNum: phone,
    password,
    fullName,
    role,
  });
};

const login = (phone, password) => {
  return axios
    .post(baseURL + "/login", {
      phone,
      password,
    })
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
