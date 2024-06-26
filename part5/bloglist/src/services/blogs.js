import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl, { headers: { Authorization: token } });
  return res.data;
};

const create = async (blog) => {
  const res = await axios.post(baseUrl, blog, {
    headers: { Authorization: token },
  });
  return res.data;
};

const update = async (id, blog) => {
  const res = await axios.put(`${baseUrl}/${id}`, blog, {
    headers: { Authorization: token },
  });

  return res.data;
};

const deleteBlog = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: token },
  });

  return res.data;
};

export default { getAll, create, setToken, update, deleteBlog };
