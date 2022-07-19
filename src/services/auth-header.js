// Helper Function:  to check Local Storage for logged in "user" with accessToken and return HTTP Authorization Header, Otherwise return an Empty object.
 
 export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return {Authorization: 'Bearer ' + user.accessToken};
    } else {
        return {}
    }
 }
 