const main = document.querySelector("main");
const btn = document.querySelector("button");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const dropDown = document.querySelector(".dropdown");
const body = document.querySelector("body")

const renderSingleShow = (show) => {
  const div = document.createElement("div");
  const image = document.createElement("img");
  const h1 = document.createElement("h1");

  h1.innerHTML = show.name;
  image.setAttribute("src", show.image.medium);
  h1.addEventListener("click", () => {
    localStorage.setItem("id", show.id);
    window.location.href = "./index2.html";
  });

  div.append(image, h1);
  main.appendChild(div);
};

const renderSingleFilm = (film) => {
  
  ul.innerHTML = "";
  film.forEach((e) => {
    const li = document.createElement("li");
    li.innerHTML = e.show.name;
    li.addEventListener("click", ()=>{
      window.location.href = "./index2.html";
      localStorage.setItem("id", e.show.id)
    })
    ul.classList.add("ul")
    ul.append(li);
  });
  dropDown.append(ul);
};

function fetchData(){
 fetch("https://api.tvmaze.com/shows")
  .then((response) => response.json())
  .then((response) => {
    response
      .filter((e, i) => i < 50)
      .forEach((e) => {
        renderSingleShow(e);
      });
  });
}

const fetchFilms = () =>
  fetch(`https://api.tvmaze.com/search/shows?q=${input.value}`)
    .then((films) => films.json())
    .then((films) => {
      renderSingleFilm(films);
    });

window.addEventListener("load", fetchData);
input.addEventListener("keyup", fetchFilms);