import axios from "axios";

const API_URL = "http://localhost:4242/api/Costs/";

axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const getAll = (user) => {
    return axios.get(API_URL + "all/" + user);
};

const getById = (id) => {
    return axios.get(API_URL + id);
};

const createORupdate = (id, name, cost, date, ispaid, Payment, userId) => {
    if(id == null){
        return create( id, name, cost, date, ispaid, Payment, userId);
    }
    else {
        return update(id, name, cost, date, ispaid, Payment, userId);
    }
};

const create = (name, cost, date, ispaid, Payment, userId) => {
    return axios.post(API_URL + "create", { name, cost, date, ispaid, Payment, userId: Number(userId)});
};

const update = (id, name, cost, date, ispaid, Payment, userId) => {
    return axios.put(API_URL + "update/" + id , { name, cost, date, ispaid, Payment, userId: Number(userId)});
};

const deleteUser = (id) => {
    return axios.delete(API_URL + "delete/" + id);
};

const CostService = {
    getAll,
    getById,
    createORupdate,
    create,
    update,
    deleteUser
}

export default CostService;