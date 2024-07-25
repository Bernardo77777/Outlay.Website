import axios from "axios";

const API_URL = "http://localhost:4242/api/User/";

axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const getAll = () => {
    return axios.get(API_URL);
};

const getById = (number) => {
    return axios.get(API_URL + number);
};

const createORupdate = (id, name, email, password, isAdmin) => {
    if(id == null){
        return create(name, email, password, isAdmin);
    }
    else {
        return update(name, email, password, isAdmin);
    }
};

const create = (name, email, password, isAdmin) => {
    return axios.post(API_URL + "create", { name, email, password, isAdmin });
};

const update = (id, name, email, password, isAdmin) => {
    return axios.put(API_URL + "update", { id, name, email, password, isAdmin });
};

const deleteUser = (number) => {
    return axios.delete(API_URL + "delete/" + number);
};

const UserService = {
    getAll,
    getById,
    createORupdate,
    create,
    update,
    deleteUser
}

export default UserService;