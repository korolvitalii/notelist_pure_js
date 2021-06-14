import {
  countActiveNotes,
  countArchiveNotes,
  removeNote,
  removeDomElements,
  generateNewNote,
} from './helper';
import { renderItems, renderSumTableItems, renderForm } from './view';

const tableElements = {
  ulFirstTable: document.querySelector('.responsive-table'),
  ulResultTable: document.querySelector('.responsive-table-result'),
  allIconBasketElements: document.querySelectorAll('[data-type=basket]'),
  allIconArchiveElements: document.querySelectorAll('[data-type=archive]'),
  allIconEditElements: document.querySelectorAll('[data-type=edit]'),
  button: document.querySelector('.button'),
};

const handleButton = (state) => (e) => {
  e.preventDefault();
  renderForm();
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmitButton(state));
};

const handleSubmitButton = (state) => (e) => {
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

  basketElementAfterRender.forEach((element) => element.addEventListener('click', handleClickDelete(state)));
  archiveElementAfterRender.forEach((element) => element.addEventListener('click', handleClickArchive(handleClickDelete, state)));
  editElementAfterRender.forEach((element) => element.addEventListener('click', handleEditButton(handleClickArchive, handleClickDelete, state)));
};

const handleEditButton = (handleArchive, handleRemove, state) => (e) => {
  e.preventDefault();
  const { notes } = state;
  const { target } = e;
  const currentId = Number(target.dataset.id);
  const currentNote = notes.filter(({ id }) => id === currentId)[0];
  const newNotes = notes.filter(({ id }) => id !== currentId);
  state.notes = newNotes;
  renderForm(currentNote);
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmitButton(state));

  const basketElementAfterRender = document.querySelectorAll('[data-type=basket]');
  const archiveElementAfterRender = document.querySelectorAll('[data-type=archive]');
  const editElementAfterRender = document.querySelectorAll('[data-type=edit]');

  archiveElementAfterRender.forEach((element) => element.addEventListener('click', handleArchive(handleRemove, state)));
  basketElementAfterRender.forEach((element) => element.addEventListener('click', handleRemove(state)));
  editElementAfterRender.forEach((element) => element.addEventListener('click', handleEditButton));
};

const handleClickArchive = (handle, state) => (e) => {
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
  const editElementAfterRender = document.querySelectorAll('[data-type=edit]');

  archiveElementAfterRender.forEach((element) => element.addEventListener('click', handleClickArchive(handle, state)));
  basketElementAfterRender.forEach((element) => element.addEventListener('click', handle(state)));
  editElementAfterRender.forEach((element) => element.addEventListener('click', handleEditButton(handle, handleClickArchive, state)));
};

const handleClickDelete = (state) => (e) => {
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
  const editElementAfterRender = document.querySelectorAll('[data-type=edit]');

  basketElementAfterRender.forEach((element) => element.addEventListener('click', handleClickDelete(state)));
  archiveElementAfterRender.forEach((element) => element.addEventListener('click', handleClickArchive(handleClickDelete, state)));
  editElementAfterRender.forEach((element) => element.addEventListener('click', handleEditButton(handleClickArchive, handleClickDelete, state)));
};

export {
  handleClickArchive,
  handleClickDelete,
  handleSubmitButton,
  handleButton,
  handleEditButton,
};
