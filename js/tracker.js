document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript loaded');

  const formInputs = document.querySelector('#inputForm');
  formInputs.addEventListener('submit', handleFormSubmitted);

  // const watchedList = document.querySelector('.list');
  // console.log(watchedList);
  // watchedList.addEventListener('submit', handleWatchedList);
});


const handleFormSubmitted = function () {
  const readingFormInputs = getFormInputs(event.target);
  console.log('readingFormInputs', readingFormInputs);
  const getNewListItem = createListItem();
  console.log('getNewListItem', getNewListItem);
  const createNewTags = createSeriesNameTag(readingFormInputs);
  console.log('createNewTags', createNewTags);

    getNewListItem.appendChild(createNewTags);
  // add it to DOM
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
