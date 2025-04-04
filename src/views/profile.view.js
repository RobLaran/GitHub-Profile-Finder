import { formatNumber, getImage } from "../utils/helpers";

const profiles = document.querySelector('#profile-list');

const clearList = function() {
    const items = document.querySelectorAll('.profile');

    if(items) {
        for(let item of items) {
            profiles.removeChild(item);
        }
    }
};

const showLoading = function() {
    const loadingContainer = document.createElement('div');
    loadingContainer.id = 'loading-container';

    const loading = document.createElement('img');
    loading.id = 'loading-img';
    loading.src = getImage('gif/github-cat.gif');

    loadingContainer.appendChild(loading);
    document.body.appendChild(loadingContainer);
};

const hideLoading = function() {
    if(document.querySelector('#loading-container')) {
        document.body.removeChild(document.querySelector('#loading-container'));
    }
};

const showEmptyListMessage = function() {
    const items = document.querySelectorAll('.profile');
    const message = document.createElement('div');
    message.id = 'empty-list-message';
    message.innerHTML = 'No results. Search a name.';

    if(!items.length && !document.querySelector('#loading-container')) {
        console.log('Empty result');
        profiles.appendChild(message);
    } 
};

const hideEmptyListMessage = function() {
    if(document.querySelector('#empty-list-message')) {
        profiles.removeChild(document.querySelector('#empty-list-message'));
    }
};

const renderUsers = function(users) {
    clearList();

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
        userName.className = 'user-name name';
        userName.textContent = profileData.userName;
        userName.title = profileData.userName;
        profileNames.appendChild(userName);
    }

    if(profileData.loginName != null) {
        const loginName = document.createElement('span');
        loginName.className = 'login-name name';
        loginName.textContent = profileData.loginName;
        loginName.title = profileData.loginName;
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
    address.title = address.innerHTML;

    const repositories = document.createElement('li');
    repositories.className = 'repositories';
    repositories.title = (profileData.repositories || '0') + ' repositories';

    const repoCount = document.createElement('span');
    repoCount.className = 'repo-count';
    repoCount.innerHTML = formatNumber(profileData.repositories || 0);

    const repoIcon = document.createElement('img');
    repoIcon.className = 'repo-icon';
    repoIcon.src = getImage('icons/repo.svg');

    repositories.append(
        repoIcon,
        repoCount
    );

    const followers = document.createElement('li');
    followers.className = 'followers';
    followers.title = (profileData.followers || '0') + ' followers';
    
    const followersCount  =document.createElement('span');
    followersCount.className = 'followers-count';
    followersCount.innerHTML = formatNumber(profileData.followers || 0);

    const followersIcon = document.createElement('img');
    followersIcon.className = 'followers-icon';
    followersIcon.src = getImage('icons/followers.svg');

    followers.append(
        followersIcon,
        followersCount
    );

    let delimiter1 = document.createElement('span');
    delimiter1.className = 'delimiter';
    delimiter1.innerHTML = '•';

    let delimiter2 = document.createElement('span');
    delimiter2.className = 'delimiter';
    delimiter2.innerHTML = '•';

    profileInfo.append(
        address,
        delimiter1,
        repositories,
        delimiter2,
        followers
    );

    list.append(
        profileImage,
        profileNames,
        profileBio,
        profileInfo
    );

    profiles.append(list);
};

export { 
    renderProfile,
    renderUsers,
    clearList,
    showEmptyListMessage,
    hideEmptyListMessage,
    showLoading,
    hideLoading
};