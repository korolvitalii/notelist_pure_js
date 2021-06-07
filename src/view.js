const renderItems = (items) => {
  const tableElements = {
    ul: document.querySelector('.responsive-table'),
  };
  items.map((item) => {
    const {
      name, created, category, content, dates, icons,
    } = item;
    console.log(dates[0].currentDate);
    const li = document.createElement('li');
    const divCol1 = document.createElement('div');
    const divCol2 = document.createElement('div');
    const divCol3 = document.createElement('div');
    const divCol4 = document.createElement('div');
    const divCol5 = document.createElement('div');
    const divCol6 = document.createElement('div');
    const i = document.createElement('i');
    li.classList.add('table-row');
    divCol1.classList.add('col', 'col-1');
    divCol2.classList.add('col', 'col-2');
    divCol3.classList.add('col', 'col-3');
    divCol4.classList.add('col', 'col-4');
    divCol5.classList.add('col', 'col-5');
    divCol6.classList.add('col', 'col-6');
    i.classList.add('fas', 'fa-cat');
    divCol1.setAttribute('data-label', 'Name');
    divCol2.setAttribute('data-label', 'Created');
    divCol3.setAttribute('data-label', 'Category');
    divCol4.setAttribute('data-label', 'Content');
    divCol5.setAttribute('data-label', 'Dates');
    divCol6.setAttribute('data-label', 'Icon');
    divCol1.textContent = name;
    divCol2.textContent = created;
    divCol3.textContent = category;
    divCol4.textContent = content;
    divCol5.textContent = `${dates[0].currentDate} ${dates[0].changedDate}`;
    // divCol6.textContent = icons;
    divCol6.append(i);
    li.append(divCol1);
    li.append(divCol2);
    li.append(divCol3);
    li.append(divCol4);
    li.append(divCol5);
    li.append(divCol6);
    tableElements.ul.append(li);
  });
};

export default renderItems;
