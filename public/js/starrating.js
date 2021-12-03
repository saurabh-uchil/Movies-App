$(document).ready(function () {
    $("#st1").hover(function () {
        $(".fa-star").css("color", "black");
        $("#st1").css("color", "yellow");
    });
    $("#st2").hover(function () {
        $(".fa-star").css("color", "black");
        $("#st1, #st2").css("color", "yellow");
    });
    $("#st3").hover(function () {
        $(".fa-star").css("color", "black")
        $("#st1, #st2, #st3").css("color", "yellow");
    });
    $("#st4").hover(function () {
        $(".fa-star").css("color", "black");
        $("#st1, #st2, #st3, #st4").css("color", "yellow");
    });
    $("#st5").hover(function () {
        $(".fa-star").css("color", "black");
        $("#st1, #st2, #st3, #st4, #st5").css("color", "yellow");
    });
    $('#stars li').on('click', function (e) {
        e.preventDefault();
        var onStar = parseInt($(this).data('value'), 10); // The star currently selected
        var stars = $(this).parent().children('li.star');

        for (i = 0; i < stars.length; i++) {
            $(stars[i]).removeClass('selected');
        }

        for (i = 0; i < onStar; i++) {
            $(stars[i]).addClass('selected');
        }
        var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
        console.log(ratingValue)
        $.post(`/movies/${movie_id}`, {
            rating: ratingValue
        }, function (data) { // post the option


            $("#result").text(data.rating); // show the result )
            // if (!$("#result").text(data.rating)) {
            //     $("#result").text("Please log in to Rate")
            // }

        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    });
});

// $(document).ready(function () { // when page loads
//     $("#searchLink").on("click", function (e) { // when link clicked
//         e.preventDefault(); // stop the click from any further action
//         var option = $("#search-option li.sel").data("option"); // get the selected option
//         $.post("search.php", { "option": option }, function (data) { // post the option
//             $("#result").html(data); // show the result
//         });
//     });
//     $("#search-option li").on("click", function () { // when LI is clicked
//         $(this)
//             .addClass("sel")
//             .siblings().removeClass("sel"); // Swap class
//     });
// });

// $("#rating-form").submit((e) => {
//     // e.preventDefault()
//     console.log(ratingValue)

//     $.post(`/movies/${movie_id}`, {
//         rating: ratingValue
//     })
//         .then((res) => {
//             console.log(res)
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// })