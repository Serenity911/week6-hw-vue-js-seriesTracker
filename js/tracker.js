document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');

  const formInputs = document.querySelector('#inputForm');
  formInputs.addEventListener('submit', handleFormSubmitted);

  const clearButton = document.querySelector('#delete-button');
  clearButton.addEventListener('click', handleClearButton);

  const seriesSelected = document.querySelector('#series');
  seriesSelected.addEventListener('change', populateSeasonList )

  const seasonSelected = document.querySelector('#season');
  seasonSelected.addEventListener('change', populateEpisodeList );

});


const handleFormSubmitted = function () {
  // get inputs from form
  const readingFormInputs = getFormInputs(event.target);

  // create new html tags
  const newSeriesTag = createSeriesNameTag(readingFormInputs);
  const newSeasonTag = createSeasonTag(readingFormInputs);
  const newEpisodeTag = createEpisodeTag(readingFormInputs);
  const newNoteTag = createNoteTag(readingFormInputs);

  // check if div for Series already exists
  if (checkIfSeriesNotExists(readingFormInputs) === true) {
    // create a new u list
    const getNewListItem = createList(readingFormInputs);
    // add it to DOM
    addNewTag(getNewListItem, newSeriesTag);

    // create new list item
    const addNewListItem = createListItem(getNewListItem);
    // add it to DOM
    addNewTag(addNewListItem, newSeasonTag);
    addNewTag(addNewListItem, newEpisodeTag);
    addNewTag(addNewListItem, newNoteTag);

  } else {
    const newSeriesListId = readingFormInputs['series'].replace(/\s+/g, '');
    const seriesContainer = document.querySelector(`#${newSeriesListId}`);

    // create new list item
    const addNewListItem = createListItem(seriesContainer);
    // add it to DOM
    addNewTag(addNewListItem, newSeasonTag);
    addNewTag(addNewListItem, newEpisodeTag);
    addNewTag(addNewListItem, newNoteTag);
  }

// TODO order results per Season
  event.target.reset();

};

const getFormInputs = function () {
  event.preventDefault();

  const series = event.target.series.value;
  const season = event.target.season.value;
  const episode = event.target.episode.value;
  const note = event.target.note.value;

  return {series, season, episode, note}
}

const createList = function (readingFormInputs) {
  const listContainer = document.querySelector('.list');

  const newSeriesList = document.createElement('ul');
  const newSeriesListId = readingFormInputs['series'].replace(/\s+/g, '');
  newSeriesList.id =  `${newSeriesListId}`;
  listContainer.appendChild(newSeriesList);

  return newSeriesList;
};

const createListItem = function (parentUl) {
  const newSeriesItem = document.createElement('li');
  parentUl.appendChild(newSeriesItem);
  return newSeriesItem;
};

const createSeriesNameTag = function (readingFormInputs) {
  const seriesName = document.createElement('h3');
  seriesName.textContent = readingFormInputs['series'];
  return seriesName;
};

const createSeasonTag = function (readingFormInputs) {
  const season = document.createElement('h4');
  season.textContent = `Season: ${readingFormInputs['season']}`;
  return season;
}

const createEpisodeTag = function (readingFormInputs) {
  const episode = document.createElement('p');
  episode.textContent = `Episode: ${readingFormInputs['episode']}`;
  return episode;
}

const createNoteTag = function (readingFormInputs) {
  const note = document.createElement('p');
  note.textContent = `Note: ${readingFormInputs['note']}`;
  return note;
}

const addNewTag = function (getNewListItem, newTagToAdd) {
  getNewListItem.appendChild(newTagToAdd);
}

const handleClearButton = function () {
  const list = document.querySelector('.list');
  list.innerHTML = "";
  console.log('handleClearButton', handleClearButton);
}

const populateSeasonList = function () {
  const season = {"Doctor Who": 12, "Game of Thrones": 8, "Peaky Blinders": 5};
  selectedSeries = event.target.value;
  seasonsNumber = season[selectedSeries];
  const seasonList = document.querySelector("#season");
  seasonList.innerHTML = "";
  let itemList = document.createElement('option');
  itemList.value = "";
  itemList.textContent = "";
  seasonList.appendChild(itemList);

  for (i = 1; i <= seasonsNumber; i++) {
    const seasonList = document.querySelector("#season");
    let itemList = document.createElement('option');
    itemList.value = i;
    itemList.textContent = i;
    seasonList.appendChild(itemList);
  }
  return selectedSeries;
}

const populateEpisodeList = function (seriesSelected) {
  const episode = {
    "Doctor Who":
    [
      {season: 1 , episodes: 10},
      {season: 2 , episodes: 10} ,
      {season: 3 , episodes: 9} ,
      {season: 4 , episodes: 10} ,
      {season: 5 , episodes: 10} ,
      {season: 6 , episodes: 11} ,
      {season: 7 , episodes: 13} ,
      {season: 8 , episodes: 11} ,
      {season: 9 , episodes: 9} ,
      {season: 11 , episodes: 10} ,
      {season: 12 , episodes: 8}
    ] ,
    "Game of Thrones": [
      {season: 1 , episodes: 10},
      {season: 2 , episodes: 10} ,
      {season: 3 , episodes: 10} ,
      {season: 4 , episodes: 10} ,
      {season: 5 , episodes: 10} ,
      {season: 6 , episodes: 10} ,
      {season: 7 , episodes: 7} ,
      {season: 8 , episodes: 6}
    ] ,
    "Peaky Blinders": [
      {season: 1 , episodes: 6},
      {season: 2 , episodes: 6} ,
      {season: 3 , episodes: 6} ,
      {season: 4 , episodes: 6} ,
      {season: 5 , episodes: 6}
    ]
  };
  seasonSelected = parseInt(event.target.value);
  episodesNumber = episode[selectedSeries].find(x => x["season"]=== seasonSelected)["episodes"];
  const episodeList = document.querySelector('#episode');
  episodeList.innerHTML = "";

  for (i = 1; i <= episodesNumber; i++) {
    const episodeList = document.querySelector('#episode');
    let itemList = document.createElement('option');
    itemList.value = i;
    itemList.textContent = i;
    episodeList.appendChild(itemList);
  }
}

const checkIfSeriesNotExists = function (readingFormInputs) {
  const seriesId = readingFormInputs['series'].replace(/\s+/g, '');
  const seriesContainer = document.querySelector(`#${seriesId}`);
  return seriesContainer === null;
}
