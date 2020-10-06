// console.log("working")


let qoute = ''
let author = ''
function parseQuote(response)
{   
    qoute = response.quoteText;
    author = response.quoteAuthor;
    document.getElementById("qoute").innerHTML = qoute
    document.getElementById("author").innerHTML = author
    console.log("test")
    let btn = document.getElementById("btn")
    btn.addEventListener("click", () => {
        
        location.reload()
    })
    
}
let saveBtn = document.getElementById("saveBtn")
saveBtn.addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.setItem(author, qoute)
    e.target.setAttribute("disabled","disabled")
    document.getElementById("message").style.display = "block"
    e.target.style.color = "grey"
    e.target.style.border = "1px solid grey"
    console.log("save this qoute")
    
})

let listBtn = document.getElementById("listBtn")
listBtn.addEventListener("click", (e) => {
    // e.target.setAttribute("disabled","disabled")
    // console.log("show all qoutes")
    e.target.style.color = "grey"
    // e.target.style.border = "1px solid grey"
    for( let i = 0; i< localStorage.length; i++){
        document.getElementsByClassName("list")[0].innerHTML += `<p>${localStorage.getItem(localStorage.key(i))}</p><hr>`
    }

    document.getElementsByClassName("inner")[0].classList.toggle("hide")
    document.getElementsByClassName("showAll")[0].classList.toggle("show")

})


let backBtn = document.getElementById("backBtn")
backBtn.addEventListener('click', (e) => {
    console.log("back to main page")
    document.getElementsByClassName("inner")[0].classList.toggle("hide")
    document.getElementsByClassName("showAll")[0].classList.toggle("show")
    location.reload()
})


function delQoute(e){
    console.log(e)
    console.log("delete this qoute")
}
