const flashcards = document.getElementsByClassName("flashcards")[0];
const createBox = document.getElementsByClassName("cardBox")[0];
const container = document.getElementsByClassName("container")[0];
const question = document.getElementById("question");
const answer = document.getElementById("answer");
let contentArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

contentArray.forEach(divMaker);
function divMaker(text) {
  var div = document.createElement("div");
  var h3_question = document.createElement("h3");
  var h3_answer = document.createElement("h3");
  var clearButton = document.createElement("button");
  div.className = "flashcard";
  h3_question.setAttribute(
    "style",
    "border-top:1px solid red; padding:15px;margin-top:30px"
  );
  h3_question.innerHTML = text.my_question;
  h3_answer.setAttribute(
    "style",
    "text-align:center;display:none;color:#96AD93"
  );
  h3_answer.innerHTML = text.my_answer;
  h3_answer.className = "answertext";
  h3_question.className = "questiontext";
  clearButton.className = "clearButton";
  // clearButton.setAttribute("style","background-color: aliceblue;border: none;border-radius: 2px;padding: 5px 10px;font-size: 16px;display:flex; flex-direction:column")
  clearButton.innerText = "clear";
  div.appendChild(h3_question);
  div.appendChild(h3_answer);
  div.appendChild(clearButton);

  console.log(h3_answer);
  div.addEventListener("click", function () {
    if (h3_answer.style.display == "none") {
      h3_answer.style.display = "block";
    } else {
      h3_answer.style.display = "none";
    }
  });
  // div.style.display="block"
  // div.style.backgroundColor="red"
  container.appendChild(div);
  console.log("div maker is working");
  console.log(div);
  clearButton.addEventListener("click", function () {
    //   // hideclearbutton();
    //   div.style.display="none"
    // flashcards.innerHTML = "";
    // contentArray = [];
    //   // div.remove(div)
    //   // localStorage.removeItem()
    // container.removeChild(div);
    div.classList.add("fall");
    //delete flashcard to local storage
    deleteFlashcard(div);
    div.addEventListener("transitionend", function () {
      container.removeChild(div);
    });
  });
}
function deleteFlashcard(div) {
  console.log("hello");
  console.log(div.children);
  const flashcardIndex = div.children[0].innerText;
  console.log(flashcardIndex);
  contentArray.splice(contentArray.indexOf(flashcardIndex), 1);
  localStorage.setItem("items", JSON.stringify(contentArray));
  console.log(contentArray);
}
function addFlashcard() {
  let flashcard_info = {
    my_question: question.value,
    my_answer: answer.value,
  };
  contentArray.push(flashcard_info);
  localStorage.setItem("items", JSON.stringify(contentArray));
  divMaker(contentArray[contentArray.length - 1]);
  question.value = "";
  answer.value = "";
}
function delFlashcards() {
  // localStorage.getItem("items").clear();
  //  .style.display="none"
  localStorage.clear();
  flashcards.innerHTML = "";
  contentArray = [];
  container.remove(div);
}
function showCreateCardBox() {
  createBox.style.display = "block";
}
function hideCreateBox() {
  createBox.style.display = "none";
}
function hideclearbutton() {
  div.style.display = "none";
}
