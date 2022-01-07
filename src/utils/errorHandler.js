module.exports = errorHandler;

function errorHandler(err, req, res, next) {

    if (err.name === 'ValidationError') {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }

    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
}