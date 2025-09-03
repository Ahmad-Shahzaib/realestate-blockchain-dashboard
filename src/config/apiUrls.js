// config/apiUrls.js
// const BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api";
const BASE_URL = process.env.API_BASE_URL || "https://proptechapi.softsuitetech.com/api";

export const API_URLS = {
    CUSTOMER: `${BASE_URL}/customers`,
    PRODUCTS: `${BASE_URL}/products`,
    ORDERS: `${BASE_URL}/orders`,
};
export default API_URLS;
