const express = require('express');
const middleware = require('./middleware');
const ExpressError = require('./expressError')
const routes = require('./routes')
const app = express();

app.use(express.json());
app.use(middleware.logger)
app.use("/items", routes)

app.use((req, res, next) => {
    const e = new ExpressError("page not found", 404)
    next(e)
})

//error handling
app.use(function(err, req, res, next) {
    ///500 for internal server error
        let status = err.status || 500;
        let message = err.message;
    
        //set status and alert user
        return res.status(status).json({
            error : {message, status}
        });
    });

module.exports = app;