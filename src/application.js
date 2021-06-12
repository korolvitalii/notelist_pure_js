import { renderItems, renderSumTableItems, renderForm } from './view';
import getItems from './data';
import generateRandomNum from './utils';

const app = () => {
  const state = {
    form: {
      processState: 'close',
      fields: {
        name: '',
        category: '',
        dates: '',
        content: '',
      },
    },
    notesTable: {
      processState: 'show',
    },
    resultsTable: {
      processState: 'show',
    },
    notes: [],
    archiveNotes: [],
    categoriesType: [],
    categories: [],
  };

  const items = getItems();

  const countActiveNotes = (noteList, typeNote) => noteList
    .filter(({ active, category }) => active && typeNote === category).length;

  const countArchiveNotes = (noteList, typeNote) => noteList
    .filter(({ category, archive }) => archive && category === typeNote).length;

  const sortedCategories = (notes) => notes
    .reduce((acc, { category }) => (acc.includes(category) ? acc : [...acc, category]), []);

  const removeNote = (notes, currentId) => notes.filter(({ id }) => id !== currentId);

  const giveNotesUniqueId = (notes) => notes.reduce((acc, note) => {
    const id = generateRandomNum();
    const newNoteWithId = { ...note, id };
    return [...acc, newNoteWithId];
  }, []);

  const removeDomElements = (firstEl, secondEl) => {
    firstEl.forEach((selector) => {
      selector.remove();
    });
    secondEl.forEach((selector) => {
      selector.remove();
    });
  };

  state.notes = giveNotesUniqueId(items);
  state.categoriesType = sortedCategories(items);
  state.categories = sortedCategories(items).reduce((acc, note) => ({
    ...acc,
    [note]: {
      active: countActiveNotes(state.notes, note),
      archive: countArchiveNotes(state.archiveNotes, note),
    },
  }), {});

  const tableElements = {
    ulFirstTable: document.querySelector('.responsive-table'),
    ulResultTable: document.querySelector('.responsive-table-result'),
    allIconBasketElements: document.querySelectorAll('[data-type=basket]'),
    allIconArchiveElements: document.querySelectorAll('[data-type=archive]'),
    button: document.querySelector('.button'),
  };

  if (state.notesTable.processState === 'show' && state.resultsTable.processState === 'show') {
    const { notes } = state;
    const { ulFirstTable, ulResultTable } = tableElements;
    renderItems(notes, ulFirstTable);
    renderSumTableItems(state, ulResultTable);
  }

  const tableElementsAfterRender = {
    allIconBasketElements: document.querySelectorAll('[data-type=basket]'),
    allIconArchiveElements: document.querySelectorAll('[data-type=archive]'),
    button: document.querySelector('.button'),
  };

  const handleClickArchive = (handle) => (e) => {
    const liTableRow = document.querySelectorAll('.table-row');
    const liTableRowResult = document.querySelectorAll('.table-row-result');
    const {
      ulFirstTable,
      ulResultTable,
    } = tableElements;
    const { target } = e;
    const { notes, archiveNotes } = state;
    const currentId = Number(target.dataset.id);
    const currentNote = notes.filter(({ id }) => id === currentId)[0];
    const newNotes = removeNote(notes, currentId);
    state.notes = newNotes;
    currentNote.archive = true;
    currentNote.active = false;
    archiveNotes.push(currentNote);
    state
      .categories[currentNote.category].active = countActiveNotes(newNotes, currentNote.category);
    state
      .categories[currentNote.category]
      .archive = countArchiveNotes(archiveNotes, currentNote.category);
    removeDomElements(liTableRow, liTableRowResult);
    renderItems(newNotes, ulFirstTable);
    renderSumTableItems(state, ulResultTable);

    const basketElementAfterRender = document.querySelectorAll('[data-type=basket]');
    const archiveElementAfterRender = document.querySelectorAll('[data-type=archive]');

    archiveElementAfterRender.forEach((element) => element.addEventListener('click', handleClickArchive(handle)));
    basketElementAfterRender.forEach((element) => element.addEventListener('click', handle));
  };

  const handleClickDelete = (e) => {
    const li = document.querySelectorAll('.table-row');
    const liTableRowResult = document.querySelectorAll('.table-row-result');
    const {
      ulFirstTable,
      ulResultTable,
    } = tableElements;
    const { target } = e;
    const { notes, archiveNotes } = state;
    const currentId = Number(target.dataset.id);
    const currentNote = notes.filter(({ id }) => id === currentId)[0];
    const newNotes = removeNote(notes, currentId);
    state.notes = newNotes;
    state
      .categories[currentNote.category].active = countActiveNotes(newNotes, currentNote.category);
    state
      .categories[currentNote.category].archive = countArchiveNotes(archiveNotes, currentNote);
    removeDomElements(li, liTableRowResult);
    renderItems(newNotes, ulFirstTable);
    renderSumTableItems(state, ulResultTable);

    const basketElementAfterRender = document.querySelectorAll('[data-type=basket]');
    const archiveElementAfterRender = document.querySelectorAll('[data-type=archive]');

    basketElementAfterRender.forEach((element) => element.addEventListener('click', handleClickDelete));
    archiveElementAfterRender.forEach((element) => element.addEventListener('click', handleClickArchive(handleClickDelete)));
  };
  const handleButton = () => {
    state.form = 'show';
    renderForm();
  };

  tableElementsAfterRender.allIconBasketElements.forEach((element) => element.addEventListener('click', handleClickDelete));
  tableElementsAfterRender.allIconArchiveElements.forEach((element) => element.addEventListener('click', handleClickArchive(handleClickDelete)));
  tableElementsAfterRender.button.addEventListener('click', handleButton);
  return null;
};

export default app;
