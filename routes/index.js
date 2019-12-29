module.exports = {
    getHomePage: (req, res) => {
        console.log(req.session.email);
        res.render('index.ejs', {
            title: '',
            email:req.session.email
        });
    },
};