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

    let searchBox = document.getElementById('search-box')
    let searchText = searchBox.value;
    if (document.getElementById('search-box').value == '') {
        toggleMessage('block');
        toggleSpinner('none');
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => showResult(data.data))
    }
    searchBox.value = ''
}

// show search result
const showResult = phones => {

    // show field
    const showResultDisplay = document.getElementById('show-result');
    showResultDisplay.textContent = '';

    if (phones.length == 0) {
        toggleMessage('block');
        toggleSpinner('none');
    }
    else {

        phones?.forEach(phone => {
            console.log(phone)

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="col">
            <div class="card h-100 ">
            <img class="w-75 mx-auto" src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h4 class="card-title">Model name-${phone.phone_name}</h4>                   
            <h5>Brand-${phone.brand}</h5>
            <button onclick="loadDetail('${phone.slug}')" class="btn btn-info  end-0">Detail</button>
            </div>
            </div>
            </div>
            `
            showResultDisplay.appendChild(div)
        })

        toggleSpinner('none');
        toggleMessage('none');
    }
}
const loadDetail = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
}