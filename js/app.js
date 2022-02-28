// spinnerShow
const toggleSpinner = display => {
    document.getElementById('spinner').style.display = display
}
// no phone found
const toggleMessage = displayMessage => {
    document.getElementById('result-null').style.display = displayMessage
}

// search phones
const loadPhones = () => {

    toggleSpinner('block')

    const searchBox = document.getElementById('search-box')
    const searchText = searchBox.value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showResult(data.data))
}

// show search result
const showResult = phones => {
    console.log(phones)

    const showResultDisplay = document.getElementById('show-result');
    showResult.textContent = '';

    if (phones.length == 0) {
        toggleMessage('block');
        toggleSpinner('none');
    }
    else if (document.getElementById('search-box').value == '') {
        toggleMessage('block');
        toggleSpinner('none');
    }
    else {

        phones?.forEach(phone => {
            console.log(phone)

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="col">
            <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h4 class="card-title">Model name-${phone.phone_name}</h4>                   
            <h5>Brand-${phone.brand}</h5>
            </div>
            </div>
            </div>
            `
            showResultDisplay.appendChild(div)
        })
        toggleSpinner('none')
    }
}
