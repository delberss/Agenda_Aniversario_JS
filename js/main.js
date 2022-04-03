function saveRegister(){    
    var form = document.getElementById("form_user");

    var name = form.name;
    var url = form.url;
    var date = form.date;
    var remember = form.remember.checked;

    hideModal();
}

function hideModal(){
    var modal = $('#registerManager');
    modal.modal('hide');
}
