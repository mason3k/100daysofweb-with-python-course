
const base_url = "http://movie_service.talkpython.fm/api/"

// noinspection ES6ModulesDependencies
app = new Vue({
    el: '#app',
    data: {
        search_text: null,
        movies: [],
        genres: [],
        selected_genre: null,
        no_genre: "Top movies by genre",
    },
    methods: {
        search: function () {
            let text = this.search_text
            // noinspection JSUnusedGlobalSymbols
            this.selected_genre = this.no_genre
            this.load_movies(base_url + "search/" + text)
        },
        top_10: function () {
            // noinspection JSUnusedGlobalSymbols
            this.selected_genre = this.no_genre
            this.load_movies(base_url + "movie/top")
        },
        load_genre: function (genre) {
            console.log("Would load " + genre)
        },
        load_movies: function (url) {
            let that = this
            // noinspection ES6ModulesDependencies, JSUnresolvedVariable
            axios.get(url)
                .then(function (response) { // handle success
                    that.movies = response.data.hits
                })
                .catch(function (error) { // handle error
                    console.log("ERROR! " + error);
                })
        },
        load_all_genres: function() {
            let that = this
            // noinspection ES6ModulesDependencies, JSUnresolvedVariable
            axios.get(base_url + 'movie/genre/all')
                .then(function (response) { // handle success
                    let genres = response.data
                    genres.unshift(that.no_genre)
                    that.genres = genres
                    that.selected_genre = that.no_genre
                })
                .catch(function (error) { // handle error
                    console.log("ERROR! " + error);
                })
        },
        init: function() {
            this.load_all_genres()
            this.top_10()
        }
    }
})

app.init()

