const createElement = (arr)=> {
   const htmlElements = arr.map((el)=> `<span class="btn">${el}</span>`);
   return(htmlElements.join(""));
};

const manageSpining= (status)=>{
    if(status==true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }else{
         document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonbutton = document.querySelectorAll(".lesson-btn");
  // console.log(lessonbutton);
  lessonbutton.forEach((btn) => btn.classList.remove("active"));
};
const loadlevelword = (id) => {
    manageSpining(true);
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickbtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickbtn)
      clickbtn.classList.add("active");
      displayLevelword(data.data);
    });
};

const loadwordDetail= async (id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`;
   
    const res = await fetch(url);
    const details = await res.json();
    displaywordDetails(details.data);
};
const displaywordDetails = (word) =>{
    console.log(word);
    const detailsBox =document.getElementById("details-container");
    detailsBox.innerHTML=`
    <div class="">
        <h2 class="font-bold text-2xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
      </div>
      <div class="">
        <h2 class="font-bold ">Meaning</h2>
        <p>${word.meaning}</p>
      </div>
      <div class="">
        <h2 class="font-bold ">Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div class="">
        <h2 class="font-bold ">সমার্থক শব্দ গুলো</h2>
        <div class="">${createElement(word.synonyms)}</div>
      </div>
    
    `;
    document.getElementById("word-modal").showModal();
};
const displayLevelword = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = " ";

  if (words.length == 0) {
    wordContainer.innerHTML = `
       <div class="text-center  col-span-full space-y-4">
       <img class="mx-auto" src="./assets/alert-error.png"/>
      <p class="font-semibold text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="text-4xl">নেক্সট Lesson এ যান</h2>
     </div>

       `;
       manageSpining(false);
    return;
  }

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
     <div class="bg-white rounded-lg shadow-sm py-10 px-5 text-center">
        <h2 class="font-bold text-2xl ">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}</div>
        <div class="flex justify-between items-center">
        <button onclick="loadwordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]" ><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]" ><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>

    `;
    wordContainer.append(card);
  });
  manageSpining(false);
};

const displayLesson = (lessons) => {
  // 1. get the container & empty
  const levelContainer = document.getElementById("level-Container");
  levelContainer.innerHTML = "";
  // 2.get into every lessons

  for (let lesson of lessons) {
    // 3.create Element
    // console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadlevelword(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}
            </button>
            `;
    //   Append into  container
    levelContainer.append(btnDiv);
  }
};

loadLessons();
