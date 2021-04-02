//Sign up
const signUp = document.querySelector('#signup-form');
signUp.addEventListener('submit', (e) => {
    e.preventDefault();
    // Get user info
    const email =  signUp['signup-email'].value;
    const pw = signUp['signup-password'].value;

    console.log(email, pw);
})