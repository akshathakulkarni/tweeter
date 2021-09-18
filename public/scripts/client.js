/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
console.log("check client.js loaded");

const tweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const createTweetElement = (tweetObj) => {
  /*const $name = $('<h5>').text(`${tweetObj.user.name}`);
  const $handle = $('<h6>').text(`${tweetObj.user.handle}`);
  const $content = $('<p>').text(`${tweetObj.content.text}`);
  const $timePassed = timeago.format(`${tweetObj.created_at}`);
  const $avatar = $('img')*/

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
  // const $tweetObj = $('<article>');
  // $tweetObj.append($name, $handle, $content, $timePassed);
  
  return $tweetObj;
}

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  
  $container = $('#tweets-container');
  //$container.empty();
  
  for(const tweet of tweets){
    const $tweet = createTweetElement(tweet);
    $container.append($tweet);
  }
  return $container;
}

$(document).ready(function() {
  //renderTweets dynamically
  renderTweets(tweets);

  //Submit form using Ajax
  /*const form = $('#newTweetForm');
  form.on('submit', function(event) {
    event.preventDefault();
    const serialisedData = $(this).serialise();
    console.log(serialisedData);
  });*/

  $('#newTweetForm').submit(function(event) {
    alert('Handler for .submit() called');
    event.preventDefault();

    const serialisedData = $(this).serialize();
    console.log(serialisedData);
    //Pass the data to the form with action='/tweets/ using method=post asyncronously. 
    //$.post('/tweets/', serialisedData, () => {}, () => {}); 
    //another jQuery syntax that uses promises. 
    $.post('/tweets/', serialisedData)
    /*.then((response) => {
      console.log(response);
      //renderTweets(tweets);
    }); */

  
  });
  
});
