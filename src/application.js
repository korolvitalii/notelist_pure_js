import { renderItems, renderSumTableItems } from './view';
import getItems from './data';
import generateRandomNum from './utils';

export default () => {
  const items = getItems();

  const countActiveNotes = (noteList, typeNode) => noteList
    .filter(({ active, category }) => active && typeNode === category).length;

  const countArchiveNotes = (noteList, typeNode) => noteList
    .filter(({ active, category }) => !active && typeNode === category).length;

  const categories = items
    .reduce((acc, { category }) => (acc.includes(category) ? acc : [...acc, category]), []);

  const giveNotesUniqueId = (notes) => notes.reduce((acc, note) => {
    const id = generateRandomNum();
    const newNoteWithId = { ...note, id };
    return [...acc, newNoteWithId];
  }, []);

  const filteredNotes = (notes, currentId) => notes.filter(({ id }) => id !== currentId);

  const state = {
    notes: giveNotesUniqueId(items),
    categoriesType: categories,
    categories: categories.reduce((acc, note) => ({
      ...acc,
      [note]: {
        active: countActiveNotes(items, note),
        archive: countArchiveNotes(items, note),
      },
    }), {}),
  };

  const tableElements = {
    ulFirstTable: document.querySelector('.responsive-table'),
    ulResultTable: document.querySelector('.responsive-table-result'),
  };

  if (items.length !== 0) {
    const { notes } = state;
    const { ulFirstTable, ulResultTable } = tableElements;
    renderItems(notes, ulFirstTable);
    renderSumTableItems(state.categories, state.categoriesType, ulResultTable);
  } else {
    return null;
  }
  const allIconEditElements = document.querySelectorAll('[data-type=archive]');
  const handleClick = (e) => {
    const li = document.querySelectorAll('.table-row');
    const { ulFirstTable, liRowTable } = tableElements;
    const { target } = e;
    const { notes } = state;
    const currentId = Number(target.dataset.id);
    const newNotes = filteredNotes(notes, currentId);
    // renderItems(newNotes, li);
    // state.notes = newNotes;
    // renderItems(newNotes, ulFirstTable);
  };
  allIconEditElements.forEach((element) => element.addEventListener('click', handleClick));
};
