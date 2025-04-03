import { getIconSVG } from "../utils/helpers";

const profiles = document.querySelector('#profile-list');

const renderUsers = function(users) {
    for(let user of users) {
        renderProfile(user);
    }
};

const renderProfile = function(profileData) {
    if(!profileData) return null;

    const list = document.createElement('li');
    list.className = 'profile';

    // Avatar image
    const profileImage = document.createElement('img');
    profileImage.className = 'profile-image';
    profileImage.alt = 'profile image';
    profileImage.src = profileData.avatarImage;

    // Profile login and user name
    const profileNames = document.createElement('div');
    profileNames.className = 'profile-names';

    if(profileData.userName !== null) {
        const userName = document.createElement('a');
        userName.className = 'user-name';
        userName.textContent = profileData.userName;
        profileNames.appendChild(userName);
    }

    if(profileData.loginName != null) {
        const loginName = document.createElement('span');
        loginName.className = 'login-name';
        loginName.textContent = profileData.loginName;
        profileNames.appendChild(loginName);
    }

    // Profile bio
    const profileBio = document.createElement('p');
    profileBio.className = 'profile-bio';
    profileBio.textContent = profileData.bio || 'No biography';

    // Profile info
    const profileInfo = document.createElement('ul');
    profileInfo.className = 'profile-info';

    const address = document.createElement('li');
    address.className = 'address';
    address.innerHTML = profileData.address || 'No address';

    const repositories = document.createElement('li');
    repositories.className = 'repositories';
    repositories.innerHTML = profileData.repositories || '0';

    const repoIcon = document.createElement('img');
    repoIcon.className = 'repo-icon';
    repoIcon.src = getIconSVG('repo');

    const followers = document.createElement('li');
    followers.className = 'followers';
    followers.innerHTML = profileData.followers || '0';

    const followersIcon = document.createElement('img');
    followersIcon.className = 'followers-icon';
    followersIcon.src = getIconSVG('followers');

    let delimiter1 = document.createElement('span');
    delimiter1.className = 'delimiter';
    delimiter1.innerHTML = '•';

    let delimiter2 = document.createElement('span');
    delimiter2.className = 'delimiter';
    delimiter2.innerHTML = '•';

    profileInfo.append(
        address,
        delimiter1,
        repoIcon, 
        repositories,
        delimiter2,
        followersIcon,
        followers
    );

    list.append(
        profileImage,
        profileNames,
        profileBio,
        profileInfo
    );

    profiles.append(list);
}

export { 
    renderProfile,
    renderUsers
};