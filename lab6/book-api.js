const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const retrieve = require('./book.json');

const app = express();
const port = 3000;

//let books = retrieve.books;
let books = [];

app.use(cors());

//configure middle-ware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/book',(req,res) => 
{
    const book = req.body;

    console.log(book)
    books.push(book)

    res.send('book sent')
})

app.get('/books', (req,res)=>
{
    res.json(books);
})

app.post('/book/:isbn', (req, res) => 
{
    const isbn = req.params.isbn;
    const newBook = req.body;

    for (let i = 0; i < books.length; i++) {
        if (books[i].isbn === isbn) {
            books[i] = newBook;
            res.send('Book is edited');
            return;
        }
    }

    res.status(404).send('Book not found');
});


    app.get('/book/:isbn', (req, res) => 
        {
        //find isbn for req
        const isbn = req.params.isbn;
        const book = books.find(b => b.isbn === isbn);
    
        //if we find that book
        if (book) 
        {
            res.json(book);
        } 
        else {
            res.status(404).send('Book not found');
        }
    });


    //Deletion Methid
    app.delete('/book/:isbn', (req, res) => 
    {
        const isbn = req.params.isbn;
    
        for (let i = 0; i < books.length; i++) 
        {
            if (books[i].isbn === isbn) 
            {
                //remove from books array
                books.splice(i, 1); 
                res.send('Book is deleted');
                return;
            }
        }
    
        res.status(404).send('Book not found');
    });
    

app.listen(port, () => console.log("Hello world app listening on port"))