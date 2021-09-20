$(document).ready(function() {
  
  $('#tweet-text').on('input', function(event) {
    console.log(this.value.length);
    console.log(event.target.value.length);
    const numberOfCharacters = this.value.length;
    const actualLength = 140 - numberOfCharacters;
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

