
// 'use strict';
chrome.runtime.onInstalled.addListener(function () {
    
    //7 classes
    // chrome.storage.sync.set({ class1: 'lol' });
    // chrome.storage.sync.set({ class2: 'lol' });
    // chrome.storage.sync.set({ class3: 'lol' });
    // chrome.storage.sync.set({ class4: 'lol' });
    // chrome.storage.sync.set({ class5: 'lol' });
    // chrome.storage.sync.set({ class6: 'lol' });
    // chrome.storage.sync.set({ class7: 'lol' });

    //7 times
    // chrome.storage.sync.set({ time1: 'lol' });
    // chrome.storage.sync.set({ time2: 'lol' });
    // chrome.storage.sync.set({ time3: 'lol' });
    // chrome.storage.sync.set({ time4: 'lol' });
    // chrome.storage.sync.set({ time5: 'lol' });
    // chrome.storage.sync.set({ time6: 'lol' });
    // chrome.storage.sync.set({ time7: 'lol' });

    //how to get key value
    // chrome.storage.sync.get(['class1'], function(val){
    //     var value = val.class1;
    //     alert(value);
    // });
    chrome.tabs.create({url: 'https://fuhsd.schoology.com/courses'});

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'fuhsd.schoology.com' },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    }); 
});

chrome.tabs.onInstalled.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.url.localeCompare('https://fuhsd.schoology.com/courses') == 0){
        alert('inside listener for courses');
        debugger
        $(document).ready(function(){
            var list = $("body").find("ul.courses-listing listing mycourses");
            console.log(list.clone().html());
        });
        // alert('sdfsd')
        // $(document).ready(function(){
        //      var classes = [];
        //      for( i = 0; i < 8; i++){
        //          alert()
        //          classes[i] = $("course-title").val()
        //      }
        // }
    }
});

