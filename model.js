
const prompt = require('prompt');

class Movie {
    constructor(title, genre, yop) {
        this.title = title;
        this.genre = genre;
        this.yop = yop;
    }
}

prompt.start();

function startMenu() {
    console.log('sono disponibili tre opzioni');
    console.log('1) aggiungi un film');
    console.log('2) lista film');
    console.log('3) esci')

    const schema = {
        properties: {
            selection: {
                description: 'Seleziona una delle opzioni',
            }
        }
    }
    prompt.get(schema, startMenuManager);
}


function startMenuManager(err, result) {
    if (result.selection === '1') {
        console.log('scelta 1');;
    } else if (result.selection === '2') {
        console.log('scelta 2');;
    } else if (result.selection === '3') {
        console.log('Scelta 3')
        process.exit();
    } else {
        console.log('selezione non disponibile');
        startMenu();
    }
}


function saveData(arrayToSave) {
    const jsonArray = JSON.stringify(arrayToSave);

    try {
        fs.writeFileSync('./movie-data.json', jsonArray);
    } catch (error) {
        console.log('impossibile salvare il file')
    }
}

function loadData() {
    let jsonArray = '[]';

    try {
        jsonArray = fs.readFileSync('./movie-data.json', 'utf8');
    } catch (error) {
        jsonArray = '[]';
    }

    jsonArray = jsonArray.trim();
    let array = [];
    if (jsonArray) {
        array = JSON.parse(jsonArray);
    }

    const pubArray = [];

    for (const obj of array) {
        const publication = model.publicationFactory(obj);
        pubArray.push(publication)
    }
    return pubArray
}


exports.Movie = Movie;
exports.startMenu = startMenu;
