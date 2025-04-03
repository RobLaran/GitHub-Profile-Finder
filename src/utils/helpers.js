const numeral = require('numeral'); 

export const getIconSVG = icon => require(`../assets/icons/svgs/${icon}.svg`);

export const getIconPNG = icon => require(`../assets/icons/${icon}.png`);

export const formatNumber = num => {
    let length = String(num).length;

    if(length > 3) {
        return numeral(num).format('0.0a');
    }

    return num;
}; 