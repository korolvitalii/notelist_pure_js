const renderItems = (items, element) => {
  items.forEach((item) => {
    const { name, created, category, content, dates, id } = item;
    const li = document.createElement('li');
    const divCol1 = document.createElement('div');
    const divCol2 = document.createElement('div');
    const divCol3 = document.createElement('div');
    const divCol4 = document.createElement('div');
    const divCol5 = document.createElement('div');
    const divCol6 = document.createElement('div');
    const iArchive = document.createElement('i');
    const iBasket = document.createElement('i');
    const iEdit = document.createElement('i');
    li.classList.add('table-row');
    divCol1.classList.add('col', 'col-1');
    divCol2.classList.add('col', 'col-2');
    divCol3.classList.add('col', 'col-3');
    divCol4.classList.add('col', 'col-4');
    divCol5.classList.add('col', 'col-5');
    divCol6.classList.add('col', 'col-6');
    iArchive.classList.add('large', 'material-icons');
    iArchive.setAttribute('data-id', id);
    iArchive.setAttribute('data-type', 'archive');
    iBasket.classList.add('large', 'material-icons');
    iBasket.setAttribute('data-id', id);
    iBasket.setAttribute('data-type', 'basket');
    iEdit.classList.add('large', 'material-icons');
    iEdit.setAttribute('data-id', id);
    iEdit.setAttribute('data-type', 'edit');
    divCol1.setAttribute('data-label', 'Name');
    divCol2.setAttribute('data-label', 'Created');
    divCol3.setAttribute('data-label', 'Category');
    divCol4.setAttribute('data-label', 'Content');
    divCol5.setAttribute('data-label', 'Dates');
    divCol6.setAttribute('data-label', 'Icon');
    iArchive.textContent = 'archive';
    iBasket.textContent = 'delete';
    iEdit.textContent = 'edit';
    divCol1.textContent = name;
    divCol2.textContent = created;
    divCol3.textContent = category;
    divCol4.textContent = content;
    divCol5.textContent = dates;
    divCol6.append(iEdit);
    divCol6.append(iArchive);
    divCol6.append(iBasket);
    li.append(divCol1);
    li.append(divCol2);
    li.append(divCol3);
    li.append(divCol4);
    li.append(divCol5);
    li.append(divCol6);
    element.append(li);
  });
};

const renderSumTableItems = (state, element) => {
  const { categories, categoriesType } = state;
  const sumTableHTML = categoriesType.reduce((acc, category) => {
    acc += `<li class="table-row-result">
              <div class="col col-1">${category}</div>
              <div class="col col-2">${categories[category].active}</div>
              <div class="col col-3">${categories[category].archive}</div>
            </li>`;
    return acc;
  }, '');
  element.innerHTML = sumTableHTML;
};

const renderArchivedNotes = (state, element) => {
  const { archiveNotes } = state;
  archiveNotes.forEach(({ name, id }) => {
    const li = document.createElement('li');
    const divCol1 = document.createElement('div');
    const divCol2 = document.createElement('div');
    const divCol3 = document.createElement('div');
    const iUnarchive = document.createElement('i');
    iUnarchive.classList.add('large', 'material-icons');
    iUnarchive.setAttribute('data-id', id);
    iUnarchive.setAttribute('data-type', 'unarchive');
    iUnarchive.textContent = 'cancel';
    li.classList.add('table-row-result');
    divCol1.classList.add('col', 'col-1');
    divCol2.classList.add('col', 'col-2');
    divCol3.classList.add('col', 'col-3');
    divCol1.textContent = name;
    divCol3.append(iUnarchive);
    li.append(divCol1);
    li.append(divCol2);
    li.append(divCol3);
    element.append(li);
  });
};

const renderForm = (editElement) => {
  const divContainer = document.querySelector('.buttonForForm');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const inputCategory = document.createElement('input');
  const inputContent = document.createElement('input');
  const inputDates = document.createElement('input');
  const labelName = document.createElement('label');
  const labelCategory = document.createElement('label');
  const labelContent = document.createElement('label');
  const labelDates = document.createElement('label');
  const inputSubmit = document.createElement('input');
  inputName.setAttribute('type', 'text');
  inputName.setAttribute('name', 'name');
  inputName.value = editElement ? editElement.name : '';
  inputContent.setAttribute('type', 'text');
  inputContent.setAttribute('name', 'content');
  inputContent.value = editElement ? editElement.content : '';
  inputCategory.setAttribute('type', 'text');
  inputCategory.setAttribute('name', 'category');
  inputCategory.value = editElement ? editElement.category : '';
  inputDates.setAttribute('type', 'text');
  inputDates.setAttribute('name', 'dates');
  inputDates.value = editElement ? editElement.dates : '';
  inputSubmit.setAttribute('type', 'submit');
  inputSubmit.setAttribute('value', 'Add Note');
  labelName.textContent = 'Name';
  labelCategory.textContent = 'Category';
  labelDates.textContent = 'Dates';
  labelContent.textContent = 'Content';
  form.append(labelName);
  form.append(inputName);
  form.append(labelCategory);
  form.append(inputCategory);
  form.append(labelDates);
  form.append(inputDates);
  form.append(labelContent);
  form.append(inputContent);
  form.append(inputSubmit);
  divContainer.append(form);
};

export { renderItems, renderSumTableItems, renderForm, renderArchivedNotes };
