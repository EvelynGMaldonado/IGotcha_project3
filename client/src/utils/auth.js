//decode a token and het the user'sinfo out of it
import decode from "jwt-decode";


//create a class to instantiate for a user
class Auth {
    //get user data
    getUser() {
        return decode(this.getToken());
    }

    //check if user is loggedIn
    loggedIn() {
        //check if there is a saved token and still valid
        const token = this.getToken();
        return token ? true : false;
        // return !!token && !this.isTokenExpired(token);
        //handwaiving??
    }
    //check if token is expired
    // isTokenExpired(token) {
    //     try {
    //         const decoded = decode(token);
    //         if (decoded.exp < Date.now() / 1000) {
    //             return true;
    //         } else return false;
    //     } catch (err) {
    //         return false;
    //     }
    // }
    getToken() {
        //get user token from local storage
        return localStorage.getItem("id_token");
    }
    login(idToken, history) {
        //we need to save the user's token to localstorage
        localStorage.setItem("id_token", idToken);
        history.push("/profile");
    }
    logout() {
        //clear user's token and profile data from localstorage
        localStorage.removeItem("id_token");
        //we'll reload the page and reset the state of the app
        window.location.assign("/");
    }
}

export default new Auth();