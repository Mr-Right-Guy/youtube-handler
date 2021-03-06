var actionID = '';  //variable

chrome.runtime.onMessage.addListener(doyoutubeaction); //event listener

function doyoutubeaction(message){

actionID = message.actionid;

var querying = chrome.tabs.query({url: "*://*.youtube.com/*"},logTabs);
//querying.then(logTabs, onError);

}


// get all the tab url
function logTabs(tabs) {
  for (let tab of tabs) {
    // tab.url requires the `tabs` permission
	changeSong(tab.id);
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function onExecuted(result) {
  console.log(`We executed in tab 2`);
}


// do the operation
function changeSong(tabid){

var codeToExecute = '';
codeToExecute = findCode(tabid);


var executing = chrome.tabs.executeScript(
  		tabid,
  		{code: codeToExecute}
	);
//executing.then(onExecuted, onError);

}


// Find the code executiong
function findCode(tabid){

	if(actionID == 'nextsong'){
        	return 'document.querySelector(".ytp-next-button.ytp-button").click()'
	}else if(actionID == 'switchplay'){
        	return 'document.querySelector(".ytp-play-button.ytp-button").click()'
	}else if(actionID == 'replay'){
    // var slide = document.getElementById('ytp-progress-bar')
    return 'document.querySelector(".ytp-prev-button.ytp-button").click()'
	}else if(actionID == 'mute'){
    return 'document.querySelector(".ytp-mute-button.ytp-button").click()'
  }
  else if(actionID == 'lastsong'){
        	  chrome.tabs.executeScript(
  				tabid,
  				{code: 'document.querySelector(".ytp-replay-button.ytp-button").click()'}
				);
	return 'document.querySelector(".ytp-replay-button.ytp-button").click()'
	}

}
