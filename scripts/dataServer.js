var dataServer = (function () {
    const kinvey_APP_ID = 'kid_B1uRP-BT',
        kinvey_APP_SECRET = 'f77256583e1147ff8e2d6edd6e2971f3',
        kinvey_MASTER_SECRET='84b14246f57a46fea8274487aad60f05',
        kinvey_URL = 'https://baas.kinvey.com/',
        USERNAME_STORAGE_KEY = 'username-key',
        AUTH_KEY_STORAGE_KEY = 'auth-key-key';

    // start users
    function userRegister(user) {
        let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_APP_SECRET);
        let registerURL = kinvey_URL + 'user/' + kinvey_APP_ID;
        let registerData = {
            username: user.username,
            password: user.password
        };
        var register = new Promise(function (resolve, reject) {
            $.ajax({
                url: registerURL,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(registerData),
                Authorization: "Basic " + authBase64,
                success: function (user) {
                    localStorage.setItem(USERNAME_STORAGE_KEY, user.username);
                    localStorage.setItem(AUTH_KEY_STORAGE_KEY, user.authKey);
                    resolve(user);
                }
            });
        });
        return register;
    }

    function userLogin(user) {
        let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_APP_SECRET);
        let loginURL = kinvey_URL + 'user/' + kinvey_APP_ID + '/login';
        let loginData = {
            username: user.username,
            password: user.password
        };
        var login = new Promise(function (resolve, reject) {
            $.ajax({
                url: loginURL,
                method: "POST",
                headers: { "Authorization": "Basic " + authBase64 },
                data: JSON.stringify(loginData),
                contentType: 'application/json',
                success: function (user) {
                    localStorage.setItem(USERNAME_STORAGE_KEY, user.username);
                    localStorage.setItem(AUTH_KEY_STORAGE_KEY, user.authtoken);
                    resolve(user);
                }
            });
        });
        return login;
    }

    function userLogout() {
        var logout = new Promise(function (resolve, reject) {
            localStorage.removeItem(AUTH_KEY_STORAGE_KEY);
            localStorage.removeItem(USERNAME_STORAGE_KEY);
            resolve();
        });

        return logout;
    }

    function userGetCurrent() {
        return Promise.resolve(localStorage.getItem(USERNAME_STORAGE_KEY) || 'anonymous');
    }
    // end users
    //start get book
    function getBook() {
        let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_MASTER_SECRET);
        let loginURL = kinvey_URL + 'appdata/' + kinvey_APP_ID + '/online';

        var book = new Promise(function (resolve, reject) {
            $.ajax({
                url: loginURL,
                method: "GET",
                headers: { "Authorization": "Basic " + authBase64 },
                success: function (data) {
                    resolve(data);
                }
            });
        });
        return book;

    }
    getBook();
    //end get book
    return {
        users: {
            register: userRegister,
            login: userLogin,
            logout: userLogout,
            current: userGetCurrent
        },
        get: {
            book: getBook
        }
    };
})();

export { dataServer };