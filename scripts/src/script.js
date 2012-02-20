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
    var fixedAssoc = {};
	
    s.register(function(tweets) {
	var fixedString = "";
	var fixed = tweets.text.replace(/(@\w*)|(#\w*)|(http.*)|(\sRT\s)/ig,"").match(/\w*/g);
	//var fixedAssoc = {};

	for(var i in fixed){
		//fixedString+=fixed[i]+" ";
		if(fixedAssoc.hasOwnProperty(fixed[i].toLowerCase())){
		    fixedAssoc[fixed[i].toLowerCase()]+=1;
		}else{
		    fixedAssoc[fixed[i].toLowerCase()] = 1;
		}
	}
	
	fixedAssoc = sort(fixedAssoc);
	
	for(var j in fixedAssoc){
		fixedString += "Key: "+j + " " + "Value: "+fixedAssoc[j];
	}

	//$("#tweets").append("<p>"+fixedString+"</p>");
	//$("#tweets").append("<p>"+tweets.text+"</p>");
    });
    s.start();
}

function sort(array){
	/*this sorting function was sampled from
	http://bytes.com/topic/javascript/answers/153019-sorting-associative-array-keys-based-values*/
 
	var temp = [];
	for(var j in array){
	    temp.push([j,array[j]]);
	}
	
	temp.sort(function() {return arguments[0][1]>arguments[1][1]});
	
	var output = [];
    	for(var i = temp.length-2; i >=0; i--){
		output[temp[i][0]] = temp[i][1];
	}
	
	return output;	
}
