import { Octokit } from 'octokit';

const header = {
    'X-GitHub-Api-Version': '2022-11-28'
};

const kit = new Octokit({
    auth: process.env.TOKEN,
});

export const fetchUser = async (name) => {
    const RESPONSE = await kit.request('GET /users/{username}', {
        username: name,
        headers: header
    });

    return RESPONSE.data;
};

export const fetchUsers = async (name) => {
    const RESPONSE = await kit.request('GET /search/users', {
        q: name,
        per_page: 150,
        headers: header
      });


    return RESPONSE.data.items;
};
