import $ from 'jquery';

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        let jsonString = JSON.parse(localStorage.getItem('json'));
        if (request.greeting === "hello")
        {
            let count = 0;
            for(let jsonRow of jsonString) {
                if ((jsonRow.domain === request.hostname) || ('www.' + jsonRow.domain === request.hostname)) {
                    try {
                        count = sessionStorage.getItem(request.hostname + "Tab");
                    }
                    catch (e) {
                    }
                    count++;
                    sessionStorage.setItem(request.hostname + "Tab", count);
                }
            }
            sendResponse({farewell: jsonString, isClosed: sessionStorage.getItem(request.hostname), count: count});
        }

        if (request.message === "Closed")
        {
            sessionStorage.setItem(request.hostname, "true");
        }
        if (request.newTab === 1){

        }
    });

function getSites() {
    $.getJSON('http://www.softomate.net/ext/employees/list.json',data => {
        let jsonString = JSON.stringify(data,["name","domain","message"]);
        localStorage.setItem("json",jsonString);
    });
}

chrome.runtime.onInstalled.addListener(() => {
    getSites();
});

let time = 0;

window.setInterval(() => {
    try{
        time = localStorage.getItem("time");
    }
    catch (e) {

    }
    time++;
    if(time === 60)
    {
        getSites();
        time = 0;
    }
    localStorage.setItem("time", time);
}, 60000);