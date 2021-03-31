let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
}

function addBook(book) {
    let row = ""
    const tr = document.createElement("tr")
    const tbody = document.querySelector("#bookShelf")
    row += "<td>" + book.title + "</td>" + "<td>" + book.author + "</td>" + "<td>" + book.pages + "</td>" + "<td>" + book.read + "</td>"
    tr.innerHTML = row;
    tbody.append(tr)
}

function display() {
    myLibrary.forEach(addBook)
}

function openForm() {
    document.querySelector("#myForm").style.display = "block";
}

function closeForm() {
    document.querySelector("#myForm").style.display = "none";
}


addBookToLibrary("The Hobby", "J.R.R. Tolkien", 295, false)

const form = document.querySelector('.form-container')

form.addEventListener('submit', e => {
    let title = form.elements['Title'].value
    let author = form.elements['Author'].value
    let pages = form.elements['Pages'].value
    let read = form.elements['Read'].value
    addBookToLibrary(title, author, pages, read)
    display()
})

