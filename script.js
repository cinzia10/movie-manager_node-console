const prompt = require('prompt');
const model = require('./model.js');
const fs = require('fs');

const elementArray = loadData();


console.log('Benvenuto in MOVIE MANAGER');

startMenu();




////////// MENU' PRINCIPALE
function startMenu() {

  console.log('Sono disponibili tre opzioni');
  console.log('1)  Cercare nella lista');
  console.log('2)  Modificare lista');
  console.log('3)  Visualizzare lista');
  console.log('4)  Esci');

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
  switch (result.selection) {
    case '1': searchElement();
      break;
    case '2': modifyMenu();
      break;
    case '3': viewMenu();
      break;
    case '4': console.log('Grazie e a presto!');
              process.exit();
    default: console.log('Selezione non disponibile');
             startMenu();
      break;
  }
}

////////// MENU' MODIFICA
function modifyMenu() {
  console.log('1) Aggiungi')
  console.log('2) Elimina')
  console.log('3) Modificare')
  console.log('4) Torna indietro')

  const schema = {
    properties: {
      selection: {
        description: 'Seleziona una delle opzioni',
      }
    }
  };
  prompt.get(schema, modifyMenuManager)
}
function modifyMenuManager(err, result) {
  switch (result.selection) {
    case '1': addElement();
      break;
    case '2': removeElement();
      break;
    case '3': modifyElement();
      break;
    case '4': startMenu();
      break;
    default: console.log('Selezione non disponibile');
             modifyMenu();
      break;
  }
}

////////// MENU' VISUALIZZAZIONE
function viewMenu() {
  console.log('1) Ordine di inserimento')
  console.log('2) Ordine per titolo')
  console.log('3) Ordine per anno')
  console.log('4) Torna indietro')

  const schema = {
    properties: {
      selection: {
        description: 'Seleziona una delle opzioni',
      }
    }
  };
  prompt.get(schema, viewMenuManager)
}
function viewMenuManager(err, result) {
  switch (result.selection) {
    case '1': printElementList(elementArray);
              startMenu();
      break;
    case '2': viewByTitle();
              startMenu();
      break;
    case '3': viewByYear();
              startMenu()
      break;
    case '4': startMenu();
      break;
    default: console.log('Selezione non disponibile');
             viewMenu();
      break;
  }
}



////////// AGGIUNGERE ELEMENTO
function addElement() {
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

  prompt.get(schema, addElementManager);
};

function addElementManager(err, result) {
  const movie = new model.Movie(result.title, result.genre, result.yop);
  elementArray.push(movie);
  saveData(elementArray);
  startMenu();
}


////////// PRINT LISTA
function printElementList(array) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const humanIndex = i + 1;
    console.log('----------------------------');
    console.log(humanIndex + ')' +'\n'+ element.toString());
    console.log('----------------------------');
  }
}


////////// CERCARE UN ELEMENTO ALL'INTERNO DELLA LISTA
function searchElement(){
  console.log('Ricerca dei titoli')

  const schema = {
    properties: {
      keyword: {
        description: 'Inserire la parola da cercare',
      }
    }
  }

  prompt.get(schema, searchElementManager);
}
function searchElementManager(err, result){
  const tempArray = [];
  for (const element of elementArray) {
    if (element.title.toLowerCase().includes(result.keyword.toLowerCase())) {
      tempArray.push(element);
    }
  }
  printElementList(tempArray);
}


////////// ELIMINARE UN ELEMENTO ALL'INTERNO DELLA LISTA
function modifyElement(){
  console.log('Elenco dei film presenti nella lista');
  printElementList(elementArray);

  const schema = {
    properties: {
      index: {
        description: 'Inserire il numero del film che desideri modificare',
      }
    }
  }

  prompt.get(schema, modifyElementManager);
}
function modifyElementManager(err, result){
  const humanIndex = parseInt(result.index);
  if (humanIndex === NaN){
    startMenu();
    return;
  }
  const index = humanIndex - 1;
  const isInArray = index >= 0 && index < elementArray.length;
  if (isInArray){
    elementArray.splice(index, 1);
    saveData(elementArray);
    startMenu();
  } else {
    console.log('Indice non trovato');
    startMenu();
  }
}

////////// ELIMINARE UN ELEMENTO ALL'INTERNO DELLA LISTA
function removeElement(){
  console.log('Elenco dei film presenti nella lista');
  printElementList(elementArray);

  const schema = {
    properties: {
      index: {
        description: 'Inserire il numero del film che desideri eliminare',
      }
    }
  }

  prompt.get(schema, removeElementManager);
}
function removeElementManager(err, result){
  const humanIndex = parseInt(result.index);
  if (humanIndex === NaN){
    startMenu();
    return;
  }
  const index = humanIndex - 1;
  const isInArray = index >= 0 && index < elementArray.length;
  if (isInArray){
    elementArray.splice(index, 1);
    saveData(elementArray);
    startMenu();
  } else {
    console.log('Indice non trovato');
    startMenu();
  }
}


////////// ORDINA ELEMENTI PER TITOLO
function viewByTitle() {
  const copy = [...elementArray];
  copy.sort(compareElementByTitle);
  printElementList(copy);
}
function compareElementByTitle(el1, el2) {
  return el1.title.localeCompare(el2.title);
}


////////// ORDINA ELEMENTI PER ANNO
function viewByYear() {
  const copy = [...elementArray];
  copy.sort(compareElementByPrice);
  printElementList(copy);
}
function compareElementByPrice(el1, el2) {
  return el1.yop - el2.yop;
}



////////// SALVARE LE INFORMAZIONI
function saveData(arrayToSave) {
  const jsonArray = JSON.stringify(arrayToSave);
  try {
    fs.writeFileSync('./data-file.json', jsonArray);
  } catch (error) {
    console.error('Impossibile salvare il file');
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

  const elArray = [];

  for (const obj of array) {
    const element = new model.Movie(obj.title, obj.genre, obj.yop);
    elArray.push(element);
  }
  return elArray;

}