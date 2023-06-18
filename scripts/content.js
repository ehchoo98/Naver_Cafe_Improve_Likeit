const doc = window.document
const url = window.location.pathname
let loadLike = true, loadUrl = true
let likeBtn, urlBtn
let prbl = false, like = null, clicked = null

let reload = url === sessionStorage.getItem("previous_url")
let preX = sessionStorage.getItem("likeX")
let preY = sessionStorage.getItem("likeY")
//let action = sessionStorage.getItem("action")

sessionStorage.clear()

const btnFunc = (_mutationList, observer) => {
    if(loadUrl){
        urlBtn = doc.getElementById("spiButton")
        if(urlBtn){
            top.parent.history.replaceState(null, null, urlBtn.getAttribute("data-url"))
            loadUrl = false
        }
    } 
    if(loadLike){
        likeBtn = doc.querySelector("a.like_no")
        if(likeBtn){
            window.addEventListener("beforeunload", unloadEvnt)
            likeBtn.addEventListener("click", btnEvnt)
            //chrome.runtime.onMessage.addListener(actEvnt)
            observer.disconnect()  
            obsBtn.observe(likeBtn, {attributeFilter: ["aria-pressed"]})
            loadLike = false  
        }
    }else{
        like = likeBtn.getAttribute("aria-pressed")
        try{chrome.runtime.sendMessage(like)}catch(e){}
        prbl = like === clicked
        if(reload && !clicked){
            top.scroll(preX,preY)
            reload = false
            //if(action){likeBtn.click()}
        }
    }
}

function btnEvnt(){
    clicked = like
}
/*
function actEvnt(){
    prbl = true
    sessionStorage.setItem("action", true)
    window.location.reload()
}
*/
function unloadEvnt(_event){
    if(prbl){
        sessionStorage.setItem("previous_url", url)
        sessionStorage.setItem("likeX", top.scrollX)
        sessionStorage.setItem("likeY", top.scrollY)
    }
}

const obsBtn = new MutationObserver(btnFunc)
obsBtn.observe(doc.documentElement, {childList: true, subtree: true })
