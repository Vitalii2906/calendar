const request = 'http://api.tvmaze.com/schedule?country=US&date='

$('#datepicker').datepicker({
  showOtherMonths: true,
	dateFormat : "yy-mm-dd",
	minDate: new Date($('#hiddendelivdate').val()),
	monthNames : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
  dayNamesMin : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
  onSelect: function (date) {
    dataProcessing(date, request)
    /*let option = {year: 'numeric', month: 'long', day: 'numeric'};
    let thisDay = new Date(date).toLocaleString('ru', option);
    let newDate = new Date(date);
    newDate = newDate.setDate(newDate.getDate()+1);
    let nextDay = new Date(newDate).toLocaleString('ru', option);

    $('#thisDay').append(`<h4>${thisDay}</h4>`)
    $('#nextDay').append(`<h4>${nextDay}</h4>`)
    */
}
});
var home = $("#home")
var catalog = $("#catalog")
var back = $("#back")

$("tbody td").on("click", function(event){
  home.hide();
  catalog.show();
  back.show();


  
})
back.on("click", function(event){
  catalog.hide();
  home.show();
  back.hide();
  window.location.reload();
})


function dataProcessing(date, request){
  let option = {year: 'numeric', month: 'long', day: 'numeric'};
    let thisDay = new Date(date).toLocaleString('ru', option);
    let newDate = new Date(date);
    newDate = newDate.setDate(newDate.getDate()+1);
    let nextDay = new Date(newDate).toLocaleString('ru', option);

    $('#thisDay').append(`<h4>${thisDay}</h4>`)
    $('#nextDay').append(`<h4>${nextDay}</h4>`)

    let newNextDay = new Date(newDate).toLocaleString('en-CA', {year: 'numeric', month: 'numeric', day: 'numeric'});
    let requestThisDay = request + date;
    let requestNextDay = request + newNextDay;

    $.get(requestThisDay, function(data) {
      $.each(data, function(index, value){
        
        if(index === 4){
          return false
        }

        $('#thisDay').append(`<div>
          <h5>${value.show.name}</h5>
          <img src=${value.show.image.medium} alt='picture' style='width:80px'>
          <span>${value.season}</span>
          <span>${value.number}</span>
        </div>`)
        
      })
        console.log(data)
        
        
    }, "json" );


    $.get(requestNextDay, function(data) {
      $.each(data, function(index, value){
        
        if(index === 4){
          return false
        }

        $('#nextDay').append(`<div>
          <h5>${value.show.name}</h5>
          <img src=${value.show.image.medium} alt='picture' style='width:80px'>
          <span>${value.season}</span>
          <span>${value.number}</span>
        </div>`)
        
      })
        console.log(data)
        
        
    }, "json" );
}
