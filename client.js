document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("button").addEventListener("click", submit);
    document.getElementById("cleaningbutton").addEventListener("click", clear);
});

function submit() {
    if (checkY() && checkX()) {
        let params = "?x="
        document.getElementsByName("check_boxes").forEach(x => {
            if(x.checked) {
                params += x.value
            }
        })
        params += "&y=" + document.getElementById("y").value.replace(',', '.')
        params += "&r="
        document.getElementsByName("radio_buttons").forEach(r => {
            if(r.checked)
                params += r.value
        })
        let request = new XMLHttpRequest();
        request.open('GET', 'calculator.php' + params);
        request.onreadystatechange = ()  => save_results(request)
        request.send();
    }
}

function save_results(request) {
    if (request.readyState === 4 && request.status === 200) {
        document.querySelector(".result_table").innerHTML = request.responseText;
    }
}

function clear() {
    let clearing_form = new FormData();
    let clearing_request = new XMLHttpRequest();
    clearing_request.open('GET', 'clear.php');
    clearing_request.onreadystatechange = ()  => save_results(clearing_request)
    clearing_request.send(clearing_form);
}

function checkY() {
    let y = document.getElementById("y");
    if (y.value.trim() === "") {
        alert("Y field must be filled!");
        return false;
    }
    let yVal = y.value.replace(',', '.')
    if (!isFinite(yVal)) {
        alert("Y must be a number!");
        return false;
    }
    if (yVal >= 5 || yVal <= -5) {
        alert("Y must be in range: (-5; 5)!");
        return false;
    } else {
        return true;
    }
}

function checkX() {
    let xButtons = document.getElementsByName("check_boxes");
    let checkCounter = 0
    xButtons.forEach(x => {
        if(x.checked)
            checkCounter++
    })
    if(checkCounter >= 2) {
        alert("You must select only one X value!");
        return false
    }
    return true
}