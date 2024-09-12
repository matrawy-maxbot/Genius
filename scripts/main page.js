$(document).on("click", ".book-new-tickets", function (){

    $(".ticket-details-background").addClass("active");
    
});

$(document).on("click", ".cBTN.create_btn", function (){

    
});

$(document).on("click", ".cBTN.cancel_btn", function (){

    $(".ticket-details-background").removeClass("active");
    
});

$(document).on("click", ".patients_info:not(.show) .open_close", function (){

    $(this).parents(".patients_info").addClass("show");

});

$(document).on("click", ".patients_info.show .open_close", function (){

    $(this).parents(".patients_info").removeClass("show");

});

$(document).on("click", ".page-nav .login", function (){

    window.location.href = "/login";

});

$(document).on("click", ".page-nav .logo", function (){

    window.location.href = window.location.protocol + "//" + window.location.host;

});

$(function () {

    setInterval(() => {

        let json = JSON.stringify({
            "select": 1
        });
    
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST",  "./php-data/doctor.php", true);
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send(json);
        xhttp.onreadystatechange = function() {
    
            if (this.readyState == 4 && this.status == 200) {
    
                var result = JSON.parse(this.responseText);
    
                if(result.status == "success"){
    
                    var result = result.result;
                    var me_waiting_patients = result.filter(r => !r.ticket_finished && !r.ticket_entered && r.ticket_depart == "male exam");
                    var fe_waiting_patients = result.filter(r => !r.ticket_finished && !r.ticket_entered && r.ticket_depart == "female exam");
                    var mo_waiting_patients = result.filter(r => !r.ticket_finished && !r.ticket_entered && r.ticket_depart == "male observ");
                    var fo_waiting_patients = result.filter(r => !r.ticket_finished && !r.ticket_entered && r.ticket_depart == "female observ");
                    var tr_waiting_patients = result.filter(r => !r.ticket_finished && !r.ticket_entered && r.ticket_depart == "trauma");
                    var or_waiting_patients = result.filter(r => !r.ticket_finished && !r.ticket_entered && r.ticket_depart == "orthopedic");
                    var ch_waiting_patients = result.filter(r => !r.ticket_finished && !r.ticket_entered && r.ticket_depart == "children");
                    var me_pending_patients = result.filter(r => !r.ticket_finished && r.ticket_entered && r.ticket_depart == "male exam");
                    var fe_pending_patients = result.filter(r => !r.ticket_finished && r.ticket_entered && r.ticket_depart == "female exam");
                    var mo_pending_patients = result.filter(r => !r.ticket_finished && r.ticket_entered && r.ticket_depart == "male observ");
                    var fo_pending_patients = result.filter(r => !r.ticket_finished && r.ticket_entered && r.ticket_depart == "female observ");
                    var tr_pending_patients = result.filter(r => !r.ticket_finished && r.ticket_entered && r.ticket_depart == "trauma");
                    var or_pending_patients = result.filter(r => !r.ticket_finished && r.ticket_entered && r.ticket_depart == "orthopedic");
                    var ch_pending_patients = result.filter(r => !r.ticket_finished && r.ticket_entered && r.ticket_depart == "children");

                    //console.log("mo_pending_patients :", mo_pending_patients);
                    
                    var waiters_ = [me_waiting_patients, fe_waiting_patients, mo_waiting_patients, fo_waiting_patients, tr_waiting_patients, or_waiting_patients, ch_waiting_patients];
                    var pendings_ = [me_pending_patients, fe_pending_patients, mo_pending_patients, fo_pending_patients, tr_pending_patients, or_pending_patients, ch_pending_patients];
                    var main_cards = ["male-exam", "female-exam", "male-observ", "female-observ", "trauma", "orthopedic", "children"];

                    for (let i = 0; i < waiters_.length; i++) {

                        var waiter_e = waiters_[i];
                        var pending_e = pendings_[i];
                        
                        //console.log(pending_e.length);

                        if(pending_e.length == 0){
                            if(waiter_e.length > 0){
                                pendings_[i] = waiter_e[0];
                                waiter_e = waiter_e.filter((v, i) => i !== 0);
                            } else {
                                pendings_[i] = false;
                            }
                        } else {
                            pendings_[i] = pendings_[i][0];
                        }

                        //console.log(pendings_[i]);

                        var num = "00";
    
                        if(pendings_[i] !== false){
        
                            num = pendings_[i].num;
                            
                        }

                        $(".waiting-cards .waiting-card." + main_cards[i] + " .number").text(num);

                    }
    
                } else {
                    console.error("Database error : ", result.error);
                }
    
            }
    
        }

    }, 1000);
    
});