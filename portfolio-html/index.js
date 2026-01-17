$(document).ready(function() {
  // Wait for all animations to complete (last letter at 0.4s + 0.4s animation + 0.5s pause)
  setTimeout(function() {
    $('.loader').addClass('zoom-out');
    
    // Remove loader from DOM after zoom out completes
    setTimeout(function() {
      $('.loader').remove();
    }, 1000);
  }, 1300);
});