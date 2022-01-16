// Handle 404 errors
const error404 = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};

// Handle errors
const error = (err, req, res, next) => {
    if (!err.status) {
        console.log(err);
        err = new Error('500:Server error');
        err.status = 500;
    }
    res.status(err.status).json({ status:err.status, message:err.message });
};

module.exports = { error404, error };