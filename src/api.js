module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },

  createMovies: (title, rating) => {
    return fetch('/api/movies', {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({
            title: title,
            rating: rating
          })
        }
    )
        .then(response => response.json());
  }
};
