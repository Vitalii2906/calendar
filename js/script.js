const request = 'http://api.tvmaze.com/schedule?country=US&date='

$('#datepicker').datepicker({
  showOtherMonths: true,
	dateFormat : "yy-mm-dd",
	minDate: new Date($('#hiddendelivdate').val()),
	monthNames : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
  dayNamesMin : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
  onSelect: function (date) {
    dataProcessing(date, request)
    
}
});
let home = $("#home")
let catalog = $("#catalog")

let back = $("#back")

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

    $('#thisDay').append(`<h2>${thisDay}</h2>`)
    $('#nextDay').append(`<h2>${nextDay}</h2>`)

    let newNextDay = new Date(newDate).toLocaleString('en-CA', {year: 'numeric', month: 'numeric', day: 'numeric'});
    let requestThisDay = request + date;
    let requestNextDay = request + newNextDay;

    
    $.get(requestThisDay, function(data) {
      
      $.each(data, function(index, value){
        
        if(index === 4){
          return false
        }
        if(value.show.image.medium !== null){
          $('#thisDay').append(`<div class='content__block'>
            <div><img src=${value.show.image.medium} alt='picture' style='width:80px'></div>
            <div>
              <h5>${value.show.name}</h5>
              <span>${new Date(value.show.premiered).getFullYear()}</span><br>
              <span>Сезон ${value.season}</span>
              <span>Эпизод ${value.number}</span>
            </div>
          </div>`)
        }
      })
      $('#thisDay').append(`<div class='allShows'>Ещё ${data.length} сериала</div>`) 
      $('#thisDay .allShows').on('click', function(event){
        $('#thisDay .allShows').hide();
        $('#thisDay__full').show();
        
        $.each(data, function(index, value){
        
          if(index > 4 && value.show.image.medium !== null){
            $('#thisDay__full').append(`<div class='content__block'>
            <div><img src=${value.show.image.medium} alt='picture' style='width:80px'></div>
            <div>
              <h5>${value.show.name}</h5>
              <span>${new Date(value.show.premiered).getFullYear()}</span><br>
              <span>Сезон ${value.season}</span>
              <span>Эпизод ${value.number}</span>
            </div>
            
          </div>`)
          }
        })
        $('#thisDay__full').append(`<div class='close'>Показать основные</div>`)
        $('#thisDay__full').on('click', function(event){
          $('#thisDay__full').hide();
          $('#thisDay .allShows').show();
        })
      })
      console.log(data)
        
        
    }, "json" );


    $.get(requestNextDay, function(data) {
      
      $.each(data, function(index, value){
        
        if(index === 4){
          return false
        }
        if(value.show.image.medium !== null){
          $('#nextDay').append(`<div class='content__block'>
            <div><img src=${value.show.image.medium} alt='picture' style='width:80px'></div>
            <div>
              <h5>${value.show.name}</h5>
              <span>${new Date(value.show.premiered).getFullYear()}</span><br>
              <span>Сезон ${value.season}</span>
              <span>Эпизод ${value.number}</span>
            </div>
          </div>`)
        }
        
        
      })
      $('#nextDay').append(`<div class='allShows'>Ещё ${data.length} сериала</div>`)  
      $('#nextDay .allShows').on('click', function(event){
        $('#nextDay .allShows').hide();
        $('#nextDay__full').show();
        
        $.each(data, function(index, value){
        
          if(value.show.image.medium !== null){
            $('#nextDay__full').append(`<div class='content__block'>
            <div><img src=${value.show.image.medium} alt='picture' style='width:80px'></div>
            <div>
              <h5>${value.show.name}</h5>
              <span>${new Date(value.show.premiered).getFullYear()}</span><br>
              <span>Сезон ${value.season}</span>
              <span>Эпизод ${value.number}</span>
            </div>
            
          </div>`)
          }
        })
        $('#nextDay__full').append(`<div class='close'>Показать основные</div>`)
        $('#nextDay__full').on('click', function(event){
          $('#nextDay__full').hide();
          $('#nextDay .allShows').show();

        })
      })
        
    }, "json" );
}

