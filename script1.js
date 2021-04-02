let myLibrary = [];

const inputs = document.querySelectorAll('input[type="text"]')

inputs.forEach(input => {
    input.addEventListener('keyup', e => {
        validate(e.target, patterns[e.target.attributes.name.value])
    })
});

function validate(field, regex) {
    if(regex.test(field.value)) {
        field.className = "valid"
    }
    else {
        field.className = "invalid"
    }

}

const patterns = {
    Pages: /^[\d]+$/,
    Author: /^[a-z\.]+$/i,
    Title: /^.{1,30}$/

};

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
    document.querySelector("#bookShelf").innerHTML = ""
    library.forEach(displayBook)
    
}

function displayBook(book, index) {
    let row = ""
    const tr = document.createElement("tr")
    const tbody = document.querySelector("#bookShelf")
    const status = book.read == "Read" ? 'Read' : ""
    row += "<td>" + index + "</td>" + "<td>" + book.title + "</td>" + "<td>" + book.author + "</td>" + "<td>" + book.pages + "</td>"
    row += `<td class="status-cell">` + `<button type="button" class="status ${status}" dataId="${index}" onclick="changeStatus(${index})"></button>` + "</td>"
    row += `<td class="button-cell"><input type="button" value="x" dataId="${index}" class="remove" onclick="remove(${index})"></td>`
    tr.innerHTML = row;
    tr.setAttribute("dataid", `${index}`)
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
    const inputsArr = [...inputs]
    const checker = inputsArr.reduce( (accumulator, currentValue) => accumulator || currentValue.classList.contains('invalid'), false);
    console.log(checker);
    if(!checker)  {
        const form = e.target
        let title = form.elements['Title'].value
        let author = form.elements['Author'].value
        let pages = form.elements['Pages'].value
        // console.log("Checkbox:", form.elements['Read'].value)
        let read = form.elements['Read'].checked ? "Read" : "Unread"
        const newBook = new Book(title, author, pages, read)
        myLibrary.push(newBook)
        update()    
        form.reset()
        inputs.forEach(input =>
            input.classList.remove('valid', 'invalid')

        )
    }
}

function update() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    displayLibrary(myLibrary)
}

// const removeBtns = document.querySelectorAll(`input.remove`)
// console.log(removeBtns)
// removeBtns.forEach(btn => {
//     btn.addEventListener('click', e => {
//         console.log("parrot")
//         // console.log(e.target.attributes.dataid.value)
//         const tbody = document.querySelector("#bookShelf")
//         const removedChild =  tbody.querySelector(`tr[dataId="${e.target.attributes.dataid.value}"]`)
//         tbody.removeChild(removedChild)
//         myLibrary.splice(e.target.attributes.dataid.value, 1)
//         localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
//         displayLibrary(myLibrary)
//     })
// })

function remove(index) {
    console.log("parror")
    const tbody = document.querySelector("#bookShelf")
    const removedChild =  tbody.querySelector(`tr[dataId="${index}"]`)
    tbody.removeChild(removedChild)
    myLibrary.splice(index, 1)
    update()
}

function changeStatus(index) {
    const target =  document.querySelector(`button[dataId="${index}"]`)
    target.classList.toggle("Read")
    myLibrary[index].read = (myLibrary[index].read == "Read") ? "Unread" : "Read"
    update()


}