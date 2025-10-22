import api from "../api";
import type { CreateSessionRequest } from "./session.types";

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

export const getMyEmittedSessions = async () => {
    const response = await api.get('/my-emmitted-sessions');
    console.log("Emitted Sessions Response:", response);
    return response.data;
};

export const getMyEnrolledSessions = async () => {
    const response = await api.get('/my-enrolled-sessions');
    console.log("Enrolled Sessions Response:", response);
    return response.data;
};