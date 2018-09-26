$(document).ready(function (){      
var endpoint = 'https://data.cincinnati-oh.gov/resource/ceds-in67.json';
    
var location = {};
  
$.get(endpoint, function(data){
    data.forEach(function(report){
        var neighborhood = report.cpd_neighborhood;

            if (!location[neighborhood]){
                location[neighborhood]= {};
                location[neighborhood].count = 1;
                location[neighborhood].type = {};
                location[neighborhood].age = {};
                location[neighborhood].day = {};
                location[neighborhood].gender= {};

            } else {
                location[neighborhood].count ++;
            }

            if (!location[neighborhood].type[report.offense]){ 
                    location[neighborhood].type[report.offense] = 1;

            } else {
                location[neighborhood].type[report.offense] ++;
            }

            if (!location[neighborhood].age[report.victim_age]){ 
                location[neighborhood].age[report.victim_age] = 1;

            } else {
                location[neighborhood].age[report.victim_age] ++;
            }

            if (!location[neighborhood].day[report.dayofweek]){ 
                location[neighborhood].day[report.dayofweek] = 1;

            } else {
                location[neighborhood].day[report.dayofweek] ++;
            }


            if (!location[neighborhood].gender[report.victim_gender]){ 
                location[neighborhood].gender[report.victim_gender] = 1;

            } else {
                location[neighborhood].gender[report.victim_gender] ++;
            }
    
    $('#input').autocomplete({
        source: Object.keys(location)
    });

 
});
   
    
    console.log(location);
    
var loadResluts = function(){
	var source = document.getElementById("neighborhood-template").innerHTML;
        var template = Handlebars.compile(source);
        var selection = $('#input').val();
        var selected = location[selection.toUpperCase()];
            $('#results').remove();
            $('.ui-widget').append(template(selected)); 
    }; 
    
    $('#input').on('keypress', function(event){
        if(event.which === 13){
        loadResluts();
        }
    });


     $('#submit').click(function(){
        loadResluts();
    });

    $('#refresh').click(function(){
        $('#results').remove();
        $('#input').val("");
    });

   

    $(document).ready(function(){
        $(document).ajaxError(function(){
            alert("Sorry for the inconvenience, we are making updates. Please come back soon!");
        });
    });

}); 
      


  
});
  

    



