$(document).ready(function(){      
var endpoint = 'https://data.cincinnati-oh.gov/resource/ceds-in67.json';



var location = {};



$.get( endpoint, function(data){
	data.forEach(function(item){
    var neighborhood = item.cpd_neighborhood;
  
    if(!location[neighborhood]){
        location[neighborhood]= {};
        location[neighborhood].count = 1;
        location[neighborhood].type = {};
        location[neighborhood].age = {};
        location[neighborhood].day = {};
        location[neighborhood].gender= {};

    }else{
        location[neighborhood].count ++;
    }



    if(!location[neighborhood].type[item.offense]){ 
        location[neighborhood].type[item.offense] = 1;

    }else{
        location[neighborhood].type[item.offense] ++;
    }


    if(!location[neighborhood].age[item.victim_age]){ 
        location[neighborhood].age[item.victim_age] = 1;

    }else{
        location[neighborhood].age[item.victim_age] ++;
    }


    if(!location[neighborhood].day[item.dayofweek]){ 
        location[neighborhood].day[item.dayofweek] = 1;

    }else{
        location[neighborhood].day[item.dayofweek] ++;
    }


    if(!location[neighborhood].gender[item.victim_gender]){ 
        location[neighborhood].gender[item.victim_gender] = 1;

    }else{
        location[neighborhood].gender[item.victim_gender] ++;
    }
  
  })
  
  
    $('#tags').autocomplete({
        source: Object.keys(location)
    });
   
});



    var source   = document.getElementById("neighborhood-template").innerHTML;
    var template = Handlebars.compile(source);


    $('#tags').on('keypress', function(event){
        if(event.which === 13){
        var selection = $('#tags').val();
        var selected = location[selection.toUpperCase()];

      $('body').append(template(selected));
      }

    })
}) 

function myFunction() {
    location.reload();
}





  



