import { fetchUser, fetchUsers } from "../api/github.api";

const formatProfile = function(data) {
    if(!data) return null;

    return {
        'loginName': data.login || null,
        'userName': data.name || null,
        'bio': data.bio || null,
        'address': data.location || null,
        'repositories': data.public_repos || null,
        'followers': data.followers || null,
        'avatarImage': data.avatar_url || null
    };
};

const loadUser = async function(name) {
    const data = await fetchUser(name);
    const user = formatProfile(data);

    return user;
};

const getUsers = async function(name) {
    const users = await fetchUsers(name);

    return users;
};

export { loadUser, getUsers };
