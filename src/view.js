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

const renderSumTableItems = (state, element) => {
  const { categories, categoriesType } = state;
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

const renderForm = () => {
  // <form action="/action_page.php">
  //   <label for="fname">First name:</label><br>
  //   <input type="text" id="fname" name="fname" value="John"><br>
  //   <label for="lname">Last name:</label><br>
  //   <input type="text" id="lname" name="lname" value="Doe"><br><br>
  //   <input type="submit" value="Submit">
  //   <input type="reset">
  // </form>
  const divContainer = document.querySelector('.container');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const inputCategory = document.createElement('input');
  const inputDates = document.createElement('input');
  const labelName = document.createElement('label');
  const labelCategory = document.createElement('label');
  const labelDates = document.createElement('label');
  const inputSubmit = document.createElement('input');
  inputName.setAttribute('type', 'text');
  inputCategory.setAttribute('type', 'text');
  inputDates.setAttribute('type', 'text');
  inputSubmit.setAttribute('type', 'submit');
  labelName.textContent = 'Name';
  labelCategory.textContent = 'Category';
  labelDates.textContent = 'Dates';
  form.append(inputName);
  form.append(labelName);
  form.append(inputCategory);
  form.append(labelCategory);
  form.append(inputDates);
  form.append(labelDates);
  form.append(inputSubmit);
  divContainer.append(form);
};

export { renderItems, renderSumTableItems, renderForm };
