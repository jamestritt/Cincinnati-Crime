$(document).ready(function(){

      
var endpoint = 'https://data.cincinnati-oh.gov/resource/ceds-in67.json';

var neighborhoods = {};



$.get( endpoint, function(data){
	data.forEach(function(item){
  var neighborhood = item.cpd_neighborhood;
  var daysOfWeek = item.dayofweek;
  
  if(!neighborhoods[neighborhood]){
    	neighborhoods[neighborhood]= {};
      neighborhoods[neighborhood].count = 1;
      neighborhoods[neighborhood].offenses = {};
      neighborhoods[neighborhood].daysOfWeek = {};
    
  }else{
  	neighborhoods[neighborhood].count ++;
  }
  

  
  if(!neighborhoods[neighborhood].offenses[item.offense]){ 
  	neighborhoods[neighborhood].offenses[item.offense] = 1;
    
    }else{
  	neighborhoods[neighborhood].offenses[item.offense] ++;
  }
  
  
  if(!neighborhoods[neighborhood].daysOfWeek[daysOfWeek]){ 
  	neighborhoods[neighborhood].daysOfWeek[daysOfWeek] = 1;
    
    }else{
  	neighborhoods[neighborhood].daysOfWeek[daysOfWeek] ++;
  }
  
  })
  
  
  console.log(neighborhoods);
  
  $('#tags').autocomplete({
  	source: Object.keys(neighborhoods)
  });
   
  
});



var source   = document.getElementById("neighborhood-template").innerHTML;
var template = Handlebars.compile(source);


$('#tags').on('keypress', function(event){
	if(event.which === 13){
  	var selection = $('#tags').val();
    var selected = neighborhoods[selection.toUpperCase()];
    
  $('body').append(template(selected));
  }

})
 }








    }