$(document).ready(function(){
    
    $.ajax({
        url:"https://www.googleapis.com/books/v1/volumes?q=intitle:javascript"
    }).done(function(data) {
        console.log(data)
    });
});