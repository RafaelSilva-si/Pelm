import api from './api';

export const getBrands = query => api.get('/brands', {params: query});

export const getBrandsById = id => api.get(`/brands/${id}`, id);

export const insertBrand = query => api.post('/brands', query);

export const updateBrand = (id, query) => api.put(`/brands/${id}`, query);

export const updateStatusBrand = (id, query) => api.put(`/brands/status/${id}`, query);

export const deleteBrand = id => api.delete(`/brands/${id}`);
