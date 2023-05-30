chrome.contextMenus.onClicked.addListener(function(_info, tab) {
    chrome.tabs.sendMessage(tab.id,"contextLikeit",(response)=>{ 
        if(chrome.runtime.lastError){
            console.warn("WARNING:: Plaese refresh the tab")
        }
    })
})

chrome.runtime.onInstalled.addListener(()=>{
    chrome.contextMenus.create({
        title: "게시글 좋아요",
        contexts: ["all"],
        id: "Likeit0",
        documentUrlPatterns: ["*://cafe.naver.com/*ArticleRead.nhn*"]
    })
})
