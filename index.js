// chrome://extensions/
let myLeads = []

const inputEl = document.getElementById("input-el")
const ulEL = document.getElementById("ul-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.querySelector("#delete-btn")
const tabBtn = document.querySelector("#tab-btn")

const localLeads = JSON.parse(localStorage.getItem("myLeads"))
if(localLeads){
    myLeads = localLeads
    render(myLeads)
}

function render(lead_arr){
    let listItems = ""
    for(let i = 0; i<lead_arr.length; i++){
        listItems += `<li>
                        <a target = '_blank' href='${lead_arr[i]}'>
                        ${lead_arr[i]}
                        </a>
                     </li>`    
    }
    ulEL.innerHTML = listItems

}

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem(myLeads))
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        tabUrl = tabs[0]["url"]
        myLeads.push(tabUrl)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)

    })
})

