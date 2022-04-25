const id = localStorage.getItem("id")
const main = document.querySelector("main")
const section = document.querySelector("section")
const castSeasonsDiv = document.createElement("div") 
castSeasonsDiv.classList.add("castseason")

const renderSingleShow = (show) => {
   
    const div = document.createElement("div")
    const h1 = document.createElement("h1")
    const image = document.createElement("img")

    h1.innerHTML = show.name
    h1.classList.add("naslov")
    image.setAttribute("src", show.image.original)
    h1.addEventListener("click", ()=>{
        window.location.href = "./index.html"
    })
    div.append(image, h1)
    main.appendChild(div)
}

const renderSeason = (season) => {
    
    const div1 = document.createElement("div")
    const naslov = document.createElement("h1")
    div1.classList.add("sezone")
    naslov.innerHTML = `Seasons ${season.length}`
    div1.appendChild(naslov)
    season.forEach((e)=> {
        const p = document.createElement("p")
        p.innerHTML = `${e.premiereDate} - ${e.endDate}`
        div1.append(p)
    })
    castSeasonsDiv.appendChild(div1)
}

const renderCast = (cast) => {
   
    const casts = document.createElement("div")
    const uloge = document.createElement("h1")
    casts.classList.add("uloge")
    uloge.innerHTML = "Cast"
    casts.appendChild(uloge)
    cast.forEach((e,i)=> {
        if(i<7){
        const p1 = document.createElement("p")
        p1.innerHTML = `${e.person.name}`
        casts.append(p1) 
    }})
    castSeasonsDiv.appendChild(casts)
}

main.appendChild(castSeasonsDiv)

const renderSummary = (sadrzaj) => {
    
    const par = document.createElement("div")
    const details = document.createElement("h2")
    const text = document.createElement("p")
    par.classList.add("details")
    details.innerHTML = "Details"
    text.innerHTML = sadrzaj.summary

    par.append(details, text)
    section.appendChild(par)
}

const fetchData = () => fetch(`https://api.tvmaze.com/shows/${id}`)
.then((response)=>response.json())
.then((response)=>{renderSingleShow(response)})

const fetchSeasons = () => fetch(`https://api.tvmaze.com/shows/${id}/seasons`)
.then((resp)=>resp.json())
.then((resp)=>{renderSeason(resp)})

const fetchCast = () => fetch(`https://api.tvmaze.com/shows/${id}/cast`)
.then((res)=>res.json())
.then((res)=>{renderCast(res)})

const fetchSummary = () => fetch(`https://api.tvmaze.com/shows/${id}`)
.then((summary)=>summary.json())
.then((summary)=>{renderSummary(summary)})

window.addEventListener("load", fetchData)
window.addEventListener("load", fetchSeasons)
window.addEventListener("load", fetchCast)
window.addEventListener("load", fetchSummary)