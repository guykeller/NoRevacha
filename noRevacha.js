let dialog = null;
$(document).ready(function () {
    let d = new Date();
    d.setMonth(6);
    d.setDate(1);
    let savedNextDateToAsk = chrome.storage.sync.get('nextDateToAsk', function () {});
    let nextDayToAsk =  (savedNextDateToAsk) ? savedNextDateToAsk : d;
    chrome.storage.sync.set({ 'nextDateToAsk' : nextDayToAsk });

    if(Date.now() >= nextDayToAsk){
        dialog = $("<p>No revacha ?</p>").dialog({
            resizable: false,
            height:140,
            modal: true,
            buttons: {
                "Yes": function() { dialog.dialog('close'); cancelRevachaNow();},
                "No": function() { dialog.dialog('close');  stopAsking()},
                "Snooze": function()  { dialog.dialog('close');  snooze()}
            }
        });
    }

    function cancelRevachaNow(){
        let clickDestination = document.getElementById("li19").getAttribute("onclick");
        if (clickDestination.includes("Revacha")) {


            document.getElementById('jordan').contentWindow.onload = function(){
                let cancelCheckboxButton = document.getElementById('jordan').contentWindow.document.getElementById('ckIshur');


                cancelCheckboxButton.click();
                let cancelApproveButton = document.getElementById('jordan').contentWindow.document.getElementById('btnishur');
                cancelApproveButton.click();
                let areYouSureButton = document.getElementById('jordan').contentWindow.document.getElementsByClassName('ui-button');
                areYouSureButton[2].click(); //clicking on the right button from the buttons array
                stopAsking();
                window.history.back();
            }();

            document.getElementById("li19").click();




        }
        else {
            alert("Our apologies, could not cancel Revacha. Go to personal info to cancel manually");
        }
    }



    function snooze(){
        let newD = new Date();
        let curD = Date.now();
        newD.setDate(curD.getDate()+7);
    }

    function stopAsking() {
        let newD = new Date();
        let curD = Date.now();
        newD.setFullYear(curD.getFullYear()+1, 6, 1);
        chrome.storage.sync.set({ 'nextDateToAsk' : newD });
    }
})