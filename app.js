const bookLists = [];
// function to add a book
function Book(title, author) {
  this.title = title;
  this.author = author;
  bookLists.push({ title, author });
}

function UI() {}

// Add book to page
UI.prototype.addBookToPage = (book) => {
  const list = document.getElementById('add-book');

  // create p elements
  const divEl = document.createElement('div');

  divEl.innerHTML = `
  <p class="title">${book.title}<p>
  <p class="author">${book.author}<p>
  <button class="delete">Remove</button>
  <hr>
  `;
  list.appendChild(divEl);
};

// delete book
UI.prototype.deleteBook = (target) => {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

// clear fields
UI.prototype.clearFields = () => {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
};

// event listener for add book
document.getElementById('book-form').addEventListener('submit', (e) => {
  // get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  // instantiate a book
  const book = new Book(title, author);

  // instantiate UI
  const ui = new UI();

  // validate
  if (title === '' || author === '') {
    alert('Please fill in the fields');
  } else {
    // add book to the page
    ui.addBookToPage(book);

    // clear fields
    ui.clearFields();
  }
  // local storage
  localStorage.setItem('books', JSON.stringify(bookLists));
  e.preventDefault();
});

//  event listner for delete
document.getElementById('add-book').addEventListener('click', (e) => {
  // instantiate UI
  const ui = new UI();
  ui.deleteBook(e.target);
  e.preventDefault();
});
