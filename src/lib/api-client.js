import {getAuthorizationHeader} from "./session-manager";

const baseUrl = window.location.origin + '/api';

export const get = (url) => {
    return fetch(baseUrl + url, {
        credentials: 'same-origin',
        headers: new Headers({
            'Authorization': getAuthorizationHeader()
        })
    })
        .then(response => response.json());
};

export const post = (url, body) => {
    return fetch(baseUrl + url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': getAuthorizationHeader()
        }),
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
        .then(handleErrors)
};

export const patch = (url, body) => {
    return fetch(baseUrl + url, {
        method: 'PATCH',
        credentials: 'same-origin',
        headers: new Headers({
            'Content-Type': 'application/json',
            Authorization: getAuthorizationHeader()
        }),
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
        .then(handleErrors)
};


function handleErrors(response) {
    if (response.status > 300) {
        alert(response.errors ? response.errors[0].defaultMessage : response.message );
        return Promise.reject(response.message);
    }
    return response;
}