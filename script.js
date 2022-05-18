const prompt = require('prompt');
const model = require('./model.js');
const fs = require('fs');

const movieArray = loadData();


console.log('Benvenuto in MOVIE MANAGER');

startMenu();




////////// MENU' PRINCIPALE
function startMenu() {

  console.log('Sono disponibili tre opzioni');
  console.log('1)  Aggiungere film');
  console.log('2)  Lista dei film');
  console.log('3)  Esci');

  prompt.start();

  const schema = {
    properties: {
      selection: {
        description: 'Seleziona una delle opzioni',
      }
    }
  };

  prompt.get(schema, startMenuManager);

}
function startMenuManager(err, result) {
  if (result.selection === '1') {
    insertMovie();
  } else if (result.selection === '2') {
    printMovieList(movieArray);
  } else if (result.selection === '3') {
    console.log('Grazie e a presto!');
    process.exit();
  } else {
    console.log('Selezione non disponibile');
    startMenu();
  }
}

////////// AGGIUNGERE FILM
function insertMovie() {
  const schema = {
    properties: {
      title: {
        description: 'Inserisci il titolo',
      },
      genre: {
        description: 'Inserisci il genere',
      },
      yop: {
        description: 'Inserisci l\'anno di uscita',
      }

    }
  };

  prompt.get(schema, insertMovieManager);
};

function insertMovieManager(err, result) {
  const movie = new model.Movie(result.title, result.genre, result.yop);
  movieArray.push(movie);
  saveData(movieArray);
  startMenu();
}

////////// PRINT LISTA DEI FILM
function printMovieList(array) {
  for (const movie of array) {
    console.log('----------------------------');
    console.log(movie.toString());
    console.log('----------------------------');
  }
}


////////// SALVARE LE INFORMAZIONI
function saveData(arrayToSave) {
  const jsonArray = JSON.stringify(arrayToSave);
  try {
    fs.writeFileSync('./data-file.json', jsonArray);
  } catch (error) {
    console.error('Impossibile salvare il file ');
  }

}

////////// CARICARE LE INFORMAZIONI
function loadData() {
  let jsonArray;

  try {
    jsonArray = fs.readFileSync('./data-file.json', 'utf8');
  } catch (error) {
    jsonArray = '[]';
  }
  jsonArray = jsonArray.trim();
  let array = [];
  if (jsonArray) {
    array = JSON.parse(jsonArray);
  }

  const movArray = [];

  for (const obj of array) {
    const movie = model.movieFactory(obj);
    movArray.push(movie);
  }
  return movArray;

}