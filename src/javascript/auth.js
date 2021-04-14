//Sign up
const signUp = document.querySelector('#signup-form');
if (signUp != null) {
    signUp.addEventListener('submit', (e) => {
            e.preventDefault();
            // Get user info
            const email =  signUp['signup-email'].value;
            const pw = signUp['signup-password'].value;
            //Sign up a user
            auth.createUserWithEmailAndPassword(email, pw).then(cred => {
                db.collection("users").doc(cred.user.uid).set({
                    trips: []
                    }).then ((value) => {
                        window.location.href = '../html/home.html';
                    })
            // Finally, we will reset the signup form so that the form clears up once a user signs up!
                signUp.reset();
                signUp.querySelector('.error').innerHTML = '';
            }).catch(err => {
                signUp.querySelector('.error').innerHTML = err.message;
            })
    });
}

//Login
const loginForm = document.querySelector('#login-form');
if (loginForm != null) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // get user info
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;
        // log the user in
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            window.location.href = '../html/home.html';
            console.log(cred.user);
            //reset form
            loginForm.reset();
            loginForm.querySelector('.error').innerHTML = '';
        }).catch(err => {
            loginForm.querySelector('.error').innerHTML = err.message;
        });
    });
}

//Logout
const logout = document.getElementById('logout');
console.log(logout);
if (logout != null) {
    console.log('not yet')
    logout.addEventListener('click', (e) => {
        console.log('clicked')
        e.preventDefault();
        auth.signOut().then(() => {
        window.location.href = "../html/login.html";

        console.log('user signed out');
    });
    });
}
