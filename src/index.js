/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, postMovie, editMovie, deleteMovie} = require('./api.js');
const $ = require('jquery');

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
    $(".moviesdiv").append(`<div class = "col-md-12">${title} ${starfunction(rating)}</div>`);
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

$('.edit-movie').click(function() {
  $('.movies').removeClass('active');
  $('.loading').addClass('active');

  editMovie(4, { title: 'The Lego Movie', rating: '4' }).then(data => getMovies().then(movies => {
    $('.loading').removeClass('active');
    $('.movies').addClass('active');

    console.log('Here are all the movies:');
    renderMovies(movies);
  })).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
});

$('.delete-movie').click(function() {
  $('.movies').removeClass('active');
  $('.loading').addClass('active');

  deleteMovie(3).then(data => getMovies().then(movies => {
    $('.loading').removeClass('active');
    $('.movies').addClass('active');

    console.log('Here are all the movies:');
    renderMovies(movies);
  })).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
});