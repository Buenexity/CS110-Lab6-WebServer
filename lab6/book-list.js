async function loadBooks() 
{
    let response = await fetch("http://localhost:3000/books");
    console.log(response.status); // 200 
    console.log(response.statusText); // OK

    if (response.status === 200) 
        {
        let data = await response.text();
        console.log(data);
        const books = JSON.parse(data);

        for (let book of books) {
            // added wrapper to remove books isbn
            const x = `
            <div id="book-${book.isbn}" class="col-4"> <!-- Add id="${book.isbn}" -->
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>
                        <div>Author: ${book.author}</div>
                        <div>Publisher: ${book.publisher}</div>
                        <div>Number Of Pages: ${book.numOfPages}</div>
                        <hr>
                        <button type="button" class="btn btn-danger" onclick="Delete('${book.isbn}')">Delete</button> <!-- Pass ISBN to Delete function -->
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editBookModal" onClick="setEditModal('${book.isbn}')">
                            Edit
                        </button>
                    </div>
                </div>
            </div>`;
        
            document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
        }
    }
}





loadBooks();




async function setEditModal(isbn) 
{
    let response = await fetch(`http://localhost:3000/book/${isbn}`);
    console.log(response.status); // 200 
    console.log(response.statusText); // OK

    if (response.status === 200) {
        let book = await response.json(); // Parse JSON
        console.log(book);

        const { title, author, publisher, publish_date, numOfPages } = book;

        document.getElementById('isbn').value = isbn;
        document.getElementById('title').value = title;
        document.getElementById('author').value = author;
        document.getElementById('publisher').value = publisher;
        document.getElementById('publish_date').value = publish_date;
        document.getElementById('numOfPages').value = numOfPages;

        // setting up the action url for the book
        document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;
    }
}

setEditModal();


async function Delete(isbn) 
{
    //deletion method
    try {
        let response = await fetch(`http://localhost:3000/book/${isbn}`, {
            method: 'DELETE'
        });


        if (response.status === 200) 
        {
            console.log("Book was deleted");
            // Remove HTML elements associated with the book
            const bookElement = document.getElementById(`${isbn}`);
            if (bookElement) 
            {
                bookElement.remove();
            }
        } 
        else 
        {
            console.error("error in deleting book");
        }
    } 
    catch (error) 
    {
        console.error("book deletion error:");
    }
}





