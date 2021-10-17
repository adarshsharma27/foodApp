const appId = '8c3b2f79';
const appKey = "833a3e6890a788bc921be8ddef44ffdb";

$(window).on('load', function () {
  $.ajax({
    url: `https://api.edamam.com/search?q=pizza&app_id=${appId}&app_key=${appKey}&from=0&to=30`,
    method: 'GET',
    success: function (data) {
      $.each(data.hits, function (key, value) {
        let html = ` <div class="col-xl-4 col-md-4 col-sm-12">
                <div class="product-card text-left">
                    <img class="img-responsive" src=${value.recipe.image}>
                    <div class="product-image-caption">
                        <div class="product-image-txt">
                            <h3>${value.recipe.label}</h3>
                            <p class="decription-1">Calories:${value.recipe.calories}</p>
                            <p class="decription-2">TotalWeight:${value.recipe.totalWeight}</p>
                            <p class="decription-3">CuisineType:${value.recipe.cuisineType}</p>
                            <a href=${value.recipe.url}></a>    
                        </div>
                    </div>
                </div>
            </div>`
        $('#food-cards').append(html);

      });
    },
    error: function (error) {
      console.log(error);
    }

  });

});

$('.fa-search').click(function (event) {
  $('#food-cards').html('');
  event.preventDefault();
  searchFood = $("#search").val();
  $.ajax({
    url: `https://api.edamam.com/search?q=${searchFood}&app_id=${appId}&app_key=${appKey}&from=0&to=20&`,
    method: 'GET',
    success: function (data) {
      $.each(data.hits, function (key, value) {
        let html = `<div class="col-xl-4 col-md-3 col-sm-12">
                <div class = "product-card py-4 text-left" >
                    <img class="img-responsive" src=${value.recipe.image}>
                    <div class="product-image-caption">
                        <div class="product-image-txt">
                           <h3>${value.recipe.label}</h3>
                            <p class="decription-1">Calories:${value.recipe.calories}</p>
                            <p class="decription-2">TotalWeight:${value.recipe.totalWeight}</p>
                            <p class="decription-3">CuisineType:${value.recipe.cuisineType}</p>
                              <a href=${value.recipe.url}></a> 
                        </div>
                    </div>
                </div>
            </div>`
        $('#food-cards').append(html);
      });
    },
    error: function (error) {
      console.log(error);
    }

  });
});


$(document).on("click", ".img-responsive", function (event) {
  let image = $(this).attr('src')
  let heading = $(this).siblings('.product-image-caption').children('.product-image-txt').children('h3').text().trim();
  let p1 = $(this).siblings('.product-image-caption').children('.product-image-txt').children('.decription-1').text().trim();
  let p2 = $(this).siblings('.product-image-caption').children('.product-image-txt').children('.decription-2').text().trim();
  let p3 = $(this).siblings('.product-image-caption').children('.product-image-txt').children('.decription-3').text().trim();
  let btnUrl = $(this).siblings('.product-image-caption').children('.product-image-txt').children('a').attr('href');
  window.location.href = "details.html";

  let foodDetails = {
    imageUrl: image,
    name: heading,
    par: p1,
    par2: p2,
    par3: p3,
    cta: btnUrl
  }
  console.log(foodDetails)

  localStorage.setItem("FoodData", JSON.stringify(foodDetails));
});

let foodData = JSON.parse(localStorage.getItem("FoodData"))
$('.row').html('')
$("#details").html(`
  <div class="col-md-6 order-md-1 order-2 text-md-left text-center py-4 ">
      <h4  class="font-weight-light animation"><b>${foodData.name}</b></h4>
        <div  class="description py- animation  overflow-hidden">
          <span><i class="fas fa-utensils"></i></span><p> ${foodData.par} </p>
          <p> ${foodData.par2} </p>
          <p> ${foodData.par3} </p>
          <span><i class = "fas fa-utensils"> </i></span>
      </div>
      <a href=${foodData.cta}  class="btn btn-primary  my-3  animation" data-fancybox="gallery">Read More</a>
        </div>
  <div  class="col-md-6 order-md-2 order-1 text-center p-0 h-100 w-100 ">
    <img  src=${foodData.imageUrl}  class="img-fluid">
  </div>
`

)