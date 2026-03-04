const loadData = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayData(json.data));
};
const wordLevel = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayWordLevel(json.data));
};
const displayWordLevel = (words) => {
  const wordLevelCart = document.getElementById("word-level-cart");
  wordLevelCart.innerHTML = "";
  words.forEach((word) => {
    let wordCart = document.createElement("div");
    wordCart.innerHTML = `
       <div
          class="card space-y-4 card-border shadow-sm bg-base-100 p-5 w-80 text-center lg:w-70"
        >
          <h2 class="font-bold text-2xl">${word.word}</h2>
          <p class="font-semibold">Meaning/Pronuntiation</p>
          <p class="font-medium text-2xl bangla-font">${word.meaning}/${word.pronunciation}</p>
          <div class="flex justify-between items-center">
            <button class="btn btn-soft btn-primary"><i class="fa-solid fa-circle-question"></i></button>
            <button class="btn btn-soft btn-primary"><i class="fa-solid fa-microphone"></i></button>
          </div>
        </div>
    `;
    wordLevelCart.appendChild(wordCart);
  });
};
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
    class="btn btn-outline  btn-primary">
    <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
    </button>
    `;
    //     4.append btn
    levelContainer.appendChild(levelBtn);
  }
};
loadData();
