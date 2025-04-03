const API_URL_USER = 'https://api.github.com/users/';
const API_URL_USERS = 'https://api.github.com/search/users?q=';

export const fetchUser = async (name) => {
    const REQUEST_URL = API_URL_USER + name; 
    const data = fetch(REQUEST_URL, {mode: 'cors'});
    const user = (await data).json();

    return user;
};

export const fetchUsers = async (name) => {
    const REQUEST_URL = API_URL_USERS + name + '&per_page=16'; 
    const data = await fetch(REQUEST_URL, {mode: 'cors'});
    const users = (await data.json).items;

    return users;
};
