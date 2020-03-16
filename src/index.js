/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, getMovie, postMovie, editMovie, deleteMovie} = require('./api.js');

const starfunction = (x) => {
  let stars;
  switch (parseInt(x)) {
    case 1:
      stars = '<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
      break;
    case 2:
      stars = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
      break;
    case 3:
      stars = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
      break;
    case 4:
      stars = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>';
      break;
    case 5:
      stars = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
      break;
    default:
      stars = '<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
  }
  return stars
};


const renderMovies = (movies) => {
  $(".moviesdiv").html("");
  movies.forEach(({image, title, rating, id}) => {
    if (image === "") {
      image = "images/coming-soon.jpeg"
    }
    $(".moviesdiv").append(`
<div class = "individualMovies card">
<div class="card-body">

<h5 class="card-title">${title}</h5>
     <h6 class="card-subtitle mb-2 text-muted">${starfunction(rating)}</h6>
     <img src="${image}" class="card-img-top" alt="image">
 
<button class="edit-movie-modal-btn btn btn-info" edit-id="${id}" data-target="#edit-movie-modal">
<i class="fas fa-pencil-alt"></i>
</button>
<button class="delete-movie btn btn-danger" delete-id="${id}">
<i class="fas fa-trash-alt"></i>
</button>

</div>
</div>`);
  });
};

getMovies().then((movies) => {
  $('.loading').removeClass('active');
  $('.movies').addClass('active');

  renderMovies(movies);
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});



// Stuff for adding movies
$(document).on('click', '.post-movie-modal-btn', function() {
    $('#post-movie-modal').modal('show');

    $('.modal-footer').html(`<button type="button" class="post-movie btn btn-primary">Submit</button>`);
  });

$(document).on('click', '.post-movie', function() {
  $('.movies').removeClass('active');
  $('.loading').addClass('active');

  postMovie({ title: $("#post-title-name").val(), rating: $("#post-rating-text").val(), image: $("#post-image-url").val()})
      .then(data => getMovies()
      .then(movies => {
    $('.loading').removeClass('active');
    $('.movies').addClass('active');
    console.log('Here are all the movies:');
    renderMovies(movies);
  }))
      .catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
  $('#post-movie-modal').modal('hide');
});



//Stuff for editing movies
$(document).on('click', '.edit-movie-modal-btn', function() {
  $('#edit-movie-modal').modal('show');

  getMovie($(this).attr('edit-id')).then((data) => {
    $('#title-name').val(data.title);
    $('#rating-text').val(data.rating);
    $('#edit-image-url').val(data.image);
  });

  $('.modal-footer').html(`<button type="button" class="edit-movie btn btn-primary" edit-id="${$(this).attr('edit-id')}">Submit</button>`);
});

$(document).on('click', '.edit-movie', function() {
  $('.movies').removeClass('active');
  $('.loading').addClass('active');

  editMovie($(this).attr('edit-id'), { title: $('#title-name').val(), rating: $('#rating-text').val(), image: $("#edit-image-url").val()}).then(data => getMovies().then(movies => {
    $('.loading').removeClass('active');
    $('.movies').addClass('active');

    console.log('Here are all the movies:');
    renderMovies(movies);
  })).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });

  $('#edit-movie-modal').modal('hide');
});



//Stuff for delete movies
$(document).on('click', '.delete-movie', function() {
  console.log($(this).attr('delete'));

  $('.movies').removeClass('active');
  $('.loading').addClass('active');

  deleteMovie($(this).attr('delete-id')).then(data => getMovies().then(movies => {
    $('.loading').removeClass('active');
    $('.movies').addClass('active');

    console.log('Here are all the movies:');
    renderMovies(movies);
  })).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
});
