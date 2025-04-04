import { clearList, hideMessage, hideLoading, renderUsers, showMessage, showLoading } from "../views/profile.view";
import { loadUser, getUsers } from "../models/profile.model";

const profileController = (function() {
    const searchInput = document.querySelector('#search-input');
    let debounceTimeout;

    // Optimized function to fetch users concurrently
    const searchUser = async function(name) {
        try {
            showLoading();
            console.log('Fetching user list...');
            const usersData = await getUsers(name);

            if (!usersData.length) {
                console.warn('No users found.');
                renderUsers([]); // Show empty state
                hideLoading();
                showMessage('No users found.');
                return;
            }

            // Fetch detailed user profiles in parallel
            console.log('Fetching user details...');
            const users = await Promise.all(usersData.map(user => loadUser(user.login)));

            renderUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            hideLoading();
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
        searchInput.addEventListener('keypress', debounce(async (event) => {
            if(event.key == 'Enter') {
                const value = searchInput.value.trim();
                hideMessage();
                clearList();
                if(value) {
                    await searchUser(value);
                } else {
                    showMessage('No results. Search a name.');
                }
            }
        }, 500)); // 500ms delay
    };

    const init = async function() {
        handleSearchEvent();
        showMessage('No results. Search a name.');
    };

    return { init };
})();

export default profileController;