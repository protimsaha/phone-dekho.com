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
// load phone detail data
const loadDetail = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetail(data.data))
}
// show detail data on UI
const showDetail = detail => {
    console.log(detail)

    let phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = ''

    let mainFeature = detail.mainFeatures

    let sensors = mainFeature.sensors;
    let others = detail.others
    console.log(others)

    let div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
        <img src="${detail.image}" class="w-75 mx-auto card-img-top" alt="...">
        <div class="card-body">

        
        
        <h3 class="card-title">${detail.name}</h3> 
        <h5>Realease Date-${detail.releaseDate ? detail.releaseDate : 'No result found'}</h5>
        <h6>Mainfeatures</h6>
        <p>Chipset-${mainFeature.chipSet ? mainFeature.chipSet : 'No result found'}</p>
        <p>Display-${mainFeature.displaySize ? mainFeature.displaySize : 'No result found'}</p>
        <p>Memory-${mainFeature.memory ? mainFeature.memory : 'No result found'}</p>  
        <h6>Sensors</h6>
        <p>${sensors ? sensors : 'No result found'}</p>

        <h6>Others</h6>
       
            <p>Bluetooth: ${others?.Bluetooth ? others?.Bluetooth : 'Not available'}</p>
            <p>GPS: ${others?.GPS ? others?.GPS : 'Not available'}</p>
            <p>NFC: ${others?.NFC ? others?.NFC : 'Not available'}</p>
            <p>Radio: ${others?.Radio ? others?.Radio : 'Not available'}</p>
            <p>USB: ${others?.USB ? others?.USB : 'Not available'}</p>
            <p>WLAN: ${others?.WLAN ? others?.WLAN : 'Not available'}</p>
        
        
        
      
        </div>
        `
    phoneDetail.appendChild(div)


}