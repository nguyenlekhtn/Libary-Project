let myLibrary = [];

const myLibraryFromLocal = localStorage.getItem('myLibrary')

if(myLibraryFromLocal && myLibraryFromLocal.length) {
    setData()
}


const form = document.querySelector('.form-container')
// form.onsubmit = saveToStorage(form)

// form.onsubmit = saveToStorage(form)
form.addEventListener('submit', saveToStorage)


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

function displayLibrary(library) {
    library.forEach(displayBook)
}

function displayBook(book) {
    let row = ""
    const tr = document.createElement("tr")
    const tbody = document.querySelector("#bookShelf")
    row += "<td>" + book.title + "</td>" + "<td>" + book.author + "</td>" + "<td>" + book.pages + "</td>" + "<td>" + book.read + "</td>"
    tr.innerHTML = row;
    tbody.append(tr)
}


function openForm() {
    document.querySelector("#myForm").style.display = "block";
}

function closeForm() {
    document.querySelector("#myForm").style.display = "none";
}




// form.addEventListener('submit', e => {
//     let title = form.elements['Title'].value
//     let author = form.elements['Author'].value
//     let pages = form.elements['Pages'].value
//     let read = form// form.addEventListener('submit', e => {
//     let title = form.elements['Title'].value
//     let author = form.elements['Author'].value
//     let pages = form.elements['Pages'].value
//     let read = form.elements['Read'].value == "on" ? "Read" : "Unread"
//     addBookToLibrary(title, author, pages, read)
//     displayBook(myLibrary[myLibrary.length - 1])
// }).elements['Read'].value == "on" ? "Read" : "Unread"
//     addBookToLibrary(title, author, pages, read)
//     displayBook(myLibrary[myLibrary.length - 1])
// })



function setData() {
    // const myLibraryFromLocal = localStorage.getItem('myLibrary')
    // if (myLibraryFromLocal && )
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));

    displayLibrary(myLibrary);
}

// function populateStorage() {
//     localStorage.setItem('myLibrary', []);
// }

function saveToStorage(e) {
    e.preventDefault();
    const form = e.target
    let title = form.elements['Title'].value
    let author = form.elements['Author'].value
    let pages = form.elements['Pages'].value
    console.log("Checkbox:", form.elements['Read'].value)
    let read = form.elements['Read'].value
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    displayBook(newBook)
    
    form.reset()
}



