export type User = {
    id?: string;
    name: string;
    email: string;
    password?: string;
    enrollment?: string;
    phoneNumber: string;
    masterConfirm: boolean;
    role?: string;
    isAdmin?: boolean;
}
