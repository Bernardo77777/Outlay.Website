import axios from "axios";

const API_URL = "http://localhost:4242/api/Descriptions/";

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

const getById = (id) => {
    return axios.get(API_URL + id);
};

const createORupdate = (id, text, costId) => {
    if(id == null){
        return create( id, text, costId);
    }
    else {
        return update(id, text, costId);
    }
};

const create = (id, text, costId) => {
    return axios.post(API_URL + "create", { text, costId: Number(costId)});
};

const update = (id, text, costId) => {
    return axios.put(API_URL + "update/" + id , { text, costId: Number(costId)});
};

const deleteUser = (id) => {
    return axios.delete(API_URL + "delete/" + id);
};

const DescriptionService = {
    getAll,
    getById,
    createORupdate,
    create,
    update,
    deleteUser
}

export default DescriptionService;