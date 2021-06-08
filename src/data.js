export default () => {
  const items = [
    {
      name: 'Shopping List', created: 'April 20, 2021', category: 'Task', content: 'Tomatoes, bread', dates: [{ currentDate: '', changedDate: '' }], active: true,
    },
    {
      name: 'The theory of evolution', created: 'April 27, 2021', category: 'Random Thougth', content: 'The evolution', dates: [{ currentDate: '', changedDate: '' }], active: true,
    },
    {
      name: 'New Feature', created: 'May 05, 2021', category: 'Idea', content: 'Implement new..', dates: [{ currentDate: '3/5/2021', changedDate: '5/5/2021' }], active: true,
    },
    {
      name: 'William Gaddis', created: 'May 07, 2021', category: 'Quote', content: 'Power doesnt.. ', dates: [{ currentDate: '', changedDate: '' }], active: false,
    },
    {
      name: 'Books', created: 'May 15, 2021', category: 'Task', content: 'The learn startup', dates: [{ currentDate: '', changedDate: '' }], active: true,
    },
    {
      name: 'Notes', created: 'April 20, 2021', category: 'Task', content: 'Wrire poem', dates: [{ currentDate: '', changedDate: '' }], active: false,
    },
    {
      name: 'Film', created: 'April 22, 2021', category: 'Task', content: 'Maxtrix, 1+1...', dates: [{ currentDate: '', changedDate: '' }], active: false,
    },
  ];
  return items;
};
