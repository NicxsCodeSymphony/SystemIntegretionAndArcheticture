$(document).ready(function() {
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
                          localStorage.setItem("username", result.username);
                          localStorage.setItem("name", result.name); 
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
        success: function() {
            localStorage.removeItem("name");
            window.location.href = "index.html";
        },
        error: function() {
            alert("Error logging out.");
        }
    });
});


