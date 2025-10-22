import api from "../api";
import type { Session, CreateSessionRequest } from "./session.types";

export const getAprovedSessions = async () => {
    const response = await api.get('/sessions/approved');
    return response.data;
};

export const getSessions = async () => {
    const response = await api.get('/sessions');
    return response.data;
};

export const createSession = async (session: CreateSessionRequest) => {
    const response = await api.post('/sessions', session);
    return response.data;
};