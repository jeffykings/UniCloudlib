document.getElementById('login-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from reloading the page

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Basic validation
            if (!email || !password) {
                alert("Please fill in both fields.");
                return;
            }

            // Simulating form submission
            console.log("Email:", email);
            console.log("Password:", password);

            // Perform login logic (e.g., API call)
            alert("Login attempt submitted.");
        });

        // Social login button handlers (example purposes only)
        document.getElementById('google-login').addEventListener('click', function() {
            alert("Google login clicked.");
        });

        document.getElementById('facebook-login').addEventListener('click', function() {
            alert("Facebook login clicked.");
        });

        document.getElementById('linkedin-login').addEventListener('click', function() {
            alert("LinkedIn login clicked.");
        });
