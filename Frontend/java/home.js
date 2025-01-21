// JavaScript for handling profile page logic
        document.getElementById('edit-profile').addEventListener('click', function() {
            // Prompt for new username
            const newUsername = prompt("Enter new username:", document.getElementById('username').textContent);
            if (newUsername) {
                document.getElementById('username').textContent = newUsername;
            }

            // Prompt for new email
            const newEmail = prompt("Enter new email:", document.getElementById('email').textContent.replace("Email: ", ""));
            if (newEmail) {
                document.getElementById('email').textContent = `Email: ${newEmail}`;
            }

            // Update profile picture initials
            if (newUsername) {
                const initials = newUsername[0]?.toUpperCase() || "A";
                document.getElementById('profile-picture').textContent = initials;
            }

            // Simulating backend update
            console.log("Profile updated:", { username: newUsername, email: newEmail });
            alert("Profile updated successfully!");
        });	
