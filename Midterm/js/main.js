$(document).ready(function() {

    $.ajax({
        url: "php/fetch.php",
        type: "GET",
        success: function(data) {
            let people = JSON.parse(data);
            let template = document.querySelector('.people-card');
            let container = document.querySelector('.people');

            people.forEach(person => {
                let clone = template.content.cloneNode(true);
                clone.querySelector('.people-template-name').textContent = person.name;
                clone.querySelector('.people-template-username').textContent = "@" + person.username;
                // You can add more fields here as needed

                container.appendChild(clone);
            });
        },
        error: function() {
            alert("Error fetching people data.");
        }
    });

    $("#registrationForm").submit(function(event) {
        event.preventDefault();
        var name = $("#name").val();
        var username = $("#username").val();
        var password = $("#password").val();
        
        if (name.length > 0) {
            $.ajax({
                url: "php/register.php",
                type: "POST",
                data: {
                    name: name,
                    username: username,
                    password: password
                },
                success: function(data) {
                    let result = JSON.parse(data);
                    if (result.res === "success") {
                        alert("Successfully Registered");
                        window.location.href = "index.html";
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("Error registering user.");
                }
            });
        }
    });

    $("#loginForm").submit(function(event) {
        event.preventDefault();
        var username = $("#username").val();
        var password = $("#password").val();
        
        if (username.length > 0 && password.length > 0) {
            $.ajax({
                url: "php/login.php",
                type: "POST",
                data: {
                    username: username,
                    password: password
                },
                success: function(data) {
                    let result = JSON.parse(data);
                    if (result.res === "success") {
                        alert("Login successful");
                         localStorage.setItem("id", result.id);
                          localStorage.setItem("username", result.username);
                          localStorage.setItem("name", result.name); 
                          localStorage.setItem("password", result.password);
                          localStorage.setItem("gender", result.gender);
                          localStorage.setItem("location", result.location);
                          localStorage.setItem("civilStatus", result.civilStatus);
                          localStorage.setItem("birthdate", result.birthdate);
                        window.location.href = "userPage.html"; 
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {
                    alert("Error logging in.");
                }
            });
        }
    });
});


 // Logout
 $("#logout").click(function() {
    $.ajax({
        url: "php/logout.php",
        type: "POST",
        success: function(data) {
            let result = JSON.parse(data);
            if (result.res === "success") {
                localStorage.removeItem("name");
                window.location.href = "index.html";
            } else {
                alert(result.message);
            }
        },
        error: function() {
            alert("Error logging out.");
        }
    });
});

document.querySelector('#editProfile').addEventListener('submit', function(event) {
    event.preventDefault();
    var id = document.getElementById('id').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var name = document.getElementById('fullName').value;
    var gender = document.getElementById('gender').value;
    var location = document.getElementById('location').value;
    var civilStatus = document.getElementById('civilStatus').value;
    var birthdate = document.getElementById('birthdate').value;

    $.ajax({
        url: "php/update.php",
        type: "POST",
        data: {
            id: id,
            username: username,
            password: password,
            name: name,
            gender: gender,
            location: location,
            civilStatus: civilStatus,
            birthdate: birthdate
        },
        success: function(data) {
            let result = JSON.parse(data);
            if (result.res === "success") {
                alert("Profile updated successfully.");
                // Update the local storage with the new data
                localStorage.setItem("name", name);
                localStorage.setItem("gender", gender);
                localStorage.setItem("location", location);
                localStorage.setItem("civilStatus", civilStatus);
                localStorage.setItem("birthdate", birthdate);
                document.getElementById("name").textContent = name.split(" ").slice(0, -1).join(" ");
                document.getElementById("profile-name").textContent = name;
                document.getElementById("profile-username").textContent = username;
                document.getElementById("profile-gender").textContent = gender;
                document.getElementById("profile-location").textContent = location;
                document.getElementById("profile-civil").textContent = civilStatus;
                document.getElementById("profile-birthdate").textContent = birthdate;
                window.location.reload();
            } else {
                alert(result.message);
            }
        },
        error: function() {
            alert("Error updating profile.");
        }
    });
});
