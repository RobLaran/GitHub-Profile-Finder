const numeral = require('numeral'); 

export const getImage = imgPath => require(`../assets/images/${imgPath}`);

export const formatNumber = num => {
    let length = String(num).length;

    if(length > 3) {
        return numeral(num).format('0.0a');
    }

    return num;
}; 