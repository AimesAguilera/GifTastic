
var topics = ["sean penn", "leonardo dicaprio", "al pacino", "bill murray", "marlon brando", "gary oldman", "tom cruise", "christian bale", "brad pitt", "jack nicholson"]

function buttonAjaxCallAction() {
    $('#banner').empty();

    for (var i = 0; i < topics.length; i++) {
        var button = $("<button class='actor'/>").text(topics[i]);
        $('#banner').append(button);
        button.attr('data-person');

        button.on('click', function (event) {
            event.preventDefault();

            var buttonValue = $(this).text();
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=y8Wq7Nh2DeXHTkrfnXFCRqgUBEH4gfjo&q=" + buttonValue + "&limit=10&offset=0&rating=G&lang=en";

            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='gifHolder'/>");
                    var rating = results[i].rating;
                    var p = $("<p class='p'/>").text('Rating: ' + rating);
                    var gif = $("<img class='gif'>");

                    gif.attr('src', results[i].images.fixed_height_small_still.url);
                    gif.attr('data-still', results[i].images.fixed_height_small_still.url);
                    gif.attr('data-animate', results[i].images.fixed_height_small.url);
                    gif.attr('data-state', 'still');

                    $('.gif').on('click', function () {
                        var state = $(this).attr('data-state');

                        if (state === 'still') {
                            $(this).attr('src', $(this).attr('data-animate'));
                            $(this).attr('data-state', 'animate');
                        } else {
                            $(this).attr('src', $(this).attr('data-still'));
                            $(this).attr('data-state', 'still');
                        }
                    });

                    gifDiv.append(gif, p);
                    $('#content').prepend(gifDiv);

                };
            })

        })
    };
}

buttonAjaxCallAction();

$('#addActor').on('click', function(event) {
    $('#actorInput').empty();
    event.preventDefault();
    var userInput = $('#actorInput').val().trim();
    topics.push(userInput);

    buttonAjaxCallAction();
})