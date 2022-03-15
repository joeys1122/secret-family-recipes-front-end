import axios from "axios";

export const isLogin = () => {
  if(localStorage.getItem('token')) return true;
  return false;
}

export const logout = () => {
  localStorage.removeItem('token');
}

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    headers: {
      authorization: token
    },
    baseURL: 'https://bw50-secret-family-recipes.herokuapp.com/api'
  })
}