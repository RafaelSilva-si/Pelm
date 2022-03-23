import api from './api';

export const getProducts = query => 
    api.get('/products', {params: query});

export const newProducts = query =>
    api.post('/products/new', query);

export const putProducts = (id, query) => 
    api.put(`/products/${id}`, {params: query});

export const deleteProducts = (id, query) =>
    api.delete(`/products/${id}`, {params: query});