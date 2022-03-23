import api from './api';

export const getForn = data =>  api.get('/forn',  {params: data})

export const addForn = query =>
    api.post('/forn/add', query);

export const updateStatus = (id, data) =>
    api.put(`/forn/status/${id}`, data);
    
export const updateForn = (query, id) =>
    api.put(`/forn/${id}`, query);

export const deleteForn = id =>
    api.delete(`/forn/${id}`, id);