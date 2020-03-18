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


const renderMovies = (movies, genre) => {
  $(".movies-list").html("");

  movies.forEach(({image, title, rating, genre, id}) => {
    if (image === "") {
      image = "images/coming-soon.jpeg"
    }
    $(".movies-list").append(`
        <div class="col-md-4 moviesdiv">
          <div class = "individualMovies card">
            <div class="card-body">
 
            <h5 class="card-title">${title}</h5>
            <h6 class="card-subtitle mb-2 text-muted small">${genre}</h6>
            <p class="mb-2 text-muted">${starfunction(rating)}</p>
            
            <img src="${image}" class="card-img-top" alt="image">
     
            <div class="edit-delete-btns mt-3 text-center">
              <button class="edit-movie-modal-btn btn btn-info" edit-id="${id}" data-target="#edit-movie-modal">
              <i class="fas fa-pencil-alt"></i>
              </button>
              <button class="delete-movie btn btn-danger" delete-id="${id}">
              <i class="fas fa-trash-alt"></i>
              </button>
              
            </div>
          </div>
        </div>
      </div>`);
  });

  listGenres(genre);
};

getMovies().then((movies) => {
  $('.loading').removeClass('active');
  $('.movies-list').addClass('active');

  renderMovies(movies);
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});



// Stuff for adding movies
$(document).on('click', '.post-movie-modal-btn', () => {
    $('#post-movie-modal').modal('show');

    $('.modal-footer').html(`<button type="button" class="post-movie btn btn-primary">Submit</button>`);
  });

$(document).on('click', '.post-movie', () => {
  $('.movies-list').removeClass('active');
  $('.loading').addClass('active');

  postMovie({ title: $("#post-title-name").val(), rating: $("#post-rating-text").val(), image: $("#post-image-url").val(), genre: $("#post-genre").val()})
      .then(data => getMovies()
      .then(movies => {
    $('.loading').removeClass('active');
    $('.movies-list').addClass('active');
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
$(document).on('click', '.edit-movie-modal-btn', () => {
  $('#edit-movie-modal').modal('show');

  getMovie($(this).attr('edit-id')).then((data) => {
    $('#title-name').val(data.title);
    $('#rating-text').val(data.rating);
    $('#edit-image-url').val(data.image);
    $("#edit-genre").val(data.genre);
  });

  $('.modal-footer').html(`<button type="button" class="edit-movie btn btn-primary" edit-id="${$(this).attr('edit-id')}">Submit</button>`);
});

$(document).on('click', '.edit-movie', () => {
  $('.movies-list').removeClass('active');
  $('.loading').addClass('active');

  editMovie($(this).attr('edit-id'), { title: $('#title-name').val(), rating: $('#rating-text').val(), image: $("#edit-image-url").val(), genre: $("#edit-genre").val()}).then(data => getMovies().then(movies => {
    $('.loading').removeClass('active');
    $('.movies-list').addClass('active');

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

  $('.movies-list').removeClass('active');
  $('.loading').addClass('active');

  deleteMovie($(this).attr('delete-id')).then(data => getMovies().then(movies => {
    $('.loading').removeClass('active');
    $('.movies-list').addClass('active');

    console.log('Here are all the movies:');
    renderMovies(movies);
  })).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });
});

const listGenres = (genre) => {
  let genres = [];

  getMovies().then(movies => {
    $('.genre-list').html("").append(`
      <div class="form-check">
        <input type="radio" class="form-check-input" id="all" name="genre" value="all" checked>
        <label for="all" class="form-check-label">All</label>
      </div>
    `);

    movies.forEach(movie => {
      if(!genres.includes(movie)) {
        genres.push(movie.genre);
        if(movie.genre === genre) {
          $('.genre-list').append(`
            <div class="form-check">
              <input type="radio" class="form-check-input" id="${movie.genre}" name="genre" value="${movie.genre}" checked>
              <label for="${movie.genre}" class="form-check-label">${movie.genre}</label>
            </div>
          `);
        } else {
          $('.genre-list').append(`
            <div class="form-check">
              <input type="radio" class="form-check-input" id="${movie.genre}" name="genre" value="${movie.genre}">
              <label for="${movie.genre}" class="form-check-label">${movie.genre}</label>
            </div>
          `);
        }
      }
    });
  });
};

const filterGenres = genre => {
  $('.movies-list').removeClass('active');
  $('.loading').addClass('active');

  if($('.form-check-input').is(':checked') && $('.form-check-input:checked').val() !== 'all') {
    genre = $('.form-check-input:checked').val();

    let moviesBucket = [];

    getMovies().then(movies => {
      movies.forEach(function (movie) {
        if(movie.genre === genre) {
          moviesBucket.push(movie);
        }
      });

      $('.loading').removeClass('active');
      $('.movies-list').addClass('active');

      renderMovies(moviesBucket, genre);
    }).catch((error) => {
      alert('Oh no! Something went wrong.\nCheck the console for details.');
      console.log(error);
    });
  }  else {
    getMovies().then((movies) => {
      $('.loading').removeClass('active');
      $('.movies-list').addClass('active');

      renderMovies(movies);
    }).catch((error) => {
      alert('Oh no! Something went wrong.\nCheck the console for details.');
      console.log(error);
    });
  }
};

$('.apply-filter-btn').click(filterGenres);
