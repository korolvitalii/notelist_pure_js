import {
  countActiveNotes,
  countArchiveNotes,
  removeNote,
  removeDomElements,
  generateNewNote,
} from './helpers';
import { renderItems, renderSumTableItems, renderForm, renderArchivedNotes } from './view';

const tableElements = {
  ulFirstTable: document.querySelector('.responsive-table'),
  ulResultTable: document.querySelector('.responsive-table-result'),
  ulArchiveTable: document.querySelector('.responsive-table-archive'),
  allIconBasketElements: document.querySelectorAll('[data-type=basket]'),
  allIconArchiveElements: document.querySelectorAll('[data-type=archive]'),
  allIconEditElements: document.querySelectorAll('[data-type=edit]'),
  button: document.querySelector('.button'),
};

const click = (handlers, state) => (e) => {
  e.preventDefault();
  renderForm();
  const form = document.querySelector('form');
  form.addEventListener('submit', submit(handlers, state));
};

const submit = (handlers, state) => (e) => {
  e.preventDefault();
  const { ulFirstTable, ulResultTable } = tableElements;
  const { notes } = state;
  const li = document.querySelectorAll('.table-row');
  const liTableRowResult = document.querySelectorAll('.table-row-result');
  const form = document.querySelector('form');
  const formData = new FormData(e.target);
  const newNote = generateNewNote(formData);
  const addNewNoteToAllNote = [...notes, newNote];
  state.notes = addNewNoteToAllNote;
  if (state.categories[newNote.category]) {
    state.categories[newNote.category].active = countActiveNotes(
      addNewNoteToAllNote,
      newNote.category,
    );
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
  const elementsAfterRerender = {
    remove: document.querySelectorAll('[data-type=basket]'),
    archive: document.querySelectorAll('[data-type=archive]'),
    edit: document.querySelectorAll('[data-type=edit]'),
  };
  const keys = Object.keys(elementsAfterRerender);
  keys.map((key) => {
    console.log(handlers[key]);
    return elementsAfterRerender[key].forEach((element) =>
      element.addEventListener('click', handlers[key](handlers, state)),
    );
  });
};

const edit = (handlers, state) => (e) => {
  const { remove, archive } = handlers;
  e.preventDefault();
  const { notes } = state;
  const { target } = e;
  const currentId = Number(target.dataset.id);
  const currentNote = notes.filter(({ id }) => id === currentId)[0];
  const newNotes = notes.filter(({ id }) => id !== currentId);
  state.notes = newNotes;
  renderForm(currentNote);
  const form = document.querySelector('form');
  form.addEventListener('submit', submit(handlers, state));

  const elementsAfterRerender = {
    remove: document.querySelectorAll('[data-type=basket]'),
    archive: document.querySelectorAll('[data-type=archive]'),
    edit: document.querySelectorAll('[data-type=edit]'),
    unarchive: document.querySelectorAll('[data-type=unarchive]'),
  };
  const keys = Object.keys(elementsAfterRerender);
  keys.map((key) => {
    console.log(handlers[key]);
    return elementsAfterRerender[key].forEach((element) =>
      element.addEventListener('click', handlers[key](handlers, state)),
    );
  });
};

const unarchive = (handlers, state) => (e) => {
  e.preventDefault();
  const { notes, archiveNotes } = state;
  const { target } = e;
  const { ulFirstTable, ulResultTable, ulArchiveTable } = tableElements;
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

  const elementsAfterRerender = {
    remove: document.querySelectorAll('[data-type=basket]'),
    archive: document.querySelectorAll('[data-type=archive]'),
    edit: document.querySelectorAll('[data-type=edit]'),
    unarchive: document.querySelectorAll('[data-type=unarchive]'),
  };
  const keys = Object.keys(elementsAfterRerender);
  keys.map((key) => {
    console.log(handlers[key]);
    return elementsAfterRerender[key].forEach((element) =>
      element.addEventListener('click', handlers[key](handlers, state)),
    );
  });
};

const archive = (handlers, state) => (e) => {
  const liTableRow = document.querySelectorAll('.table-row');
  const liTableRowResult = document.querySelectorAll('.table-row-result');
  const { ulFirstTable, ulResultTable, ulArchiveTable } = tableElements;
  const { target } = e;
  const { notes, archiveNotes } = state;
  const currentId = Number(target.dataset.id);
  const currentNote = notes.filter(({ id }) => id === currentId)[0];
  const newNotes = removeNote(notes, currentId);
  state.notes = newNotes;
  currentNote.archive = true;
  currentNote.active = false;
  archiveNotes.push(currentNote);
  state.categories[currentNote.category].active = countActiveNotes(newNotes, currentNote.category);
  state.categories[currentNote.category].archive = countArchiveNotes(
    archiveNotes,
    currentNote.category,
  );

  removeDomElements(liTableRow, liTableRowResult);
  renderItems(newNotes, ulFirstTable);
  renderSumTableItems(state, ulResultTable);
  renderArchivedNotes(state, ulArchiveTable);

  const elementsAfterRerender = {
    remove: document.querySelectorAll('[data-type=basket]'),
    archive: document.querySelectorAll('[data-type=archive]'),
    edit: document.querySelectorAll('[data-type=edit]'),
    unarchive: document.querySelectorAll('[data-type=unarchive]'),
  };
  const keys = Object.keys(elementsAfterRerender);
  keys.map((key) => {
    console.log(handlers[key]);
    return elementsAfterRerender[key].forEach((element) =>
      element.addEventListener('click', handlers[key](handlers, state)),
    );
  });
};

const remove = (handlers, state) => (e) => {
  const li = document.querySelectorAll('.table-row');
  const liTableRowResult = document.querySelectorAll('.table-row-result');
  const { ulFirstTable, ulResultTable, ulArchiveTable } = tableElements;
  const { target } = e;
  const { notes, archiveNotes } = state;
  const currentId = Number(target.dataset.id);
  const currentNote = notes.filter(({ id }) => id === currentId)[0];
  const newNotes = removeNote(notes, currentId);
  state.notes = newNotes;
  state.categories[currentNote.category].active = countActiveNotes(newNotes, currentNote.category);
  state.categories[currentNote.category].archive = countArchiveNotes(archiveNotes, currentNote);

  removeDomElements(li, liTableRowResult);
  renderItems(newNotes, ulFirstTable);
  renderSumTableItems(state, ulResultTable);
  renderArchivedNotes(state, ulArchiveTable);

  const elementsAfterRerender = {
    remove: document.querySelectorAll('[data-type=basket]'),
    archive: document.querySelectorAll('[data-type=archive]'),
    edit: document.querySelectorAll('[data-type=edit]'),
    unarchive: document.querySelectorAll('[data-type=unarchive]'),
  };
  const keys = Object.keys(elementsAfterRerender);
  keys.map((key) => {
    console.log(handlers[key]);
    return elementsAfterRerender[key].forEach((element) =>
      element.addEventListener('click', handlers[key](handlers, state)),
    );
  });
};

export { archive, remove, submit, click, edit, unarchive };
