/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweetObj) => {
  const $timePassed = timeago.format(`${tweetObj.created_at}`);
  
  const $tweetObj = `<article class="tweet"> 
                      <header> 
                        <div class='user-info'>
                          <img width="30" height="40px" src="${tweetObj.user.avatars}"></img>
                          <p>${tweetObj.user.name}</p>
                        </div>
                        <p class='handle'>${tweetObj.user.handle}</p>
                      </header>
                      <div class='tweet-content'>
                        ${escape(tweetObj.content.text)}
                      </div>
                      <footer>
                        <span>${$timePassed}</span>
                        <div class='font'>
                          <i class="fas fa-heart"></i>
                          <i class="fas fa-retweet"></i>
                          <i class="fas fa-flag"></i>
                        </div>
                      </footer>
                    </article>`;
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

    //For a valid tweet no error should be displayed. 
    $('#error').text("");
    $('#error').css({'border':'none', 'color':'white'});

    //check if tweet content is empty
    if($('#tweet-text').val() === '' || $('#tweet-text').val() === null || ( $.trim( $('#tweet-text').val() ) == '' ))
    {
      $('#error').css({'border':'3px', 'color': 'red', 'border-style': 'solid', 'font-family': 'sans-serif', 'padding-bottom':"5px",});
      $('#error').text("!!!Empty tweet content! Please enter a valid tweet.");
      $('#tweet-text').slideDown();
      event.preventDefault();
      return;
    }

    //check if tweet content is too long
    if(($('#tweet-text').val().length) > 140) {
      $('#error').css({'border':'3px', 'color': 'red', 'border-style': 'solid', 'font-family': 'sans-serif', 'padding-bottom':"5px"});
      $('#error').text("!!!Too long! Plz rspct our arbitrary limit of 140 chars.");
      event.preventDefault();
      return;
    }

    event.preventDefault();
    
    const serialisedData = $(this).serialize();
    
    //Pass the data to the form with post method asyncronously.
    
    $.post('/tweets/', serialisedData)

    .then((response) => {
      loadTweets();
    })

    $('#tweet-text').val('');

  });
  
});
