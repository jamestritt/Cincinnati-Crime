      
var endpoint = 'https://data.cincinnati-oh.gov/resource/ceds-in67.json';



var neighborhoods = {};



$.get( endpoint, function(data){
	data.forEach(function(item){
  var neighborhood = item.cpd_neighborhood;
  var age = item.victim_age;
  
  if(!neighborhoods[neighborhood]){
    	neighborhoods[neighborhood]= {};
      neighborhoods[neighborhood].count = 1;
      neighborhoods[neighborhood].offenses = {};
      neighborhoods[neighborhood].victim_age = {};
    neighborhoods[neighborhood].dayofweek = {};
    neighborhoods[neighborhood].victim_gender= {};
    
  }else{
  	neighborhoods[neighborhood].count ++;
  }
  

  
  if(!neighborhoods[neighborhood].offenses[item.offense]){ 
  	neighborhoods[neighborhood].offenses[item.offense] = 1;
    
    }else{
  	neighborhoods[neighborhood].offenses[item.offense] ++;
  }
  
  
  if(!neighborhoods[neighborhood].victim_age[item.victim_age]){ 
  	neighborhoods[neighborhood].victim_age[item.victim_age] = 1;
    
    }else{
  	neighborhoods[neighborhood].victim_age[item.victim_age] ++;
  }
  
  
    if(!neighborhoods[neighborhood].dayofweek[item.dayofweek]){ 
  	neighborhoods[neighborhood].dayofweek[item.dayofweek] = 1;
    
    }else{
  	neighborhoods[neighborhood].dayofweek[item.dayofweek] ++;
  }
  
  
     if(!neighborhoods[neighborhood].victim_gender[item.victim_gender]){ 
  	neighborhoods[neighborhood].victim_gender[item.victim_gender] = 1;
    
    }else{
  	neighborhoods[neighborhood].victim_gender[item.victim_gender] ++;
  }
  
  })
  
  
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






  



