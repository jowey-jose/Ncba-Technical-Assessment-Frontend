// Data Service:
// To Access the protected Subscription Services, the HTTP request needs Authorization Header.

import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://mawingu.cbaloop.com/cba/api/v1/";


// Show Services List (Home Page):
const getServices = () => {
    return axios.get(API_URL + "service/getServices", { headers: authHeader() });
}

// Subscribe customer to a service:
// Todo: to confirm request parameters.
const subscribe = () => {
    return axios.post(API_URL + "subscription/subscribe", { headers: authHeader() });
}

// Fetch customer service subscriptions
const getCustomerSubscriptions = () => {
    return axios.get(API_URL + "subscription/subscriptions/{subscriberEmail}", { headers: authHeader() });
}


const UserService = {
    getServices,
    subscribe,
    getCustomerSubscriptions
}

export default UserService;