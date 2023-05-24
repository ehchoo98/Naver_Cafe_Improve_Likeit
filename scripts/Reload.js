cafemain = top.document.querySelector("iframe#cafe_main").contentWindow
cafemain.addEventListener("load", function(){
//////A 1. fix url to right uncleared string
    //url = top.document.querySelector("iframe#cafe_main").contentWindow.document.location.href
//////  

//////A 2. fix url to right cleared string(for ArticleRead page)
    if(cafemain.document.location.href.match(/.*ArticleRead.nhn.*/)){
        //If Article page
        let intervalId = setInterval(()=>{
            //Wait for spiButton load
            if(cafemain.document.querySelector("a#spiButton")){
                //when button loaded
                url = cafemain.document.querySelector('a#spiButton').getAttribute('data-url')
                clearInterval(intervalId)
            }
        }, 50)    
    }else{
        //If not Article page
        url = top.document.querySelector("iframe#cafe_main").contentWindow.document.location.href
    }
//////
    
//////B. fix the url
    top.parent.history.replaceState(null, null, url)    
}, {passive: true})

