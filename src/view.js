const renderItems = (items, element) => {
  items.forEach((item) => {
    const {
      name, created, category, content, dates, id,
    } = item;
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
    divCol5.textContent = `${dates[0].currentDate} ${dates[0].changedDate}`;
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

const renderSumTableItems = (categories, categoriesType, element) => {
  categoriesType.forEach((category) => {
    const li = document.createElement('li');
    const divCol1 = document.createElement('div');
    const divCol2 = document.createElement('div');
    const divCol3 = document.createElement('div');
    li.classList.add('table-row-result');
    divCol1.classList.add('col', 'col-1');
    divCol2.classList.add('col', 'col-2');
    divCol3.classList.add('col', 'col-3');
    divCol1.textContent = category;
    divCol2.textContent = categories[category].active;
    divCol3.textContent = categories[category].archive;
    li.append(divCol1);
    li.append(divCol2);
    li.append(divCol3);
    element.append(li);
  });
};

export { renderItems, renderSumTableItems };
