export class Movie {
    async getMovie(moviename) {
        const endpoint = `http://www.omdbapi.com/?apikey=[yourkey]&t=${moviename}`

        fetch(endpoint)
        .then(data => data.json())
        .then( value => ({
            title: value.Title,
            plot: value.Plot,
            image: value.Poster,
            released: value.Released,
            runtime: value.Runtime,
            rated: value.Rated,
        }))
    }
}

//Model View
export class MovieList {
    constructor(root) {
        this.root = document.querySelector(root)

        this.update()
    }
    update(){
        const ul = this.root.querySelector('ul')
        console.log(ul.querySelectorAll('li'))
    }
}
class MoviesView extends MovieList {
    constructor(root){
        super(root)

        this.ul = root.querySelector('ul')

    }
}