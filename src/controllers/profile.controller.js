import { renderUsers } from "../views/profile.view";
import { loadUser, getUsers } from "../models/profile.model";

const profileController = (function() {
    const searchInput = document.querySelector('#search-input');
    let debounceTimeout;

    // Optimized function to fetch users concurrently
    const searchUser = async function(name) {
        try {
            console.log('Fetching user list...');
            const usersData = await getUsers(name);

            if (!usersData.length) {
                console.warn('No users found.');
                renderUsers([]); // Show empty state
                return;
            }

            // Fetch detailed user profiles in parallel
            console.log('Fetching user details...');
            const users = await Promise.all(usersData.map(user => loadUser(user.login)));

            renderUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Debounce function to limit API calls
    const debounce = (func, delay) => {
        return (...args) => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => func(...args), delay);
        };
    };

    // Handle user search with debounce
    const handleSearchEvent = function() {
        searchInput.addEventListener('input', debounce(async (event) => {
            const value = searchInput.value.trim();
            if (value) {
                await searchUser(value);
            }
        }, 500)); // 500ms delay
    };

    const init = async function() {
        handleSearchEvent();
    };

    return { init };
})();

export default profileController;