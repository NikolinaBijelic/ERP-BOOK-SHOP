import http from "../../http-common.jsx/index.jsx";

//theatre
const getAll = () => {
  return http.get(`/theater`);
};
const getByIdTheatre = (id) => {
  return http.get(`/theater/${id}`);
};
const createTheatre = (data) => {
  return http.post(`/theater`, data);
};
const updateTheatre = (id, data) => {
  return http.put(`/theater/${id}`, data);
};
const removeTheatre = (id) => {
  return http.delete(`/theater/${id}`);
};
const removeAllTheatre = () => {
  return http.delete(`/theater`);
};

//genre
const getAllGenres = () => {
  return http.get(`/genre/allGenre`);
};

//book
const getAllBooks = (params) => {
  return http.get(`/book`, { params });
};
const getByIdBook = (id) => {
  return http.get(`/book/${id}`);
};
const createBook = (data) => {
  return http.post(`/book`, data);
};
const updateBook = (id, data) => {
  return http.put(`/book/${id}`, data);
};
const removeBook = (id) => {
  return http.delete(`/book/${id}`);
};

//ORDER

const getAllOrders = (params) => {
  return http.get(`/order`, { params });
};
const getByIdOrder = (id) => {
  return http.get(`/order/${id}`);
};
const createOrder = (data) => {
  return http.post(`/order`, data);
};
const updateOrder = (id, data) => {
  return http.put(`/order/${id}`, data);
};
const removeOrder = (id) => {
  return http.delete(`/order/${id}`);
};
const DataService = {
  getAll,
  getByIdTheatre,
  createTheatre,
  updateTheatre,
  removeTheatre,
  removeAllTheatre,
  getAllBooks,
  getByIdBook,
  createBook,
  updateBook,  
  removeBook,
  getAllOrders,
  getByIdOrder,
  createOrder,
  updateOrder,
  removeOrder,
  getAllGenres,
};
export default DataService;
