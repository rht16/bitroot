import axios from 'axios';
const add = (payload) => axios.post('/add-contacts', payload);

const getAll = () => axios.get('/get-all-contacts');

const update = ( payload) => axios.put(`/update-contact`, payload);

const getByNumber = (payload) => axios.post(`/get-contact`, payload);

const deleteOpenContact = (id) => axios.delete(`/contact-delete/${id}`);

export default { add, getAll, update, getByNumber, deleteOpenContact }; 