module.exports = {
    getAboutPage: (req, res) => {
        res.render('about.ejs', {
            title: ''
        });
    },
};