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
            btn.addEventListener("mousedown", btnEvnt)
            observer.disconnect()   
            obsBtn.observe(btn, {attributeFilter : ["aria-pressed"]})
            loadFirst = false
        }
    }else{ 
        //버튼 상태가 변하면 실행
        clk = sessionStorage.getItem("Clicked")
        like = btn.getAttribute("aria-pressed")
        if(like === clk){
            //누르기 전과 후의 버튼 상태가 그대로라면 버튼 클릭
            btn.click() 
        }
        if(clk!==null && reload){
            //만약 클릭을 했었다면 클릭했을 때의 위치로 이동
            top.scroll(sessionStorage.getItem("likeX"),sessionStorage.getItem("likeY"))
            sessionStorage.removeItem("Clicked")
        }
    }
    
}

//버튼 클릭했을 때 이벤트
function btnEvnt(event){  
    if(event.button === 0){
        //마우스 좌클릭(mousedown)시, sessionStorage 변수 설정 후, 페이지 리로드
        sessionStorage.setItem("Clicked", like)
        sessionStorage.setItem("likeX", top.scrollX)
        sessionStorage.setItem("likeY", top.scrollY) 
        reload = false
        window.document.location.replace(window.document.location.href)
    }
}

const obsBtn = new MutationObserver(btnFunc)
obsBtn.observe(window.document, {childList: true, subtree: true })
