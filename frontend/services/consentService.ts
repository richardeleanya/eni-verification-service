import axios from 'axios';
import { Consent } from '../types';

const API_URL = '/api/consents';

export const getConsents = async (): Promise<Consent[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const updateConsent = async (consent: Consent): Promise<Consent> => {
    const response = await axios.post(API_URL, consent);
    return response.data;
};
