export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getAllSiblings = (element) => {
    const children = [...element.parentNode.children];
    return children.filter((child) => child !== element);
};

export const getPrice = (item, curr) => {
    let price = item.prices.filter((price) => {
        return price.currency.label === curr;
    });

    return price.pop();
};

export const getParamByIndex = (index) => {
    const url = window.location;
    const params = url.pathname.split('/');
    return params[params.length - index];
};
