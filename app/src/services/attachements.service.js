import axios from "axios";

const API_URL = "http://localhost:4242/api/Attachements/";

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

const createORupdate = (id, file, descriptionId) => {
    if(id == null){
        return create( id, file, descriptionId);
    }
    else {
        return update(id, file, descriptionId);
    }
};

const create = (id, file, descriptionId) => {
    return axios.post(API_URL + "create", { file, descriptionId: Number(descriptionId)});
};

const update = (id, file, descriptionId) => {
    return axios.put(API_URL + "update/" + id , { file, descriptionId: Number(descriptionId)});
};

const deleteUser = (id) => {
    return axios.delete(API_URL + "delete/" + id);
};

const AttachementsService = {
    getAll,
    getById,
    createORupdate,
    create,
    update,
    deleteUser
}

export default AttachementsService;