class Movie{


    constructor(title, genre, yob) {
      this.title = title;
      this.genre = genre;
      this.yob = yob;
    }
  
    toString(){
        const pubString = 'Titolo: ' + this.title + '\n' +
                          'Genere: ' + this.genre + '\n' +
                          'Anno di uscita: ' + this.yob;
      return pubString;
    }
}

function movieFactory(obj) {  
  return new Movie(obj.title, obj.genre, obj.yob)
}

exports.Movie = Movie;
exports.movieFactory = movieFactory;