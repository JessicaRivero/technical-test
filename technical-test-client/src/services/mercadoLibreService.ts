import apiClient from './apiClient';
import { SearchResult, ProductDetail } from './types';

const getSearchResults = async (query: string): Promise<SearchResult> => {
    try {
        const response = await apiClient.get(`/api/items?q=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error in getSearchResults: ", error);
        throw error;
    }
};

const getProductDetail = async (id: string): Promise<ProductDetail> => {
    try {
        const response = await apiClient.get(`/api/items/${id}`);
        return response.data.item;
    } catch (error: any) {
        console.error("Error in getProductDetail: ", error);
        throw error;
    }
};

export { getSearchResults, getProductDetail };
