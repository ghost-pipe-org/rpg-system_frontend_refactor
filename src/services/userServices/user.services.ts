import api from '../api';
import type { User } from './user.types';

export const createUser = async (user: User) => {
    const response = await api.post('/users', user);
    return response.data;
};