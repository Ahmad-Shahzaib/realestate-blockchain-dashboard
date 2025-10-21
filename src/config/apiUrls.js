// config/apiUrls.js
// config/apiUrls.js
export const BASE_URL = "http://localhost:5000/api";
export const BASE_URL_NO_API = "http://localhost:5000";

export const API_URLS = {
    CUSTOMER: `${BASE_URL}/register`,
    PRODUCTS: `${BASE_URL}/products`,
    ORDERS: `${BASE_URL}/orders`,
    REFERAL: `${BASE_URL}/users/referral-code`,
};

export default API_URLS;

