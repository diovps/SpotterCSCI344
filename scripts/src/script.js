/**
 * This is the entry point for our JavaScript program
 */

$(document).ready(function() {
	$("#search-button").click(function(){
		$("#Box").fadeOut();
		main();
	});
});

function main() {
    
    var search_term = "@"+$("#search").val();
    var s  = new Spotter("twitter.search",
	{q:search_term,period:120,lang:"en"},
	{buffer:true,bufferTimeOut:750});
	
    s.register(function(tweets) {
	var fixedString = "";
	var fixed = tweets.text.replace(/(@\w*)|(#\w*)|(http.*)/ig,"").match(/\w*/g);
	for(var i in fixed){
		fixedString+=fixed[i]+" ";
	}

	$("#tweets").append("<p>"+fixedString+"</p>");
	$("#tweets").append("<p>"+tweets.text+"</p>");
    });

    s.start();
}
