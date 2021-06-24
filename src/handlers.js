import {
  countActiveNotes,
  countArchiveNotes,
  removeNote,
  removeDomElements,
  generateNewNote,
} from './helpers';
import {
  renderItems, renderSumTableItems, renderForm, renderArchivedNotes,
} from './view';

const tableElements = {
  ulFirstTable: document.querySelector('.responsive-table'),
  ulResultTable: document.querySelector('.responsive-table-result'),
  ulArchiveTable: document.querySelector('.responsive-table-archive'),
  allIconBasketElements: document.querySelectorAll('[data-type=basket]'),
  allIconArchiveElements: document.querySelectorAll('[data-type=archive]'),
  allIconEditElements: document.querySelectorAll('[data-type=edit]'),
  button: document.querySelector('.button'),
};

const handleClick = (handlers, state) => (e) => {
  e.preventDefault();
  renderForm();
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit(handlers, state));
};

const handleSubmit = (handlers, state) => (e) => {
  e.preventDefault();
  const {
    ulFirstTable,
    ulResultTable,
  } = tableElements;
  const { notes } = state;
  const li = document.querySelectorAll('.table-row');
  const liTableRowResult = document.querySelectorAll('.table-row-result');
  const form = document.querySelector('form');
  const formData = new FormData(e.target);
  const newNote = generateNewNote(formData);
  const addNewNoteToAllNote = [...notes, newNote];
  state.notes = addNewNoteToAllNote;
  if (state.categories[newNote.category]) {
    state
      .categories[newNote.category]
      .active = countActiveNotes(addNewNoteToAllNote, newNote.category);
  } else {
    const nameCategory = newNote.category;
    const newCategory = {
      [nameCategory]: {
        active: 1,
        archive: 0,
      },
    };
    const newCategories = { ...state.categories, ...newCategory };
    state.categories = newCategories;
    state.categoriesType.push(nameCategory);
  }
  removeDomElements(li, liTableRowResult, form);
  renderItems(addNewNoteToAllNote, ulFirstTable);
  renderSumTableItems(state, ulResultTable);

  const basketElementAfterRender = document.querySelectorAll('[data-type=basket]');
  const archiveElementAfterRender = document.querySelectorAll('[data-type=archive]');
  const editElementAfterRender = document.querySelectorAll('[data-type=edit]');

  basketElementAfterRender.forEach((element) => element.addEventListener('click', handleRemove(handlers, state)));
  archiveElementAfterRender.forEach((element) => element.addEventListener('click', handleArchive(handlers, state)));
  editElementAfterRender.forEach((element) => element.addEventListener('click', handleEdit(handlers, state)));
};

const handleEdit = (handlers, state) => (e) => {
  const { handleRemove, handleArchive } = handlers;
  e.preventDefault();
  const { notes } = state;
  const { target } = e;
  const currentId = Number(target.dataset.id);
  const currentNote = notes.filter(({ id }) => id === currentId)[0];
  const newNotes = notes.filter(({ id }) => id !== currentId);
  state.notes = newNotes;
  renderForm(currentNote);
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit(handlers, state));

  const basketElementAfterRender = document.querySelectorAll('[data-type=basket]');
  const archiveElementAfterRender = document.querySelectorAll('[data-type=archive]');
  const editElementAfterRender = document.querySelectorAll('[data-type=edit]');
  const unarchiveElementAfterRender = document.querySelectorAll('[data-type=unarchive]');

  archiveElementAfterRender.forEach((element) => element.addEventListener('click', handleArchive(handlers, state)));
  basketElementAfterRender.forEach((element) => element.addEventListener('click', handleRemove(handlers, state)));
  editElementAfterRender.forEach((element) => element.addEventListener('click', handleEdit(handlers, state)));
  unarchiveElementAfterRender.forEach((element) => element.addEventListener('click', handleUnachive(handlers, state)));
};

const handleUnachive = (handlers, state) => (e) => {
  e.preventDefault();
  const { notes, archiveNotes } = state;
  const { target } = e;
  const {
    ulFirstTable,
    ulResultTable,
    ulArchiveTable,
  } = tableElements;
  const liTableRow = document.querySelectorAll('.table-row');
  const liTableRowResult = document.querySelectorAll('.table-row-result');
  const currentId = Number(target.dataset.id);
  const currentNote = archiveNotes.filter(({ id }) => id === currentId)[0];
  const newArchiveNotes = removeNote(archiveNotes, currentId);
  state.archiveNotes = newArchiveNotes;
  currentNote.archive = false;
  currentNote.active = true;
  notes.push(currentNote);

  removeDomElements(liTableRow, liTableRowResult);
  renderItems(notes, ulFirstTable);
  renderSumTableItems(state, ulResultTable);
  renderArchivedNotes(state, ulArchiveTable);

  const basketElementAfterRender = document.querySelectorAll('[data-type=basket]');
  const archiveElementAfterRender = document.querySelectorAll('[data-type=archive]');
  const editElementAfterRender = document.querySelectorAll('[data-type=edit]');
  const unarchiveElementAfterRender = document.querySelectorAll('[data-type=unarchive]');

  archiveElementAfterRender.forEach((element) => element.addEventListener('click', handleArchive(handlers, state)));
  basketElementAfterRender.forEach((element) => element.addEventListener('click', handleRemove(handlers, state)));
  editElementAfterRender.forEach((element) => element.addEventListener('click', handleEdit(handlers, state)));
  unarchiveElementAfterRender.forEach((element) => element.addEventListener('click', handleUnachive(handlers, state)));
};

const handleArchive = (handlers, state) => (e) => {
  const { handleRemove } = handlers;
  const liTableRow = document.querySelectorAll('.table-row');
  const liTableRowResult = document.querySelectorAll('.table-row-result');
  const {
    ulFirstTable,
    ulResultTable,
    ulArchiveTable,
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
  renderArchivedNotes(state, ulArchiveTable);

  const basketElementAfterRender = document.querySelectorAll('[data-type=basket]');
  const archiveElementAfterRender = document.querySelectorAll('[data-type=archive]');
  const editElementAfterRender = document.querySelectorAll('[data-type=edit]');
  const unArchiveElementAfterRender = document.querySelectorAll('[data-type=unarchive]');

  archiveElementAfterRender.forEach((element) => element.addEventListener('click', handleArchive(handlers, state)));
  basketElementAfterRender.forEach((element) => element.addEventListener('click', handleRemove(handlers, state)));
  editElementAfterRender.forEach((element) => element.addEventListener('click', handleEdit(handlers, state)));
  unArchiveElementAfterRender.forEach((element) => element.addEventListener('click', handleUnachive(handlers, state)));
};

const handleRemove = (handlers, state) => (e) => {
  const li = document.querySelectorAll('.table-row');
  const liTableRowResult = document.querySelectorAll('.table-row-result');
  const {
    ulFirstTable,
    ulResultTable,
    ulArchiveTable,
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
  renderArchivedNotes(state, ulArchiveTable);

  const basketElementAfterRender = document.querySelectorAll('[data-type=basket]');
  const archiveElementAfterRender = document.querySelectorAll('[data-type=archive]');
  const editElementAfterRender = document.querySelectorAll('[data-type=edit]');
  const unArchiveElementAfterRender = document.querySelectorAll('[data-type=unarchive]');

  basketElementAfterRender.forEach((element) => element.addEventListener('click', handleRemove(handlers, state)));
  archiveElementAfterRender.forEach((element) => element.addEventListener('click', handleArchive(handlers, state)));
  editElementAfterRender.forEach((element) => element.addEventListener('click', handleEdit(handlers, state)));
  unArchiveElementAfterRender.forEach((element) => element.addEventListener('click', handleUnachive(handlers, state)));
};

export {
  handleArchive,
  handleRemove,
  handleSubmit,
  handleClick,
  handleEdit,
  handleUnachive,
};
