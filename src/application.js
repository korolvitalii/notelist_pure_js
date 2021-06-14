import { renderItems, renderSumTableItems, renderForm } from './view';
import getItems from './data';
import {
  countActiveNotes,
  countArchiveNotes,
  getUniqueCategories,
  giveNoteUniqueId,
} from './helper';
import {
  handleClickArchive,
  handleClickDelete,
  handleButton,
  handleEditButton,
} from './handle';

const app = () => {
  const state = {
    processState: 'table',
    notes: [],
    archiveNotes: [],
    categoriesType: [],
    categories: [],
  };

  const items = getItems();

  const init = () => {
    state.notes = giveNoteUniqueId(items);
    state.categoriesType = getUniqueCategories(items);
    state.categories = getUniqueCategories(items).reduce((acc, note) => ({
      ...acc,
      [note]: {
        active: countActiveNotes(state.notes, note),
        archive: countArchiveNotes(state.archiveNotes, note),
      },
    }), {});
  };
  init();

  const tableElements = {
    ulFirstTable: document.querySelector('.responsive-table'),
    ulResultTable: document.querySelector('.responsive-table-result'),
    allIconBasketElements: document.querySelectorAll('[data-type=basket]'),
    allIconArchiveElements: document.querySelectorAll('[data-type=archive]'),
    button: document.querySelector('.button'),
  };

  switch (state.processState) {
    case 'table':
      renderItems(state.notes, tableElements.ulFirstTable);
      renderSumTableItems(state, tableElements.ulResultTable);
      break;
    case 'tableWithForm':
      renderItems(state.notes, tableElements.ulFirstTable);
      renderSumTableItems(state, tableElements.ulResultTable);
      renderForm();
      break;
    default:
      break;
  }
  console.log(state);
  const tableElementsAfterRender = {
    allIconBasketElements: document.querySelectorAll('[data-type=basket]'),
    allIconArchiveElements: document.querySelectorAll('[data-type=archive]'),
    allIconEditElements: document.querySelectorAll('[data-type=edit]'),
    button: document.querySelector('.button'),
  };

  tableElementsAfterRender.allIconBasketElements.forEach((element) => element.addEventListener('click', handleClickDelete(state)));
  tableElementsAfterRender.allIconArchiveElements.forEach((element) => element.addEventListener('click', handleClickArchive(handleClickDelete, state)));
  tableElementsAfterRender.button.addEventListener('click', handleButton(state));
  tableElementsAfterRender.allIconEditElements.forEach((element) => element.addEventListener('click', handleEditButton(handleClickDelete, handleClickArchive, state)));
  return null;
};

export default app;
