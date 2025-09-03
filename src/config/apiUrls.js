// config/apiUrls.js
// const BASE_URL = process.env.API_BASE_URL || "https://proptechapi.softsuitetech.com/api";
const BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api/auth";

export const API_URLS = {
    CUSTOMER: `${BASE_URL}/register`,
    PRODUCTS: `${BASE_URL}/products`,
    ORDERS: `${BASE_URL}/orders`,
};
export default API_URLS;
