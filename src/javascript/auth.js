//Sign up
const signUp = document.querySelector('#signup-form');
signUp.addEventListener('submit', (e) => {
        e.preventDefault();
        // Get user info
        const email =  signUp['signup-email'].value;
        const pw = signUp['signup-password'].value;
         //Sign up a user
        auth.createUserWithEmailAndPassword(email, pw).then(cred => {
        // Here we get the modal that is opened up, in this case, the SignUp Modal
        // We then get that reference to that modal and using M (materialize library) we close it
        // Finally, we will reset the signup form so that the form clears up once a user signs up!
         const modal = document.querySelector('#modal-signup');
         M.Modal.getInstance(modal).close();
         signUp.reset();
    });
});
    // Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
        console.log('user signed out');
    });
});
