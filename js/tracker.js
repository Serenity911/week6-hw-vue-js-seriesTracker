document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');

  const formInputs = document.querySelector('#inputForm');
  formInputs.addEventListener('submit', handleFormSubmitted);

  const clearButton = document.querySelector('#delete-button');
  clearButton.addEventListener('click', handleClearButton);

  const seriesSelected = document.querySelector('#series');
  seriesSelected.addEventListener('change', populateSeasonList )
});


const handleFormSubmitted = function () {
  // get inputs from form
  const readingFormInputs = getFormInputs(event.target);
  // create a new list
  const getNewListItem = createListItem();
  // create new html tags
  const newSeriesTag = createSeriesNameTag(readingFormInputs);
  const newSeasonTag = createSeasonTag(readingFormInputs);
  const newEpisodeTag = createEpisodeTag(readingFormInputs);
  const newNoteTag = createNoteTag(readingFormInputs);

  // add it to DOM
  addNewTag(getNewListItem, newSeriesTag);
  addNewTag(getNewListItem, newSeasonTag);
  addNewTag(getNewListItem, newEpisodeTag);
  addNewTag(getNewListItem, newNoteTag);
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

const createListItem = function () {
  const list = document.querySelector('.list');
  const newListItem = document.createElement('li');
  list.appendChild(newListItem);
  return newListItem;
}

const createSeriesNameTag = function (readingFormInputs) {
  const seriesName = document.createElement('h3');
  seriesName.textContent = readingFormInputs['series'];
  return seriesName;
}

const createSeasonTag = function (readingFormInputs) {
  const season = document.createElement('h4');
  season.textContent = readingFormInputs['season'];
  return season;
}

const createEpisodeTag = function (readingFormInputs) {
  const episode = document.createElement('p');
  episode.textContent = readingFormInputs['episode'];
  return episode;
}

const createNoteTag = function (readingFormInputs) {
  const note = document.createElement('p');
  note.textContent = readingFormInputs['note'];
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
  const season = {"Doctor Who": 12, "Game of Throne": 8, "Peaky Blinders": 5};
  selectedSeries = event.target.value;
  seasonsNumber = season[selectedSeries];
  console.log("selectedSeries", selectedSeries);
  const seasonList = document.querySelector('#season');
  seasonList.innerHTML = "";

  for (i = 1; i <= seasonsNumber; i++) {
    const seasonList = document.querySelector('#season');
    let itemList = document.createElement('option');
    itemList.value = i;
    console.log("i", i);
    itemList.textContent = i;
    seasonList.appendChild(itemList);
  }
}
