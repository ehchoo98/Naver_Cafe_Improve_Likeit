let loadFirst = true
let btn = null
let like = null
let clk = null
let auto = false
const btnFunc = (_mutationList, observer) => {
    const likeBtn = window.document.querySelector("a.like_no")
    if(likeBtn){
        if(loadFirst){
            btn = likeBtn
            btn.addEventListener("click", btnEvnt) 
            window.addEventListener("beforeunload", unloadEvnt)
            observer.disconnect()   
            obsBtn.observe(btn, {attributes : true})
            chrome.runtime.onMessage.addListener(CtmEvnt)
            
            loadFirst = false
        }else{ 
            clk = sessionStorage.getItem("Clicked") 
            like = btn.getAttribute("aria-pressed") 
            load = sessionStorage.getItem("Context")
            isNotChanged = like===clk
            if(load!==null){
                if(isNotChanged&&load=="true"){  
                    btn.click()  
                }else{
                    sessionStorage.removeItem("Context")
                }
                top.scroll(sessionStorage.getItem("likeX"),sessionStorage.getItem("likeY"))
            }else{    
                if(isNotChanged){
                    sessionStorage.setItem("Context", false)
                    softReload()                   
                }
            }
        }        
    }
}

function btnEvnt(_event){
    sessionStorage.setItem("Clicked", like)
}

function CtmEvnt(_,_,sendResponse){
    sessionStorage.setItem("Context", true)
    sessionStorage.setItem("Clicked", like)
    sendResponse(0)
    softReload()
    return true;   
}

function softReload(){
    auto = true
    sessionStorage.setItem("likeX", top.scrollX)
    sessionStorage.setItem("likeY", top.scrollY)
    window.document.location.replace(window.document.location.href)
}

function unloadEvnt(_event){
    if(!auto){
        sessionStorage.removeItem("Clicked")
        sessionStorage.removeItem("likeX")  
        sessionStorage.removeItem("likeY")
    }
}

const obsBtn = new MutationObserver(btnFunc)
obsBtn.observe(window.document, {childList: true, subtree: true })





