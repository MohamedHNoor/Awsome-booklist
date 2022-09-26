// import { DateTime } from './node_modules/luxon/src/luxon.js';

import { DateTime } from 'luxon';

const collectionSection = document.querySelector('#book-collection');

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  static showBook() {
    const books = Book.getStoredBooks();

    books.forEach((book) => Book.addBookToList(book));
  }

  static addBookToList(book) {
    const newBook = document.createElement('article');
    newBook.className = 'new_book';
    newBook.innerHTML = `
      <p class="paragraph">${book.title} by ${book.author}</p>
      <button id=${book.id} class='remove_button'>Remove</button>
      `;
    collectionSection.append(newBook);
  }

  static removeBook(bk) {
    if (bk.classList.contains('remove_button')) {
      bk.parentElement.remove();
    }
  }

  static clearValues() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }

  static getStoredBooks() {
    let books;
    if (localStorage.getItem('localBook') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('localBook'));
    }
    return books;
  }

  static addBookToLocalStorage(book) {
    const books = Book.getStoredBooks();

    books.push(book);
    localStorage.setItem('localBook', JSON.stringify(books));
  }

  static removeBookFromLocalStorage(id) {
    const books = Book.getStoredBooks();

    const newBook = books.filter((book) => book.id !== +id);

    localStorage.setItem('localBook', JSON.stringify(newBook));
  }
}

document.addEventListener('DOMContentLoaded', Book.showBook);

document.querySelector('#addBtn').addEventListener('click', () => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const id = Math.floor(Math.random() * 10000000);

  // if (title === '' || author === '') {
  //   return;
  // }

  const book = new Book(title, author, id);

  Book.addBookToList(book);

  Book.addBookToLocalStorage(book);

  Book.clearValues();
});

collectionSection.addEventListener('click', (e) => {
  Book.removeBook(e.target);

  Book.removeBookFromLocalStorage(e.target.id);
});

/* Navigation  */
const listSection = document.querySelector('.display-book-section');
const formSection = document.querySelector('.form-section');
const contactSection = document.querySelector('.contact-section');
const navList = document.querySelector('.list');
const navForm = document.querySelector('.form');
const navContact = document.querySelector('.contact');

const openBooksList = () => {
  navList.classList.add('active');
  navForm.classList.remove('active');
  navContact.classList.remove('active');
  listSection.classList.remove('hidden');
  formSection.classList.add('hidden');
  contactSection.classList.add('hidden');
};
const openAddBook = () => {
  navList.classList.remove('active');
  navForm.classList.add('active');
  navContact.classList.remove('active');
  listSection.classList.add('hidden');
  formSection.classList.remove('hidden');
  contactSection.classList.add('hidden');
};
const openContact = () => {
  navList.classList.remove('active');
  navForm.classList.remove('active');
  listSection.classList.add('hidden');
  formSection.classList.add('hidden');
  contactSection.classList.remove('hidden');
};

navList.addEventListener('click', openBooksList);

navForm.addEventListener('click', openAddBook);

navContact.addEventListener('click', openContact);

// Date
const dateEl = document.querySelector('.date');
const date = DateTime.now();
dateEl.innerHTML = date.toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS);
