import { renderProfile, renderUsers } from "../views/profile.view";
import { loadUser, getUsers } from "../models/profile.model";

const profileController = (function() {
    const seearchUser = async function(name) {
        const users = [];
        const usernames = (await getUsers(name)).map((user) => user.login);

        for(let name of usernames) {
            console.log('Fetching user data');
            const user = await loadUser(name);
            users.push(user);
        }

        renderUsers(users);
    };

    const init = async function() {
        await seearchUser('Felix Yan');
    };

    return { init };
})();

export default profileController;