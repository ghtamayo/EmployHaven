const home = (req, res) => {
  res.render('index', {
    title: 'EmployHaven',
  });
};

// const home = (req, res) => {
//   let users = [
//     { description: 'jajaja', prueba: 'real' },
//     { description: 'jojojo', prueba: 'crack' },
//   ];
//   res.render('ejemplo', { users });
// };

export default { home };
