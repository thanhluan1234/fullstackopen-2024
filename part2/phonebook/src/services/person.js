import axios from "axios";

const url = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(url);
};

const addPerson = (person) => {
  return axios.post(url, person);
};

const deletePerson = (id) => {
  return axios.delete(`${url}/${id}`);
};

export default { getAll, addPerson, deletePerson };
