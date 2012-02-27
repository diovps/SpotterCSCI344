/**
 * This is the entry point for our JavaScript program
 */

$(document).ready(function() {
       $("#warning").hide();
       $("#draggable").draggable();
       $("#search-button").click(function(){
		$("#tweets div").remove();
                $("#tweets p").remove();
                $("#warning").fadeIn();
                main();
	});
});


function main() {
    var count = 0;    
    var search_term = $("#search").val();
    var s  = new Spotter("twitter.search",
	{q:search_term,period:120,lang:"en"},
	{buffer:true,bufferTimeOut:750});
    var fixedAssoc = {};
    s.register(function(tweets) {
	var fixedString = "";
	var fixed = tweets.text.replace(/(@\w*)|(#\w*)|(http.*)|(\sRT\s)/ig,"").match(/\w*/g);
	
	for(var i in fixed){
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
	
	if(count==10){	
		s.stop();
         	printStuff(fixedAssoc,search_term);
	}else{
	        count++;
	}
	//$("#tweets").append("<p>"+fixedString+"</p>");
	//$("#tweets").append("<p>"+tweets.text+"</p>");
    });
    if(count!=10){
        s.start();
    }
}

function printStuff(array,search_term){
	var count  = 0;
        $("#tweets").append("<p id='search-term'>" + search_term + "</p>");
	for(var i in array){
		if(!(count>10)){
		    //$("#tweets").append("<p id='sizing"+count+"'>"+i+"</p>");
		    $("#tweets").append("<div id='sizing"+count+"'>"+"<p>"+i+"</p></div>");
		    $("#sizing"+count).draggable();
              	}else{
		    break;
		}
		count++
	}
        $("#warning").fadeOut();
}
function sort(array){
//Helped by code from http://bytes.com/topic/javascript/answers/153019-sorting-associative-array-keys-based-values 
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
