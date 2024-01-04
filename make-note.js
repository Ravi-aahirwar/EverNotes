let searchNote = document.getElementById('search-note');
let titleNote = document.getElementById('title-notes'); // this is title 
let typeNotes = document.getElementById('Type-notes'); // type here
let makeNote = document.querySelector('.make-notes'); // notes parent container
let addNotes = document.getElementById('add-notes'); // add button
let bgTheme = document.querySelector('#theme-changer');
let navBar = document.querySelector('.header');
let bgButton = document.querySelector('.add-button');
let inputContainer = document.querySelector('.input-container');

titleNote.addEventListener('click', () => {
    typeNotes.style.display = 'block'
    addNotes.style.display = 'block'
});
let notesData;
function addTheNotes() {
    typeNotes.style.display = 'none'
    addNotes.style.display = 'none'
    notesData = [];

    let noteObj = {
        Title: titleNote.value,
        Text: typeNotes.value
    };
    notesData.push(noteObj);

    let creatDiv = createNotesItem(notesData);
    makeNote.appendChild(creatDiv);

    localStorage.setItem('userNotes', JSON.stringify(notesData));

    titleNote.value = '';
    typeNotes.value = '';
};
// let textInput;
function createNotesItem(notesData) {
   let creatDiv = document.createElement('div');
    creatDiv.className = 'notes-div'

    let date = new Date();
    let currDate = date.toLocaleDateString();

    let creatTime = document.createElement('p');
    creatTime.innerText = `created ${currDate}`;

    let titleInput = document.createElement('textarea');
    titleInput.className = 'designNoteInput'
    titleInput.placeholder = 'Title'
    titleInput.type = 'text'
    titleInput.value = notesData[0].Title;
    titleInput.disabled = 'true'

    let textInput = document.createElement('textarea');
    textInput.className = 'designNoteInput'
    textInput.placeholder = 'This is Body...'
    textInput.type = 'text'
    textInput.value = notesData[0].Text;
    textInput.disabled = 'true'

    let editOrDelete = document.createElement('div');
    editOrDelete.className = 'notes-tools'

    let editButton = document.createElement('button');
    editButton.innerText = 'Edit'
    editButton.className = 'edit-note'

    let deleteButton = document.createElement('button');
    deleteButton.className = 'delete-note'
    deleteButton.innerText = 'delete'

    let colorOption = ['#fde047', '#fecaca', 'rgb(230, 59, 59)', '#99f6e4', ' #67e8f9', 'pink', '#e2e8f0', 'orange'];
    let ul = document.createElement('ul');
    ul.className = 'color-options'
    colorOption.forEach(function (colors) {
        let li = document.createElement('li');
        li.style.backgroundColor = colors;
        li.onclick = function () {
            creatDiv.style.backgroundColor = colors;
            console.log(`this is div ${creatDiv} or ye hai ${colors}`);
            titleInput.style.backgroundColor = colors
            textInput.style.background = colors;
            ul.style.background = colors;
        }
        ul.appendChild(li);

    });

    creatDiv.appendChild(creatTime);
    creatDiv.appendChild(titleInput);
    creatDiv.appendChild(textInput);
    creatDiv.appendChild(editOrDelete);
    editOrDelete.appendChild(editButton);
    editOrDelete.appendChild(ul);
    editOrDelete.appendChild(deleteButton);

    editButton.addEventListener('click', () => {
        titleInput.disabled = !titleInput.disabled, textInput.disabled = !textInput.disabled;
        if (titleInput.disabled && textInput.disabled) {
            editButton.innerText = 'Edit'
        }
        else {
          editButton.innerText = 'Save' 
        }
    });
    deleteButton.addEventListener('click', () => {
        creatDiv.remove();

    });
    return creatDiv;
};

function searchNoteFunction() {
    let inputVal = searchNote.value;
    let noteCards = document.getElementsByClassName("notes-div");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('textarea')[1].value.toLowerCase();
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    });
};


function changeColor(color) {
    document.querySelector(".notes-div").style.backgroundColor = color;
}
bgTheme.addEventListener('click', () => {
    bgButton.style.backgroundColor = 'white'
    let element = document.body
    element.classList.toggle('dark-mode');
});
searchNote.addEventListener('input', searchNoteFunction)

addNotes.addEventListener('click', addTheNotes);
