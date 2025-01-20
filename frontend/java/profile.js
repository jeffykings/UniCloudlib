 document.getElementById('edit-profile-button').addEventListener('click', function() {
            const username = prompt("Enter new username:", document.getElementById('username').textContent);
            const email = prompt("Enter new email:", document.getElementById('email').textContent.replace("Email: ", ""));

            if (username) {
                document.getElementById('username').textContent = username;
            }
            if (email) {
                document.getElementById('email').textContent = `Email: ${email}`;
            }

            // Simulating backend API call
            console.log("Updated profile info:", { username, email });
            alert("Profile updated successfully!");
        });
