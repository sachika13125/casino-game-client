function getUsersData() {
    $.ajax({
        url: 'http://localhost:3000/getUsersData',
        method: 'GET',
        dataType: 'json',
        success: function(data) {

            for (const username in data) {
                if (data.hasOwnProperty(username)) {
                    const user = data[username];
                    const tickets = user.tickets;
                    
                    $('#username').html(username);
                    $('#currency').html('$' + tickets); 

                    newUsername = username;
                }
            }
        },
        error: function(error) {
            console.error('Error fetching users data:', error);
        }
    });
};

$(document).ready(function() {
    getUsersData();
});