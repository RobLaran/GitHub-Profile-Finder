import { renderProfile } from "../views/profile.view";
import { loadUser } from "../models/profile.model";

const profileController = (function() {
    const init = async function() {
        const user1 = await loadUser('RobLaran');
        const user2 = await loadUser('Rob');
        const user3 = await loadUser('Jane');
        const user4 = await loadUser('Jack');
        
        renderProfile(user1);
        renderProfile(user2);
        renderProfile(user3);
        renderProfile(user4);
    };

    return { init };
})();

export default profileController;