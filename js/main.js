var users = getDataLocalStorage();
printCards();

document.querySelector('#registerManager').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      saveRegister();
    }
});


function getDataLocalStorage(){

    var dataSaved = localStorage.getItem('users_list');

    if(dataSaved == null){
        return [];
    }
    else{
        return JSON.parse(localStorage.getItem('users_list'));
    }
}

function saveDataOnLocalStorage(){
    localStorage.setItem('users_list', JSON.stringify(users));
}

function saveRegister(){    
    var form = document.getElementById("form_user");

    var name = form.name;
    var url = form.url;
    var date = form.date;
    var remember = form.remember.checked;

    if(validation(name, date)){
        addJSONItem(name.value, url.value, date.value, remember);
        hideModal();
        printCards();
        saveDataOnLocalStorage();
    }
    
}

function validation(name, date){
    var validForm = true;
 
    if(name.value.length < 3){
        validForm = false;
        name.classList.add("error");
    }


    /*
    VALIDAÇÃO URL

    if(!validURL(url.value)) {
        validForm = false;
        url.classList.add("error");
    }

    function validURL(url){
        regexp =  /^(?:(?:https?):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(url))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    */

    if(date.value.length == 0 ){
        validForm = false;
        date.classList.add("error");
    }

    setTimeout(function(){
        name.classList.remove("error");
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

