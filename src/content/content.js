import App from './components/App';
import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery'

const anchor = document.createElement('div');
anchor.id = 'rcr-anchor';
$('body').prepend(anchor);

chrome.runtime.sendMessage({greeting: "hello", hostname: window.location.hostname, newTab: 1}, response => {
    let jsonString = response.farewell;
    let isClosed = response.isClosed;
    let hostname = window.location.hostname;

    for(let jsonRow of jsonString){
        if((jsonRow.domain === hostname) || ('www.' + jsonRow.domain === hostname)) {
            let count = 0;
            count = response.count;

            if(!isClosed && count < 4) {
                render(<App message={jsonRow.message}/>, document.getElementById('rcr-anchor'));
            }
        }
    }

    let url = chrome.extension.getURL('images/extension_16.png');
    let icon = "<img src='"+ url +"' alt='Extension'>";

    if(window.location.hostname === 'www.google.com' || 'www.google.ru') {
        $('.g').each(index => {
            let addres = $('.iUh30').eq(index).text();
            let notHttp;
            let domainAddres;
            if(!addres.includes('http') && !addres.includes('https')) {
                domainAddres = addres.split('/');
                notHttp = domainAddres[0];
            }
            else{
                domainAddres = addres.split('/');
            }
            for(let jsonRow of jsonString){
                if((jsonRow.domain === domainAddres[2]) || ('www.' + jsonRow.domain ===
                    domainAddres[2]) || ('www.' + jsonRow.domain === notHttp)) {
                    $('.r').eq(index).append(icon);
                    notHttp = "";
                }
            }
        });
    }

    if(window.location.hostname === 'www.bing.com') {
        $('.b_algo ').each(index => {
            let addres = $('cite').eq(index).text();
            let notHttp;
            let domainAddres;
            if(!addres.includes('http') && !addres.includes('https')) {
                domainAddres = addres.split('/');
                notHttp = domainAddres[0];
            }
            else{
                domainAddres = addres.split('/');
            }
            for(let jsonRow of jsonString){
                if((jsonRow.domain === domainAddres[2]) || ('www.' + jsonRow.domain ===
                    domainAddres[2]) || ('www.' + jsonRow.domain === notHttp)) {
                    $('h2').eq(index).append(icon);
                    notHttp = "";
                }
            }
        });
    }
});
