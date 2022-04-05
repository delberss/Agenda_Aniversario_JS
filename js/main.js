var users = [];

document.querySelector('#registerManager').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      saveRegister();
    }
});

function saveRegister(){    
    var form = document.getElementById("form_user");

    var name = form.name;
    var url = form.url;
    var date = form.date;
    var remember = form.remember.checked;

    if(validation(name, url, date)){
        addJSONItem(name.value, url.value, date.value, remember);
        hideModal();
        printCards();
    }
    
}

function validation(name, url, date){
    var validForm = true;
 
    if(name.value.length < 3){
        validForm = false;
        name.classList.add("error");
    }

    if(url.value.length == 0){
        validForm = false;
        url.classList.add("error");
    }

    if(date.value.length == 0 ){
        validForm = false;
        date.classList.add("error");
    }

    setTimeout(function(){
        name.classList.remove("error");
        url.classList.remove("error");
        date.classList.remove("error");
        
    }, 2000)

    return validForm;

}

function hideModal(){
    var modal = $('#registerManager');
    modal.modal('hide');
}


function addJSONItem(name, url, date, remember){
    var jSON = {
        name: name,
        url: url,
        date: date,
        remember: remember
    };
    users.push(jSON);
}

function printCards(){
    var containerRegisters = document.getElementById('containerRegisters');
    containerRegisters.innerHTML = '';

    for(var itemUser=0; itemUser < users.length; itemUser++){
        var elementJSON = users[itemUser];
        var cardElement = createCardElement(elementJSON);
        containerRegisters.appendChild(cardElement);
    }
}

function createCardElement(elementJSON){
    var containerCards = document.createElement('div');
    containerCards.classList.add('col-md-4');

    var divCard = document.createElement('div');
    divCard.classList.add('card');
    divCard.style.width = '18rem';

    var imgCard = document.createElement('img');
    imgCard.classList.add('card-img-top');
    imgCard.src= elementJSON.url;
    imgCard.alt= "";

    var divCardBody = document.createElement('div');
    divCardBody.classList.add('card-body');
    divCardBody.classList.add('text-center');

    var cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerHTML = elementJSON.name;

    var cardBirthday = document.createElement('a');
    cardBirthday.classList.add('btn');
    cardBirthday.classList.add('btn-primary');
    cardBirthday.innerHTML = elementJSON.date;


    containerCards.appendChild(divCard);
    divCard.appendChild(imgCard);
    divCard.appendChild(divCardBody);
    divCardBody.appendChild(cardTitle);
    divCardBody.appendChild(cardBirthday);

    return containerCards;
}

