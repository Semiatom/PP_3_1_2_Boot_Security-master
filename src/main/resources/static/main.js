
var text = $('.post-tags').html();
text = text.replace(/[\[\]]+/g, '');
$('.post-tags').html(text);