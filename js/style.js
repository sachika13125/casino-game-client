$(document).ready(function() {
    $('.blackjack-home').on("mouseenter", () => {
        $('.noace').css({ transform: "rotate(-10deg)", "--op": 0.8 });
        $('.ace').css({ transform: "rotate(10deg)", "--op": 0.8 });
    });

    $('.blackjack-home').on("mouseleave", () => {
        $('.noace').css({ transform: "rotate(-5deg) translate(40%)", "--op": 0 });
        $('.ace').css({ transform: "rotate(5deg) translate(-40%)", "--op": 0 });
    });

    $('.dice-home').on("mouseenter", () => {
        $('.dice1').css({ transform: "rotate(-20deg) translate(-20%, 20%)", "--op": 1 });
        $('.dice2').css({ transform: "rotate(20deg) translate(20%, 20%)", "--op": 1 });
    });

    $('.dice-home').on("mouseleave", () => {
        $('.dice1').css({ transform: "rotate(-5deg) translate(10%, 20%)", "--op": 0 });
        $('.dice2').css({ transform: "rotate(5deg) translate(-10%, 20%)", "--op": 0 });
    });

    $(".slot-machine").hover(
        function() {
            $(this).attr("src", "../img/slots.gif");
        },
        function() {
            $(this).attr("src", "../img/slots.png");
        }
    );
});
// const rouletteImg = $('.roulette-img');
// let totalRotation = 0;

// rouletteImg.on("mouseenter", () => {
//     totalRotation += 500;
//     rouletteImg.css("--roul", totalRotation + "deg");
// });
