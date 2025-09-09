// config/apiUrls.js
// const BASE_URL = process.env.API_BASE_URL || "https://proptechapi.softsuitetech.com/api";
// config/apiUrls.js
export const BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api";

export const API_URLS = {
    CUSTOMER: `${BASE_URL}/register`,
    PRODUCTS: `${BASE_URL}/products`,
    ORDERS: `${BASE_URL}/orders`,
    REFERAL: `${BASE_URL}/users/referral-code`,
};

export default API_URLS;

