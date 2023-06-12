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
/*
chrome.action.onClicked.addListener((tab)=>{
    chrome.tabs.sendMessage(tab.id, 1 ,(response)=>{
        if(chrome.runtime.lastError){}
        return response
    })   
})
*/
chrome.runtime.onInstalled.addListener(()=>{
    chrome.action.disable()
})

chrome.tabs.onUpdated.addListener((tabId, changedInfo, tab)=>{
    if(changedInfo.status=="complete"){
        chrome.action.setIcon({path : "../images/icon0-32.png", tabId : tabId})  
        chrome.action.disable(tabId)
    }
})