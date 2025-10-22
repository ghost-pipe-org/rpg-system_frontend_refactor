interface Session {
    id?: string;
    title: string;
    description: string;
    status?: string;
    system: string;
    period: string;
    minPlayers: number;
    maxPlayers: number;
    masterId?: string;
    createdAt?: string;
    updatedAt?: string;
    date?: Date | null;
    possibledate?: Date[];
    master?: {
        name: string;
    };
    room?: string;
    slots?: number;
    requirements: string;
    iconUrl?: string;
    location?: string | null;
    approvedDate?: string | null;
    cancelEvent?: string | null;
}

interface CreateSessionRequest {
    title: string;
    description: string;
    requirements: string;
    system: string;
    possibleDates: string[];
    period: 'MANHA' | 'TARDE' | 'NOITE';
    minPlayers: number;
    maxPlayers: number;
}

export type { Session, CreateSessionRequest };