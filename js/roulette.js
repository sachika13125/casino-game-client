document.addEventListener('DOMContentLoaded', () => {
    const spinBtn = document.getElementById('spinBtn');
    const roulette = document.getElementById('roulette');

    spinBtn.addEventListener('click', () => {
        $.ajax({
            url: "http://localhost:3000/home",
            type: "GET",
            headers: {
                "task": "spin-btn" // custom header
            },
            success: function(response) {
                // if a success response is received, print it here:
                console.log("Response:", response); 

                const rotation = response.rotation;
                roulette.style.transition = 'transform 3s ease-out';
                roulette.style.transform = `rotate(${rotation}deg)`;

                const reward = response.reward;
                console.log("I won $", reward);
            },
            error: function(error) {
                console.error("Error:", error);
            }
        });


        
    });
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min * 1)) + min;
}