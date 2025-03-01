import express, {request, response} from 'express';
import cors from 'cors';
import mysql from 'mysql2'; 
import bodyParser from 'body-parser';
import 'dotenv/config';

//const db = mysql.createConnection();

// set up the actual express  application
const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// select the port for your application
//just use 3000 please
const port = process.env.PORT;
app.use(cors({ origin: 'http://localhost:5173' }));


console.log(process.env.SERVERHOST);

//setting up necessary information for the MySQL server connection
const db = mysql.createConnection ({
    host: process.env.SERVERHOST,
    user: process.env.SQL_USERNAME, //MySql username (no + no)
    port: process.env.SQL_PORT,     //Replace with your port number (if not 3306) but 3306 is the default port
    password: process.env.PASSWORD, //MySql password
    database: process.env.DATABASE //MySql database name 
   // ssl: { rejectUnauthorized: true } //this ensures an encrypted connection to the database
});

//actually establishes the database connection
db.connect((err) => {
    if (err) {
        console.log('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to database');
});


//set up a test route
//req is short for request
//res is short for response
//this is a simple route that sends a response back to the user
app.get('/', (req, res) => {
    res.send("Hello World");
});

//GET request to get all tasks from the database
//app.get('/x') - x/ is the URL added to the end of localhost:3000
app.get('/tasks', (req,res) => {
    //write the querey
    const query = "SELECT * FROM tasks; ";
    //make query run
    db.query(query, (err, results) => {
        //handle the query passing in the parameters from the body
        if(err) {
            console.log(`whoops! could not get tasks, error mesage is ' ${err}'`);
            res.status(500).json({error: 'Error retrieving tasks.'});
        } 
        else {
            console.log(results[0]);
            res.json(results);
                                                 
        }
    })
});


app.post('/tasks/add', (req, res) => {
    const params = [req.body['title'], req.body['description'], req.body['is_completed']];

    const query = "INSERT INTO tasks (title, description, is_completed) VALUES (?, ?, ?);";

    db.query(query, params, (err, results) => {
        if(err) {
            console.log(`whoops! could not add task, error mesage is ' ${err}'`);
            res.status(500).json({error: 'Error adding task.'});
        } 
        else {
            console.log(results[0]);
            res.json({ message: "Task added successfully.", id: results.insertId })
        }
    });
});

app.put('/tasks/fullUpdate/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, description, is_completed } = req.body;
    const params = [title, description, is_completed, taskId];

    const query = "UPDATE tasks SET title = ?, description = ?, is_completed = ? WHERE id = ?;";

    db.query(query, params, (err, results) => {
        if(err) {
            console.log(`whoops! could not update task, error mesage is ' ${err}'`);
            res.status(500).json({error: 'Error updating task.'});
        } 
        else {
            console.log(results[0]);
            res.json(results);
        }
    });
});

app.delete('/tasks/delete/:id', (req, res) => {
    const taskId = req.params.id;
    const query = "DELETE FROM tasks WHERE id = ?;";

    db.query(query, taskId, (err, results) => {
        if(err) {
            console.log(`whoops! could not delete task, error mesage is ' ${err}'`);
            res.status(500).json({error: 'Error deleting task.'});

        } else if (results.affectedRows === 0) {
            res.status(404).json({ error: "Task not found." });

        } else {
            console.log(results[0]);
            res.json(results);
        }
    });
});

//this is a catch all route
//if the user tries to access a route that does not exist

// app.all('*', (req, res) => {
//     res.status(404).send('Page not found');
// });

app.patch ('/tasks/partUpdate/:id', (req, res) => {
    const taskId = req.params.id;
    const { is_completed } = req.body;
    const params = [is_completed, taskId];

    const query = "UPDATE tasks SET is_completed = ? WHERE id = ?;";

    db.query(query, params, (err, results) => {
        if(err) {
            console.log(`whoops! could not update task, error mesage is ' ${err}'`);
            res.status(500).json({error: 'Error updating task.'});
        } 
        else {
            console.log(results[0]);
            res.json(results);
        }
    });
});








//actually start the Express server 
//this has to be at the end of the file
app.listen(port, () => {
    console.log('Server is running on port ' + port);
    console.log('Press Ctrl+C to quit.');
});
