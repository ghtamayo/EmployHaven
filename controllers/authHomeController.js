const home = (req, res) => {
  res.render('index', {
    title: 'EmployHaven',
    currentUser: req.cookies.currentUser,
  });
};

export default { home };
