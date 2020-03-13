/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, createMovies} = require('./api.js');
const $ = require('jquery');

$('.container').html('Loading...');

let buildMoviesList = (id, title, rating) => {
  $('.container').html('');
  $('.container').append(`id#${id} - ${title} - rating: ${rating}`);
}

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);

    buildMoviesList(`${id}`, `${title}`, `${rating}`);
  });

  $('.container').append('<button class="add-movie">Add Movie</button>').click(function() {
    createMovies('Twilight', '0').then(() => {
      console.log('Movie added...');
      getMovies();
    }).catch((error) => {
      alert('Oh no! Something went wrong.\nCheck the console for details.')
      console.log(error);
    });
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});
