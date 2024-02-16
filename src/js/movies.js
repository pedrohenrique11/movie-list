//Model
export class Movie {
    static getMovie(moviename) {
        const endpoint = `http://www.omdbapi.com/?apikey=5471a6fb&t=${moviename}`

        return fetch(endpoint)
        .then(data => data.json())
        .then( data => ({
            title: data.Title,
            plot: data.Plot,
            image: data.Poster,
            released: data.Released,
            runtime: data.Runtime,
            rated: data.Rated,
        }))
    }
}

//Model View
export class MovieList {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()

        Movie.getMovie('ad astra').then(movie => console.log(movie))
    }
    load() {
        this.entries = JSON.parse(localStorage.getItem('@movies:')) || [];
    }
    save() {
        localStorage.setItem('@movies:', JSON.stringify(this.entries))
    }
    async add(moviename) {
        try {
            const isOnTheList = this.entries.find(entry => entry.title === moviename);
            if(isOnTheList) throw new Error('film is already on the list');

            const movie = await Movie.getMovie(moviename);
            if(movie === undefined) throw new Error('Movie not found!');

            this.entries = [movie, ...this.entries];
            this.update();
            this.save();

        } catch(error) {
            alert(error.message)
        }
    }
    delete(movie) {
       const fileteredMovies = this.entries.filter(entry => entry.title !== movie.title)

    this.entries = fileteredMovies;
    this.update()
    this.save()
    }
}
//View
export class MoviesView extends MovieList {
    constructor(root){
        super(root)
        this.ul = this.root.querySelector('ul');
        
        this.update()
        this.onadd()
        
    }
    onadd() {
        const addButton = this.root.querySelector('#addButton')
        addButton.onclick = () => {
            const { value } = this.root.querySelector('#movieNameInput');
            this.add(value)
        };

    }
    update(){
        this.removeAllLi()
        this.entries.forEach(movie => {
            const card = this.createLi()

            card.querySelector('.movie-title').textContent = movie.title;
            card.querySelector('.movie-plot').textContent = movie.plot;
            card.querySelector('.released').textContent = movie.released;
            card.querySelector('.rated').textContent = movie.rated;
            card.querySelector('.runtime').textContent = movie.runtime;
            card.querySelector('img').src = movie.image;

            card.querySelector('#deleteButton').onclick = () => this.delete(movie);

            this.ul.append(card)
        })
    }
    createLi(){
        const li = document.createElement('li');
        li.innerHTML = 
        `
            <img src="" alt="">
                <div class="movie-description">
                    <h1 class="movie-title"></h1>
                    <p class="movie-plot"></p>
                        <div class="movie-details">
                            <h4 class="released"></h4>
                            <h4 class="runtime"></h4>
                            <h4 class="rated"></h4>
                            <button id="deleteButton">Delete</button>
                        </div>
                </div>`;

        return li
    }
    removeAllLi() {
        this.ul.querySelectorAll('li').forEach( (li) => {
            li.remove()
        })
    }
}