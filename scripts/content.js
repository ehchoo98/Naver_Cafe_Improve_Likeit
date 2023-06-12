const doc = window.document
let loadFirst = true
let problem = false
let likeBtn = null, urlBtn = null
let like = null
let clk = null
let url = null

const btnFunc = (_mutationList, observer) => {
    if(loadFirst){
        urlBtn = doc.querySelector("a#spiButton")
        likeBtn = doc.querySelector("a.like_no")
        if(urlBtn && urlBtn.getAttribute('data-url')){
            top.parent.history.replaceState(null, null, urlBtn.getAttribute('data-url'))
            if(likeBtn){
                window.addEventListener("beforeunload", unloadEvnt)
                likeBtn .addEventListener("click", clkEvnt)
                observer.disconnect()   
                obsBtn .observe(likeBtn , {attributeFilter: ["aria-pressed"]})
                loadFirst = false
            }
        }
    }else{ 
        like = likeBtn.getAttribute("aria-pressed")
        clk = sessionStorage.getItem("clicked")
        url = sessionStorage.getItem("url") 
        chrome.runtime.sendMessage(like)
        
        if(url){
            if(window.location.pathname === url){
                top.scroll(sessionStorage.getItem("likeX"),sessionStorage.getItem("likeY"))
            }
            sessionStorage.clear()
        }else{
            problem = like === clk
        }
    }
}

function clkEvnt(){
    sessionStorage.setItem("clicked", like)
}

function unloadEvnt(_event){
    sessionStorage.clear()
    if(problem){
        sessionStorage.setItem("url", window.location.pathname)
        sessionStorage.setItem("likeX", top.scrollX)
        sessionStorage.setItem("likeY", top.scrollY)
    }
}

const obsBtn = new MutationObserver(btnFunc)
obsBtn.observe(window.document, {childList: true, subtree: true })
