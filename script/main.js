$(document).ready(function () {
    console.log('Window loaded!');
    var input = $('p:contains("You can")').html();
    var input = $('input[value^="Name"]').val();
    var input = $('input[value^="Name"]').attr({
        title: 'Enter robot name',
        style: 'font-size: 20pt; background-color: yellow'
    });
    console.log(input);
});
