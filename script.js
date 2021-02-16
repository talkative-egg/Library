let myLibrary = [];
const addButton = document.querySelector("#add");
const closeButton = document.querySelector(".cancel");
const container = document.querySelector("#book-container");
const myForm = document.querySelector(".form-container");
let bookIndex = 0;

addButton.addEventListener("click", openForm);
closeButton.addEventListener("click", closeForm);
myForm.addEventListener("submit", results);

function results(e){
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let isRead = (document.querySelector("#isRead").checked)? "yes":"no";
    myLibrary.push(new Book(title, author, pages, isRead));
    displayBooks();
    e.preventDefault();
    closeForm();
    myForm.reset();
}

function openForm(){
    document.querySelector(".form-popup").style.display = "block";
}

function closeForm(){
    document.querySelector(".form-popup").style.display = "none";
}

//addButton.addEventListener("click", addBookToLibrary);

function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages + " pages";
    this.isRead = isRead;
}

Book.prototype.delete = function(){
    delete this;
    displayBooks();
}

/*function addBookToLibrary(){
    let title = prompt("Title?");
    let author = prompt("Author?");
    let pages = prompt("How many pages?");
    let isRead = prompt("Have you read it? yes/no");
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    displayBooks();
}*/

function addBookDiv(book){
    bookIndex++;
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book");
    bookContainer.setAttribute("data-index", `index${bookIndex}`);
    const title = addBookChild(book, "title");
    const author = addBookChild(book, "author");
    const pages = addBookChild(book, "pages");
    const isRead = addReadButton(book);
    const deleteButton = addDeleteButton(book);
    isRead.addEventListener("click", function(){
        isRead.textContent = (isRead.textContent === "Read")? "Not read":"Read";
    });
    deleteButton.addEventListener("click", function(){
        const dataIndex = deleteButton.getAttribute("data-index");
        const index = dataIndex[dataIndex.length - 1] - 1;
        const book = document.querySelector(`[data-index="${dataIndex}"]`)
        book.remove();
        myLibrary.splice(index, 1);
    });
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(isRead);
    bookContainer.appendChild(deleteButton);
    container.appendChild(bookContainer);
}

function addBookChild(book, property){
    const div = document.createElement("div");
    div.textContent = book[property];
    div.className = `${property}`;
    return div;
}

function addReadButton(book){
    const button = document.createElement("button");
    button.textContent = (book.isRead === "yes")? "Read":"Not read";
    button.className = "isRead";
    return button;
}

function addDeleteButton(book){
    const button = document.createElement("button");
    button.textContent = "delete";
    button.className = "delete";
    button.setAttribute("data-index", `index${bookIndex}`);
    return button;
}

function displayBooks(){
    removeAllChild(container);
    bookIndex = 0;
    myLibrary.forEach(e => addBookDiv(e));
}

function removeAllChild(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}