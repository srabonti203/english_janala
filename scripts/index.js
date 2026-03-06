const creatElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-level-cart").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-level-cart").classList.remove("hidden");
  }
};
//2. all lessons are loaded using this function
const loadData = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayData(json.data));
};
const removeActiveClass = () => {
  let lessonBtns = document.querySelectorAll(".lesson-btn");
  lessonBtns.forEach((btn) => btn.classList.remove("active"));
};
//4.when wordLevel was onclick from the lesson button an id was passed and catched using this function
const wordLevel = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      removeActiveClass(); //remove active class form all other btn
      let selected = document.getElementById(`lesson-btn-${id}`);
      selected.classList.add("active"); //adds active class only on the active btn
      displayWordLevel(json.data);
    });
};

//6.when someone wants to see the info of a perticular word and click on the ? icon this function loads the word details
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
//7.and this function shows the word details using a modal
const displayWordDetails = (word) => {
  const detailBox = document.getElementById("detail-box");
  // console.log(word);
  detailBox.innerHTML = `
    <h2 class="font-bold text-2xl">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i
              >:${word.pronunciation} )
            </h2>
            <div class="space-y-3">
              <h2 class="font-bold">Meaning</h2>
              <p>${word.meaning}</p>
            </div>
            <div class="space-y-3">
              <h2 class="font-bold">Example</h2>
              <p>${word.sentence}</p>
            </div>
            <div class="space-y-3">
            <h2 class="font-bold">Synonyms</h2>
            <div class="space-x-3 ">
              ${creatElements(word.synonyms)}
            </div>
            </div>
   `;
  document.getElementById("word_modal").showModal();
};
//5.and that lesson is shown using this function
const displayWordLevel = (words) => {
  const wordLevelCart = document.getElementById("word-level-cart");
  wordLevelCart.innerHTML = "";
  if (words.length == 0) {
    wordLevelCart.innerHTML = `
    <div class="flex flex-col items-center justify-center col-span-3 space-y-3">
        <img src="./assets/alert-error.png" alt="">
          <p class="text-slate-500 bangla-font">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <h2 class="text-4xl font-bold bangla-font">
            নেক্সট Lesson এ যান
          </h2>
        </div>
    `;
    manageSpinner(false);
    return;
  }
  words.forEach((word) => {
    let wordCart = document.createElement("div");
    wordCart.innerHTML = `
       <div
          class="card space-y-4 card-border shadow-sm bg-base-100 p-5 w-80 text-center lg:w-70"
        >
          <h2 class="font-bold text-2xl">${word.word ? word.word : "word not found"}</h2>
          <p class="font-semibold">Meaning/Pronuntiation</p>
          <p class="font-medium text-2xl bangla-font">${word.meaning ? word.meaning : "meaning not found"}/${word.pronunciation ? word.pronunciation : "pronuntiation not found"}</p>
          <div class="flex justify-between items-center">
            <button onclick="loadWordDetails(${word.id})" class="btn btn-soft btn-primary"><i class="fa-solid fa-circle-question"></i></button>
            <button class="btn btn-soft btn-primary"><i class="fa-solid fa-microphone"></i></button>
          </div>
        </div>
    `;
    wordLevelCart.appendChild(wordCart);
  });
  manageSpinner(false);
};

//3.lessons are displayed using this function in the form of lesson 1,lesson 2 etc....
const displayData = (lessons) => {
  //     1.get btn-div
  const levelContainer = document.getElementById("level-container");
  //     2.empty html if there is any
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    //     3.creat btn
    let levelBtn = document.createElement("button");
    levelBtn.innerHTML = ` 
    <button onclick="wordLevel('${lesson.level_no}')" 
    class="btn btn-outline  btn-primary lesson-btn"
    id="lesson-btn-${lesson.level_no}"
    >
    <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
    </button>
    `;
    //     4.append btn
    levelContainer.appendChild(levelBtn);
  }
};
loadData(); //1.all the functionality starts from here
