import { fetchUser } from "../api/github.api";

const profile = (function() {
    let data = null;

    const formatProfile = function() {
        if(!data) return null;

        return {
            'loginName': data.login,
            'userName': data.name,
            'bio': data.bio,
            'address': data.location,
            'repositories': data.public_repos,
            'followers': data.followers,
            'avatarImage': data.avatar_url
        };
    };

    const loadUser = async function(name) {
        data = await fetchUser(name);
        const user = formatProfile();

        return user;
    };

    return { loadUser };
})();

export default profile;