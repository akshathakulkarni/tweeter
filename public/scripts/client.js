/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const createTweetElement = (tweetObj) => {
  /*const $name = $('<h5>').text(`${tweetObj.user.name}`);
  const $handle = $('<h6>').text(`${tweetObj.user.handle}`);
  const $content = $('<p>').text(`${tweetObj.content.text}`);
  const $timePassed = timeago.format(`${tweetObj.created_at}`);
  const $avatar = $('img')*/

  //Preventing XSS with escaping.
  
  const $tweetObj = `<article>` +
                      `<header>` +
                        `<h5>${tweetObj.user.name}</h5>` +
                        `<h6>${tweetObj.user.handle}</h6>` +
                      `</header>` +
                      `<form>` +
                        `<p>${tweetObj.content.text}</p>`+
                      `</form>` +
                      `<img src="${tweetObj.user.avatars}"></img>`+
                      `<span>${tweetObj.created_at}</span>`+
                      
                    `</article>`;

  return $tweetObj;
}

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  
  $container = $('#tweets-container');
  $container.empty();
  
  for(const tweet of tweets){
    const $tweet = createTweetElement(tweet);
    $container.prepend($tweet);
  }
  return $container;
}


$(document).ready(function() {

  const loadTweets = () => {
    //ajax request to get /tweets in json format
    $.ajax({
    url: '/tweets',
    method: "GET",
    dataType: "json",
    success: (tweets) => {
        //console.log(tweets);
        //render tweets dynamically
        renderTweets(tweets);
    },
    error : (error) => {
        console.log(error);
    }
  })};

  loadTweets();
  //Submit form using Ajax

  $('#newTweetForm').submit(function(event) {
    //check if tweet content is empty
    if($('#tweet-text').val() === '' || $('#tweet-text').val() === null) {
      alert('Error : Empty tweet content');
      event.preventDefault();
      return;
    }
    //check it tweet content is too long
    if(($('#tweet-text').val().length) > 140) {
      alert('Error: Tweet content is too long');
      event.preventDefault();
      return;
    }

    //alert('Handler for .submit() called');
    event.preventDefault();

    const serialisedData = $(this).serialize();
    //console.log(serialisedData);
    
    //Pass the data to the form with post method asyncronously.

    //$.post('/tweets/', serialisedData, () => {}, () => {}); 
    
     $.post('/tweets/', serialisedData)
    .then((response) => {
      loadTweets();
    })
  
  });
  
});
