const numeral = require('numeral'); 

const profiles = document.querySelector('#profile-list');

export const getImage = imgPath => require(`../assets/images/${imgPath}`);

export const formatNumber = num => {
    let length = String(num).length;

    if(length > 3) {
        return numeral(num).format('0.0a');
    }

    return num;
}; 

export const clearList = function() {
    const items = document.querySelectorAll('.profile');

    if(items) {
        for(let item of items) {
            profiles.removeChild(item);
        }
    }
};

export const showLoading = function() {
    const loadingContainer = document.createElement('div');
    loadingContainer.id = 'loading-container';

    const loading = document.createElement('img');
    loading.id = 'loading-img';
    loading.src = getImage('gif/github-cat.gif');

    loadingContainer.appendChild(loading);
    document.body.appendChild(loadingContainer);
};

export const hideLoading = function() {
    if(document.querySelector('#loading-container')) {
        document.body.removeChild(document.querySelector('#loading-container'));
    }
};

export const showMessage = function(message) {
    const items = document.querySelectorAll('.profile');
    const alertMessage = document.createElement('div');
    alertMessage.id = 'message';
    alertMessage.innerHTML = message;

    if(!items.length && !document.querySelector('#loading-container')) {
        profiles.appendChild(alertMessage);
    } 
};

export const hideMessage = function() {
    if(document.querySelector('#message')) {
        profiles.removeChild(document.querySelector('#message'));
    }
};