module.exports = {
    getHomePage: (req, res) => {
        res.render('index.ejs', {
            title: 'Welcome to Socka | View Players'
        });
    },
};