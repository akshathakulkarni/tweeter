console.log("loaded");

$(document).ready(function() {
  //const element = document.querySelector("main textarea");
  //console.log(element);
  //element.addEventListener("input", function(event) {
  //console.log(this);
  //});

  $('#tweet-text').on('input', function(event) {
    console.log(this.value.length);
    console.log(event.target.value.length);
    const numberOfCharacters = this.value.length
    const actualLength = 140 - numberOfCharacters
    console.log(actualLength);
    //$('this.counter').text(actualLength)
    $('.counter').val(actualLength);
    if(actualLength < 0) {
      $('.counter').css('color', 'red');
    }
    if(actualLength > 0) {
      $('.counter').css('color', '#545149');
    }
  })
});

