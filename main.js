$(document).ready(function() {

    $('#login-btn').click(function(e){
        e.preventDefault();

        const username = $("input[type='text']").val();
        const password = $("input[type='password']").val();

        console.log("Username:", username);
        console.log("Password:", password);

        $.ajax({
            url: "http://localhost:3000/login",
            type: 'GET',
            headers: {
                "task": "login" // custom header
            },
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                // if a success response is received, print it here:
                console.log("Response:", response); 

                if (response === "Login Successful") {
                    // Redirect to home.html
                    console.log("if condition for Login Successful triggered");
                    window.location.href = "./pages/home.html";
                } else {
                    // Display "Login Failed"
                    alert(response);
                }
            },
            error: function(error) {
                console.error("Error:", error);
            }
        });

    });

    $('#signup-btn').click(function(e){
        e.preventDefault();

        const username = $("input[type='text']").val();
        const password = $("input[type='password']").val();

        console.log("Username:", username);
        console.log("Password:", password);

        $.ajax({
            url: "http://localhost:3000/login",
            type: 'POST',
            headers: {
                "task": "signup" // custom header
            },
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                // if a success response is received, print it here:
                console.log("Response:", response); 
            },
            error: function(error) {
                console.error("Error:", error);
            }
        });
    });
});
