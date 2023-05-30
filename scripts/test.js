//변수 선언
let loadFirst = true
let reload = true
let btn = null
let like = null
let clk = null

//변화 관측 이벤트
const btnFunc = (mutationList, observer) => {
    if(loadFirst){
        if(window.document.querySelector("a.like_no")){
            //좋아요 버튼 찾아내기, 로딩되면 버튼 상태변화 관측 시작
            btn = window.document.querySelector("a.like_no")
            btn.addEventListener("click", btnEvnt)
            observer.disconnect()   
            obsBtn.observe(btn, {attributeFilter : ["aria-pressed"]})
            loadFirst = false
        }
    }else{ 
        //버튼 상태가 변하면 실행
        //clk = sessionStorage.getItem("Clicked")
        like = btn.getAttribute("aria-pressed")
        clk = sessionStorage.getItem("Clicked")
        console.log("1--"+like)
        console.log("c--"+clk)

        if(like === clk){//누르기 전과 후의 버튼 상태가 그대로라면 새로고침
            if(reload){
                console.log("Button click!")
                btn.click()
                top.scroll(sessionStorage.getItem("likeX"),sessionStorage.getItem("likeY"))
                sessionStorage.removeItem("Clicked")
            }else{
                console.log("reload!")
                sessionStorage.setItem("likeX", top.scrollX)
                sessionStorage.setItem("likeY", top.scrollY) 
                window.document.location.replace(window.document.location.href)
            }  
        }        
    }
}

//버튼 클릭 시
function btnEvnt(event){
    sessionStorage.setItem("Clicked", like)
    reload = false
}

const obsBtn = new MutationObserver(btnFunc)
obsBtn.observe(window.document, {childList: true, subtree: true })
