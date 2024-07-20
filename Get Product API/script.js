document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');

    showSignup.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });

    showLogin.addEventListener('click', () => {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    loginBtn.addEventListener('click', async () => {
        try {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const response = await fetch('http://15.206.94.226:9090/api/login', 
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Login successful!');
                console.log(data);
                window.location.href = "home.html"; 
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });

    signupBtn.addEventListener('click', async () => {
        try {
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const mobile = document.getElementById('signup-mobile').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            const response = await fetch('http://15.206.94.226:9090/api/signup', 
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, mobileNo: mobile, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Sign-up successful!');
                console.log(data);
            } else {
                const errorData = await response.json();
                alert(`Somthing went Wrong: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
        
    });
});
