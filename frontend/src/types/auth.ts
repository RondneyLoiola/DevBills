export interface AuthState {
    user: {
        uid: string,
        displayName: string | null,
        email: string | null,
        photoURL: string | null
    } | null; //user pode ser nulo ou um objeto
    error: string | null;
    loading: boolean
}

