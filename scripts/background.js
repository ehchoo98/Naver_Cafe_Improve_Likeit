chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{ 
    if(message=="true"){  
        chrome.action.setIcon({path : "../images/icon1-32.png", tabId : sender.tab.id}) 
        chrome.action.enable(sender.tab.id)
    }else if(message=="false"){
        chrome.action.setIcon({path : "../images/icon0-32.png", tabId : sender.tab.id})  
        chrome.action.enable(sender.tab.id)
    }
    sendResponse(message)
    return true
})

chrome.runtime.onInstalled.addListener(()=>{
    chrome.action.disable()
})
/*
chrome.action.onClicked.addListener((tab)=>{
    if(like === "false"){
        chrome.tabs.sendMessage(tab.id,"action")
    }
})
*/
chrome.tabs.onUpdated.addListener((tabId, changedInfo, tab)=>{
    if(changedInfo.status=="loading"){
        chrome.action.setIcon({path : "../images/icon0-32.png", tabId : tabId})  
        chrome.action.disable(tabId)
    }
})