const error404 = (req, res) => {
    res.status(404).render('error', { title: 'Error 404 Not Found', message: 'Page not found' });
};

export default { error404 };