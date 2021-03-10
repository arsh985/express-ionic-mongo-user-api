// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const dbConfig = require('./database/db');

// const api = require('./routes/auth.routes');
// const { populate } = require('./models/User');

// mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Database connected')
// },
//     error => {
//         console.log("Database can't be connected: " + error)
//     }
// )

// mongoose.set('useCreateIndex', true);

// const app = express();

// app.use(bodyParser.json);
// app.use(bodyParser.urlencoded({extended : false}));

// app.use(cors());

// app.use('/public' , express.static('public'));

// app.use('/api', api);

// const port = process.env.PORT || 3000;
// const server = app.listen(port, () => {
//     console.log('Connected to port ' + port)
// });

// app.use((req, res ,next) => {
//     setImmediate(() => {
//         next(new Error('Something Went Wrong, Try After Sometime'))
//     })
// });

// app.use(function(err, req, res , next) {
//     console.error(err.message);
//     if (!err.statusCode) err.statusCode = 500;
//     res.status(err.statusCode).send(err.message);

// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');

// Express APIs
const api = require('./routes/auth.routes');

// MongoDB conection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected')
},
    error => {
        console.log("Database can't be connected: " + error)
    }
)

// Remvoe MongoDB warning error
mongoose.set('useCreateIndex', true);


// Express settings
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// Serve static resources
app.use('/public', express.static('public'));

app.use('/api', api)

// Define PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});