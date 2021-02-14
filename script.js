let myLibrary = [];
const addButton = document.querySelector("#add");
const container = document.querySelector("#book-container");

addButton.addEventListener("click", addBookToLibrary);

function Book(title, author, pages, isRead){
    this.title = title;
    this.author = "author: " + author;
    this.pages = pages + " pages";
    this.isRead = "read: " + ((isRead === "yes")? "yes" : "no");
}

function addBookToLibrary(){
    let title = prompt("Title?");
    let author = prompt("Author?");
    let pages = prompt("How many pages?");
    let isRead = prompt("Have you read it? yes/no");
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    displayBooks();
}

function addBookDiv(book){
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book");
    const title = addBookChild(book, "title");
    const author = addBookChild(book, "author");
    const pages = addBookChild(book, "pages");
    const isRead = addBookChild(book, "isRead");
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(isRead);
    container.appendChild(bookContainer);
}

function addBookChild(book, property){
    const div = document.createElement("div");
    div.textContent = book[property];
    div.className = `${property}`;
    return div;
}

function displayBooks(){
    removeAllChild(container);
    myLibrary.forEach(e => addBookDiv(e));
}

function removeAllChild(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}