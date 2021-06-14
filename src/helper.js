import generateRandomNum from './utils';

const countActiveNotes = (noteList, typeNote) => noteList
  .filter(({ active, category }) => active && typeNote === category).length;

const countArchiveNotes = (noteList, typeNote) => noteList
  .filter(({ category, archive }) => archive && category === typeNote).length;

const getUniqueCategories = (notes) => notes
  .reduce((acc, { category }) => (acc.includes(category) ? acc : [...acc, category]), []);

const removeNote = (notes, currentId) => notes.filter(({ id }) => id !== currentId);

const giveNoteUniqueId = (notes) => notes.reduce((acc, note) => {
  const id = generateRandomNum();
  const newNoteWithId = { ...note, id };
  return [...acc, newNoteWithId];
}, []);

const removeDomElements = (firstEl, secondEl, thirdEl) => {
  firstEl.forEach((selector) => {
    selector.remove();
  });
  secondEl.forEach((selector) => {
    selector.remove();
  });
  if (thirdEl) {
    thirdEl.remove();
  }
};

const generateNewNote = (formData) => {
  const newNote = {
    name: formData.get('name'),
    created: new Date().toISOString().substring(0, 10),
    category: formData.get('category'),
    content: formData.get('content'),
    dates: formData.get('dates'),
    active: true,
    archive: false,
    id: generateRandomNum(),
  };
  return newNote;
};

export {
  countActiveNotes,
  countArchiveNotes,
  getUniqueCategories,
  removeNote,
  giveNoteUniqueId,
  removeDomElements,
  generateNewNote,
};
