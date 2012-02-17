/**
 * This is the entry point for our JavaScript program
 */

$(document).ready(function() {
	$("#search-button").click(function(){
		main();
	});
});

function main() {
    //your code goes here
    
    var search_term = "@"+$("#search").val();
    var s  = new Spotter("twitter.search",
	{q:search_term,period:120,lang:"en"},
	{buffer:true,bufferTimeOut:750});
	
    s.register(function(tweets) {
	
	
	$("#tweets").append("<p>"+tweets.text.match(/[A-z]*/g)+"</p>");
		 
		   
    });

    s.start();
}
