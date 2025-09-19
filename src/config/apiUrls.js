// config/apiUrls.js
// const BASE_URL = process.env.API_BASE_URL || "https://dev.fractprop.com/api";
// config/apiUrls.js
export const BASE_URL = process.env.API_BASE_URL || "https://dev.fractprop.com/api";

export const API_URLS = {
    CUSTOMER: `${BASE_URL}/register`,
    PRODUCTS: `${BASE_URL}/products`,
    ORDERS: `${BASE_URL}/orders`,
    REFERAL: `${BASE_URL}/users/referral-code`,
};

export default API_URLS;

