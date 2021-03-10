const createNoteMenu = document.querySelector(".create-note__menu");
const previewEl = document.querySelector(".preview-note");
const createNoteEl = document.querySelector(".create-note");
const textArea = document.querySelector(".create-note__textarea");
const previewTextArea = document.querySelector(".preview-note__textarea");
const saveNoteBtn = document.querySelector(".create-note__save-button");
const notesSection = document.querySelector(".notes-section");

createNoteMenu.addEventListener("click", function (e) {
  e.preventDefault();
  const target = e.target;

  if (target.classList.contains("fa-eye")) {
    previewEl.classList.toggle("hidden");
  }

  if (target.classList.contains("fa-times")) {
    createNoteEl.classList.add("hidden");
    previewEl.classList.add("hidden");
  }
});

textArea.addEventListener("change", function (e) {
  e.preventDefault();
  const target = e.target;

  previewTextArea.innerHTML = marked(target.value);
});

saveNoteBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const text = textArea.value;

  setStorage(text);

  textArea.value = "";

  notesSection.innerHTML = "";
  renderNotes();
});

notesSection.addEventListener("click", function (e) {
  e.preventDefault();
  const target = e.target;

  if (target.classList.contains("fa-trash-alt")) {
    const id = parseInt(target.parentNode.parentNode.dataset.id);

    const arrFromLS = localStorage.getItem("notes");
    const arrParsed = JSON.parse(arrFromLS);
    let newArr = arrParsed === null ? [] : arrParsed;

    const arrFiltered = newArr.filter((obj) => obj.id !== id);

    localStorage.setItem("notes", JSON.stringify(arrFiltered));

    renderNotes();
  }
});

const setStorage = function (note) {
  const arrFromLS = localStorage.getItem("notes");
  const arrParsed = JSON.parse(arrFromLS);
  let newArr = arrParsed === null ? [] : arrParsed;

  const obj = {
    id: newArr.length + 1,
    note: note,
  };

  newArr.push(obj);

  localStorage.setItem("notes", JSON.stringify(newArr));
};

const renderNotes = function () {
  const arrFromLS = localStorage.getItem("notes");
  const arrParsed = JSON.parse(arrFromLS);
  let newArr = arrParsed === null ? [] : arrParsed;

  notesSection.innerHTML = "";

  newArr.forEach((el) => {
    const markup = `
      <div class="note-content" data-id="${el.id}">
        <div class="note-content__menu">
          <i class="far fa-trash-alt"></i>
        </div>

        <div class="note-content__text">
          <div class="note-content__textarea">
            ${marked(el.note)}
          </div>
        </div>
      </div>
    `;

    notesSection.insertAdjacentHTML("afterbegin", markup);
  });
};

const init = function () {
  renderNotes();
};
init();
