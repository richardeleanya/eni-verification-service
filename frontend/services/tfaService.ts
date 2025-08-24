import axios from 'axios';

const API_URL = '/api/2fa';

export const setupTfa = async (): Promise<Blob> => {
    const response = await axios.post(`${API_URL}/setup`, {}, { responseType: 'blob' });
    return response.data;
};

export const enableTfa = async (code: string): Promise<void> => {
    await axios.post(`${API_URL}/enable`, { code });
};

export const disableTfa = async (): Promise<void> => {
    await axios.post(`${API_URL}/disable`, {});
};
