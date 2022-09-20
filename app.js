const title = document.querySelector('#title');
const author = document.querySelector('#author');
const bookForm = document.querySelector('#book-form');
const displayBook = document.querySelector('.display-book');
let bookData;
let bookStore = JSON.parse(localStorage.getItem('localBook')) || [];
function addBook() {
  bookData = {
    title: title.value,
    author: author.value,
    id: Math.floor(Math.random() * 1000000),
  };
  bookStore.push(bookData);
  localStorage.setItem('localBook', JSON.stringify(bookStore));
}

function removeBook(id) {
  bookStore = bookStore.filter((books) => books.id !== id);
  localStorage.setItem('localBook', JSON.stringify(bookStore));
}

function renderBook(bookData) {
  const div = document.createElement('div');
  const bookTitle = document.createElement('p');
  const bookAuthor = document.createElement('p');
  const removeBtn = document.createElement('button');
  bookTitle.innerText = bookData.title;
  bookAuthor.innerText = bookData.author;
  removeBtn.innerText = 'Remove';

  div.append(bookTitle, bookAuthor, removeBtn);
  displayBook.append(div);
  removeBtn.addEventListener('click', () => {
    removeBtn.parentElement.remove();
    removeBook(bookData.id);
  });
}

bookStore.forEach(renderBook);

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (title.value !== '' && author.value !== '') {
    addBook();
    renderBook(bookData);
    bookForm.reset();
  } else {
    // eslint-disable-next-line no-alert
    alert('Please fill in the fields');
  }
});
