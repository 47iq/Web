document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("button").addEventListener("click", submit);
});

function submit() {
    if (checkY() && checkX()) {
        let xButtons = document.getElementsByName("check_boxes");
        let params = "?x="
        xButtons.forEach(x => {
            if(x.checked) {
                params += x.value
            }
        })
        let y = document.getElementById("y").value;
        params += "&y=" + y.replace(',', '.')
        let rButtons = document.getElementsByName("radio_buttons");
        params += "&r="
        rButtons.forEach(r => {
            if(r.checked)
                params += r.value
        })
        let request = new XMLHttpRequest();
        request.open('GET', 'calculator.php' + params);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                document.querySelector(".result_table").innerHTML = request.responseText;
            }
        }
        request.send();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cleaningbutton").addEventListener("click", clean);
});

function clean() {
    let cleaningform = new FormData();
    let cleaningrequest = new XMLHttpRequest();
    cleaningrequest.open('GET', 'clear.php');
    cleaningrequest.onreadystatechange = function () {
        if (cleaningrequest.readyState === 4 && cleaningrequest.status === 200) {
            document.querySelector(".result_table").innerHTML = cleaningrequest.responseText;
        }
    }
    cleaningrequest.send(cleaningform);
}

function checkY() {
    let y = document.getElementById("y");
    if (y.value.trim() === "") {
        alert("Y field must be filled!");
        return false;
    } else if (!isFinite(y.value.replace(',', '.'))) {
        alert("Y must be a number!");
    } else if (y.value.replace(',', '.') >= 5 || y.value.replace(',', '.') <= -5) {
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
        return  false
    }
    return true
}