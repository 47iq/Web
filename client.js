document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("button").addEventListener("click", submit)
    document.getElementById("cleaning_button").addEventListener("click", () => send_request('GET', 'clear.php'))
});

function submit() {
    if (checkY() && checkX()) {
        let params = "?x="
        document.getElementsByName("check_boxes").forEach(x => {
            if (x.checked) {
                params += x.value
            }
        })
        params += "&y=" + parseFloat(document.getElementById("y").value.substring(0, 12).replace(',', '.'))
        params += "&r="
        document.getElementsByName("radio_buttons").forEach(r => {
            if (r.checked)
                params += r.value
        })
        send_request('GET', 'calculator.php', params)
    }
}

function checkY() {
    let y = document.getElementById("y")
    if (y.value.trim() === "") {
        alert("Y field must be filled!")
        return false;
    }
    let yVal = y.value.replace(',', '.').substring(0, 12)
    if (!isFinite(yVal)) {
        alert("Y must be a number!")
        return false;
    }
    if (yVal >= 5 || yVal <= -5) {
        alert("Y must be in range: (-5; 5)!")
        return false
    } else {
        return true
    }


}

function checkX() {
    let xButtons = document.getElementsByName("check_boxes")
    let checkCounter = 0
    xButtons.forEach(x => {
        if (x.checked)
            checkCounter++
    })
    if (checkCounter >= 2) {
        alert("You must select only one X value!")
        return false
    } else if (checkCounter === 0) {
        alert("You must select the X value!")
        return false
    }
    return true
}

function send_request(method, url, params = '') {
    new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(method, url + params)
        xhr.onload = () => {
            if (xhr.status >= 400)
                reject()
            else
                resolve(xhr)
        }
        xhr.onerror = () => {
            reject(xhr)
        }
        xhr.send();
    }).then(xhr => {
        let response = xhr.responseText
        if (response !== "")
            document.querySelector(".result_table").innerHTML = response
        else
            alert("Error in the request")
    }).catch((xhr) => {
        if(xhr.status === 400)
            alert("Error in the request")
        else
            alert("Unknown Error")
    })
}