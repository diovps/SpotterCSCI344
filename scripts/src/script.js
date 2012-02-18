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
    
    var search_term = $("#search").val();
    var s  = new Spotter("twitter.search",
	{q:search_term,period:120,lang:"en"},
	{buffer:true,bufferTimeOut:750});
	
    s.register(function(tweets) {
	var fixedString = "";
	var fixed = tweets.text.replace(/(@\w*)|(#\w*)|(http.*)|(\sRT\s)/ig,"").match(/\w*/g);
	var fixedAssoc = new Array();

	for(var i in fixed){
		//fixedString+=fixed[i]+" ";
		if(fixed[i].toLowerCase() in fixedAssoc){
		    fixedAssoc[fixed[i].toLowerCase()]+=1;
		}else{
		    fixedAssoc[fixed[i].toLowerCase()] = 1;
		}
	}
	fixedAssoc.sort(sort);
	for(var j in fixedAssoc){
		fixedString += "Key: "+j + " " + "Value: "+fixedAssoc[j];
	}

	$("#tweets").append("<p>"+fixedString+"</p>");
	$("#tweets").append("<p>"+tweets.text+"</p>");
    });

    s.start();
}

function sort(a,b){
	return a-b;
}
