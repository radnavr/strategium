//GLOBAL
let attacks = 0;

let hits = 0;
let wounds = 0;
let unsaved = null;

let avgResult = 0;

const coef = [0.16667, 0.33334, 0.5, 0.66668, 0.83335];

//ROOT FUNCTION
function getAvgResult() {
    resolveAttacks();
    document.getElementById("resultContainer").style.display = "initial";
    document.getElementById("result").innerHTML = avgResult.toFixed(2) + " * D wounds  on average";
}

//ATTACKS
function resolveAttacks(){
    attacks = document.getElementById("attacks").value;
    let attackSpecifications = document.getElementById("attackSpecifications").value;

    if (attackSpecifications === "not") {
        attacks = attacks;
    } else if (attackSpecifications === "D3") {
        attacks *= 2;
    } else if (attackSpecifications === "D6") {
        attacks *= 3.5;
    } else if (attackSpecifications === "D3 + 3") {
        attacks *= 5.5;
    }

//console.log("attacks: " + attacks);
resolveHits()
}

//HITS
function resolveHits() {
const hitsOn = document.getElementById("hitsOn").value;

const rerollHits = document.getElementById("rerollHits");
const rerollHitsOf1 = document.getElementById("rerollHitsOf1");
const exploding6s = document.getElementById("exploding6s");

    if (rerollHits.checked !== true && rerollHitsOf1.checked !== true) {

        if (hitsOn == 6) {
            avgResult = attacks - (attacks * coef[4]);
        } else if (hitsOn == 5) {
            avgResult = attacks - (attacks * coef[3]);
        } else if (hitsOn == 4) {
            avgResult = attacks - (attacks * coef[2]);
        } else if (hitsOn == 3) {
            avgResult = attacks - (attacks * coef[1]);
        } else if (hitsOn == 2) {
            avgResult = attacks - (attacks * coef[0]);
        }

        hits = avgResult;
    }

    if (rerollHits.checked) {

        if (hitsOn == 6) {
            const hitsReminder6 = attacks * coef[4];
            avgResult = attacks - (hitsReminder6) + (hitsReminder6 * coef[4]);
        } else if (hitsOn == 5) {
            const hitsReminder5 = attacks * coef[3];
            avgResult = attacks - (hitsReminder5) + (hitsReminder5 * coef[3]);
        } else if (hitsOn == 4) {
            const hitsReminder4 = attacks * coef[2];
            avgResult = attacks - (hitsReminder4) + (hitsReminder4 * coef[2]);
        } else if (hitsOn == 3) {
            const hitsReminder3 = attacks * coef[1];
            avgResult = attacks - (hitsReminder3) + (hitsReminder3 * coef[1]);
        } else if (hitsOn == 2) {
            const hitsReminder2 = attacks * coef[0];
            avgResult = attacks - (hitsReminder2) + (hitsReminder2 * coef[0]);
        }

        hits = avgResult;
    }

    if (rerollHitsOf1.checked) {
        const hitRollsOf1 = attacks / 6;

        if (hitsOn == 6) {
            avgResult = attacks - (attacks * coef[4]) + (hitRollsOf1 * coef[4]);
        } else if (hitsOn == 5) {
            avgResult = attacks - (attacks * coef[3]) + (hitRollsOf1 * coef[3]);
        } else if (hitsOn == 4) {
            avgResult = attacks - (attacks * coef[2]) + (hitRollsOf1 * coef[2]);
        } else if (hitsOn == 3) {
            avgResult = attacks - (attacks * coef[1]) + (hitRollsOf1 * coef[1]);
        } else if (hitsOn == 2) {
            avgResult = attacks - (attacks * coef[0]) + (hitRollsOf1 * coef[0]);
        }

        hits = avgResult;
    }

    if (exploding6s.checked) {
        avgResult *= 1.16667;

        hits = avgResult;
    }

//console.log("hits: " + avgResult);
resolveWounds();
}

//WOUNDS
function resolveWounds() {
    var woundsOn = document.getElementById("woundsOn").value; //scope issue (woundsOn variable)
    const hitsOn = document.getElementById("hitsOn").value;

    const plusOneToWound = document.getElementById("plusOneToWound");
    const sixsesAutowound = document.getElementById("sixsesAutowound");
    const rerollWoundsOf1 = document.getElementById("rerollWoundsOf1");

    if (plusOneToWound.checked) { //scope issue (woundsOn variable)
        woundsOn -= 1;
    }

    if (rerollWoundsOf1.checked !== true) {

        if (woundsOn == 6) {
            avgResult = avgResult - (avgResult * coef[4]);
        } else if (woundsOn == 5) {
            avgResult = avgResult - (avgResult * coef[3]);
        } else if (woundsOn == 4) {
            avgResult = avgResult - (avgResult * coef[2]);
        } else if (woundsOn == 3) {
            avgResult = avgResult - (avgResult * coef[1]);
        } else if (woundsOn == 2) {
            avgResult = avgResult - (avgResult * coef[0]);
        }

        wounds = avgResult;
    }

    if (rerollWoundsOf1.checked) {
        const woundRollsOf1 = hits / 6;

        if (woundsOn == 6) {
            avgResult = avgResult - (avgResult * coef[4]) + (woundRollsOf1 * coef[4]);
        } else if (woundsOn == 5) {
            avgResult = avgResult - (avgResult * coef[3]) + (woundRollsOf1 * coef[3]);
        } else if (woundsOn == 4) {
            avgResult = avgResult - (avgResult * coef[2]) + (woundRollsOf1 * coef[2]);
        } else if (woundsOn == 3) {
            avgResult = avgResult - (avgResult * coef[1]) + (woundRollsOf1 * coef[1]);
        } else if (woundsOn == 2) {
            avgResult = avgResult - (avgResult * coef[0]) + (woundRollsOf1 * coef[0]);
        }

        wounds = avgResult;
    }

    if (sixsesAutowound.checked) {
        wounds += hitsOn / 6
    }

    //console.log("wounds: " + wounds)
    resolveSaves();
}

//SAVES
function resolveSaves() {
    const savesOn = document.getElementById("savesOn").value;

    if (savesOn == 6) {
        avgResult = avgResult - (avgResult * coef[0]);
    } else if (savesOn == 5) {
        avgResult = avgResult - (avgResult * coef[1]);
    } else if (savesOn == 4) {
        avgResult = avgResult - (avgResult * coef[2]);
    } else if (savesOn == 3) {
        avgResult = avgResult - (avgResult * coef[3]);
    } else if (savesOn == 2) {
        avgResult = avgResult - (avgResult * coef[4]);
    } else {
        avgResult = avgResult;
    }

        if (savesOn >= 2 && savesOn <= 6) {
            unsaved = avgResult
        }
    
    //console.log("unsaved: " + unsaved);
}

//VISUAL EVENTS

function displayDetails() {
    document.getElementById("infoIcon").classList.toggle("display-details");
    let displayDetails = document.getElementsByClassName("display-details");

    if (displayDetails.length === 1) {

        document.getElementById("hitRollDetails").innerHTML = hits.toFixed(2) + " hits expected";
        document.getElementById("woundRollDetails").innerHTML = wounds.toFixed(2) + " wounds expected";
        
        if (unsaved !== null) {
            document.getElementById("saveRollDetails").innerHTML = unsaved.toFixed(2) + " unsaved wounds expected"
        }

    }

    if (displayDetails.length === 0) {
        document.getElementById("hitRollDetails").innerHTML = "";
        document.getElementById("woundRollDetails").innerHTML = "";
        document.getElementById("saveRollDetails").innerHTML = "";
    }
}


function reset() {
    hits = 0;
    wounds = 0;
    unsaved = null;

    displayDetails();

    document.getElementById("result").innerHTML = "";
    document.getElementById("resultContainer").style.display = "none";

    let filled = document.getElementsByClassName("inp-open");
        for (item of filled) {
            item.value = null;
        }

    let checked = document.getElementsByClassName("dummy-checkbox");
        for (let check of checked) {
            check.classList.remove("dummy-checked");
        }

    let checkboxes = document.getElementsByClassName("vacated-for-dummy");
        for (let checkbox of checkboxes) {
            checkbox.checked = false;
        }
}


//CHECKBOXES
function displayAdvancedOptions() {
    document.getElementById("advancedContainer").style.width = "80vw";
}


function hideAdvancedOptions() {
    document.getElementById("advancedContainer").style.width = "0vw";
}


function rerollHitsDummyCheck() {
    document.getElementById("dummyRerollHits").classList.toggle("dummy-checked");
}


function rerollHitsOf1DummyCheck() {
    document.getElementById("dummyRerollHitsOf1").classList.toggle("dummy-checked");
}


function exploding6sDummyCheck() {
    document.getElementById("dummyExploding6s").classList.toggle("dummy-checked");
}


function sixsesAutowoundDummyCheck() {
    document.getElementById("dummySixsesAutowound").classList.toggle("dummy-checked");
}


function rerollWoundsOf1DummyCheck() {
    document.getElementById("dummyRerollWoundsOf1").classList.toggle("dummy-checked");
}


function plusOneToWoundDummyCheck() {
    document.getElementById("dummyPlusOneToWound").classList.toggle("dummy-checked");
}