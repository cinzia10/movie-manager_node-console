class Movie {


  constructor(title, genre, yop) {
    this.title = title;
    this.genre = genre;
    this.yop = yop;
  }

  toString() {
    const year = this.yop > 0 ? this.yop : 'Sconosciuto'
    const movString = 'Titolo: ' + this.title + '\n' +
      'Genere: ' + this.genre + '\n' +
      'Anno di uscita: ' + year;
    return movString;
  }
}

exports.Movie = Movie;