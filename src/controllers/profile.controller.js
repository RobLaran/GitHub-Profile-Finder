import { renderProfile, renderUsers } from "../views/profile.view";
import { loadUser, getUsers } from "../models/profile.model";

const profileController = (function() {
    const searchInput = document.querySelector('#search-input');

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

    const handleSearchEvent = function() {
        searchInput.addEventListener('keypress', async (event) => {
            const value = searchInput.value.trim() || null;

            if(event.key === 'Enter' && value) {
                event.preventDefault();
                await seearchUser(value);
            }
            
        });
    };

    const init = async function() {
        handleSearchEvent();
    };

    return { init };
})();

export default profileController;