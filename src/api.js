module.exports = {
    getMovies: () => {
        return fetch('/api/movies')
            .then(response => response.json());
    },

    postMovie: (movie) => {
        return fetch('/api/movies', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(movie)
        })
        .then(response => response.json());
    },

    editMovie: (id, movie) => {
        return fetch(`/api/movies/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(movie)
        })
            .then(response => response.json());
    },

    deleteMovie: (id) => {
        return fetch(`/api/movies/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json());
    }
};
