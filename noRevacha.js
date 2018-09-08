let dialog = null;
$(document).ready(function () {
    let d = new Date();
    d.setMonth(6);
    d.setDate(1);
    //let curShouldAsk = true;
    let savedNextDateToAsk = chrome.storage.sync.get('nextDateToAsk', function () {});
    let nextDayToAsk =  (savedNextDateToAsk) ? savedNextDateToAsk : d;
    chrome.storage.sync.set({ 'nextDateToAsk' : nextDayToAsk });
    //let prevShouldAsk = chrome.storage.sync.get('shouldAsk', function () {});

    //TODO: change to actual dates
    if(Date.now() >= nextDayToAsk){//checking if month is between July and August
        dialog = $("<p>האם תרצה לבטל את דמי הרווחה?</p>").dialog({
            buttons: {
                "Yes": cancelRevachaNow(),
                "No": stopAsking(),
                "Snooze":snooze()
            }
        });
    }

    function cancelRevachaNow(){
        let clickDestination = document.getElementById("li19").getAttribute("onclick");
        if (clickDestination.contains("Revacha")) {
            document.getElementById("li19").click();
            let cancelCheckboxButton = document.getElementById('jordan').contentWindow.document.getElementById('ckIshur');
            cancelCheckboxButton.click();
            let cancelApproveButton = document.getElementById('jordan').contentWindow.document.getElementById('btnishur');
            cancelApproveButton.click();
            let areYouSureButton = document.getElementById('jordan').contentWindow.document.getElementsByClassName('ui-button');
            areYouSureButton[2].click(); //clicking on the right button from the buttons array
            stopAsking();
            window.history.back();
        }
        else {
            alert("Our apologies, could not cancel Revacha. Go to personal info to cancel manually");
        }
    }



    function snooze(){
        let newD = new Date();
        let curD = Date.now();
        newD.setDate(curD.getDate()+7);
        dialog.close();
    }

    function stopAsking() {
        let newD = new Date();
        let curD = Date.now();
        newD.setFullYear(curD.getFullYear()+1, 6, 1);
        chrome.storage.sync.set({ 'nextDateToAsk' : newD });
        dialog.close();
    }
})

