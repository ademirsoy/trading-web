

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

export const redirect = (path) => {
    window.location = window.location.origin + path;
};

export const getAuthorizationHeader = () => {
    return localStorage.getItem('token');
};