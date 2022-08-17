import axios from 'axios';

const baseUrl = "https://bitroot.herokuapp.com"

const add = (payload) => axios.post(`${baseUrl}/add-contacts`, payload);

const getAll = () => axios.get(`${baseUrl}/get-all-contacts`);

const update = ( payload) => axios.put(`${baseUrl}/update-contact`, payload);

const getByNumber = (payload) => axios.post(`${baseUrl}/get-contact`, payload);

const deleteOpenContact = (id) => axios.delete(`${baseUrl}/contact-delete/${id}`);

export default { add, getAll, update, getByNumber, deleteOpenContact }; 