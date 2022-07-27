const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return [this.title, this.author, this.pages];
  }

  toggleRead() {
    this.read = this.read ? false : true;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

function createDeleteButton(index) {
  const button = document.createElement('button');
  button.classList.add(index);
  button.classList.add('btn');
  button.textContent = '❌';
  button.type = 'button';

  button.addEventListener('mouseup', (event) => {
    removeBookFromLibrary(event.target.classList[0]);
    // eslint-disable-next-line no-use-before-define
    displayLibraryBooks();
  });

  return button;
}

function createReadButton(index) {
  const button = document.createElement('button');
  const book = myLibrary[index];
  button.classList.add(index);
  button.classList.add('btn');
  button.type = 'button';

  if (book.read === true) {
    button.textContent = '✅';
  }
  if (book.read === false) {
    button.textContent = '❎';
  }

  button.addEventListener('mouseup', (event) => {
    myLibrary[event.target.classList[0]].toggleRead();
    // eslint-disable-next-line no-use-before-define
    displayLibraryBooks();
  });

  return button;
}

function displayLibraryBooks() {
  const table = document.getElementById('myLibraryTable');
  table.textContent = '';

  myLibrary.forEach((book, index) => {
    const row = table.insertRow();
    let cell = row.insertCell();
    let button = createDeleteButton(index);
    cell.appendChild(button);

    book.info().forEach((info) => {
      cell = row.insertCell();
      cell.innerText = info;
    });

    cell = row.insertCell();
    button = createReadButton(index);
    cell.appendChild(button);
  });
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('All Dogs Have ADHD', 'Kathy Hoopman', 72, true);
addBookToLibrary(
  'The Principles of Object-Oriented JavaScript',
  'Nicholas C. Zakas',
  120,
  true
);

displayLibraryBooks();

function getFormInfo() {
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const pages = document.getElementById('book-pages').value;
  const read = document.getElementById('book-read').checked;

  return [title, author, pages, read];
}

const addBook = document.getElementById('add-book');
addBook.addEventListener('mouseup', () => {
  const form = document.querySelector('form');
  const bookInfo = getFormInfo();
  addBookToLibrary(...bookInfo);
  form.reset();
  displayLibraryBooks();
});
