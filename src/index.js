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

const renderMovies = (movies) => {
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
};

getMovies().then((movies) => {
  console.log('Here are all the movies:');
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