errorHandler =  (err, req, res, next) => {
    // res.status(500)
    res.send(err);
}

module.exports = errorHandler;