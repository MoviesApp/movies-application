/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, getMovie, editMovie, deleteMovie} = require('./api.js');

// FULL STAR: <i class="fas fa-star"></i>
// EMPTY STAR: <i class="far fa-star"></i>

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
  movies.forEach(({title, rating, id}) => {
    $(".moviesdiv").append(`<div class = "col-md-12">${title} ${starfunction(rating)}<button class="edit-movie-modal-btn btn btn-info" edit-id="${id}" data-target="#edit-movie-modal"><i class="fas fa-pencil-alt"></i></button><button class="delete-movie btn btn-danger" delete-id="${id}"><i class="fas fa-trash-alt"></i></button></div>`);
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

$('.post-movie').click(function() {
  $('.movies').removeClass('active');
  $('.loading').addClass('active');

  postMovie({ title: 'Lego Movie', rating: '3' }).then(data => getMovies().then(movies => {
    $('.loading').removeClass('active');
    $('.movies').addClass('active');

    console.log('Here are all the movies:');
    renderMovies(movies);
  })).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
});

$(document).on('click', '.edit-movie-modal-btn', function() {
  $('#edit-movie-modal').modal('show');

  getMovie($(this).attr('edit-id')).then((data) => {
    $('#title-name').val(data.title);
    $('#rating-text').val(data.rating);
  });

  $('.modal-footer').html(`<button type="button" class="edit-movie btn btn-primary" edit-id="${$(this).attr('edit-id')}">Submit</button>`);
});

$(document).on('click', '.edit-movie', function() {
  $('.movies').removeClass('active');
  $('.loading').addClass('active');

  editMovie($(this).attr('edit-id'), { title: $('#title-name').val(), rating: $('#rating-text').val() }).then(data => getMovies().then(movies => {
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