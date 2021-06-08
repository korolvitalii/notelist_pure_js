import { renderItems, renderCategories } from './view';
import getItems from './data';

export default () => {
  const items = getItems();
  const checkActiveNotes = (noteList) => noteList.filter(({ active }) => active);

  const checkArchiveNotes = (noteList) => noteList.filter(({ active }) => !active);

  const categories = (noteList) => noteList
    .reduce((acc, { category }) => (acc.includes(category) ? acc : [...acc, category]), []);

  const state = {
    categories: [],
    activeNotes: [],
    archiveNotes: [],
  };

  if (checkActiveNotes(items)) {
    state.activeNotes = checkActiveNotes(items);
    // renderActiveNotes();
  }
  if (checkArchiveNotes(items)) {
    state.archiveNotes = checkArchiveNotes(items);
    // renderArchiveNotes();
  }
  if (categories(items)) {
    state.categories = categories(items);
    renderCategories(state.categories);
  }

  // console.log(state);
  if (items.length !== 0) {
    renderItems(items);
  } else {
    return null;
  }
  return state;
};
