$(document).ready(function() {
    //Array for searched topics to be added
    var topics = [];
    
        //Function with AJAX call to GIPHY; Q parameterc for API link set to search term, limit 10 results
      //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
         function displayGiphy() {
    
        var search = $(this).data("search");
        console.log(search);
        $("#gifArea").empty();
    
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10";
    
        console.log(queryURL);
    
        $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {
                
                var showDiv = $("<div class='col-md-4'>");
    
                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
    
                showImage.attr("src", staticSrc);
                showImage.addClass("imgGiphy");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.prepend(p);
                showDiv.append(showImage);
                $("#gifArea").prepend(showDiv);
    
            }
        });
    }
    
      //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
        $("#addGif").on("click", function(event) {
            event.preventDefault();
            var newGif = $("#giphyInput").val().trim();
            topics.push(newGif);
            console.log(topics);
            $("#giphyInput").val('');
            displayButtons();
          });
    
      //Function iterates through topics array to display button with array values in "myButtons" section of HTML
        function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var newButtons = $('<button class="btn btn-info">');
          newButtons.attr("id", "action");
          newButtons.attr("data-search", topics[i]);
          newButtons.text(topics[i]);
          $("#myButtons").append(newButtons);
        }
      }
    
    
      displayButtons();
    
      //Click event on button with id of "action" executes displayGiphy function
      $(document).on("click", "#action", displayGiphy);
    
      //Click event on gifs with class of "imgGiphy" executes pausePlayGifs function
      $(document).on("click", ".imgGiphy", pausePlayGifs);
    
      //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
      function pausePlayGifs() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
    });