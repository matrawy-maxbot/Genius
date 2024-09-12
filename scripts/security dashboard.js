var department_name = $(".ticket-details-background .first_step .dpts-buttons .dpt-btn[value='Male Examination']");

$(document).on("click", ".book-new-tickets", function (){

    $(".ticket-details-background").addClass("active");
    
});

$(document).on("click", ".second_step .back", function (){

    $(".ticket-details-background .first_step").addClass("active");
    $(".ticket-details-background .second_step").removeClass("active");
    $(".cBTN.create_btn").removeClass("active");

});

$(document).on("click", ".ticket-details-background .first_step .dpts-buttons .dpt-btn", function (){

    department_name = $(this);
    var dpt_en = department_name.children("span.ar").text();
    var dpt_tr = department_name.attr("value");
    $(".dpt-name span.en").text(dpt_en);
    $(".dpt-name span.translated").text(dpt_tr);
    $(".ticket-details-background .first_step").removeClass("active");
    $(".ticket-details-background .second_step").addClass("active");
    $(".cBTN.create_btn").addClass("active");

});

$(document).on("click", ".cBTN.create_btn.active", function (){

    $(".ticket-details-background").removeClass("active");
    $(".ticket-details-background .first_step").addClass("active");
    $(".ticket-details-background .second_step").removeClass("active");
    $(".cBTN.create_btn").removeClass("active");
    var patient_dpt_val = department_name.attr("value");
    var patient_dpt = department_name.children("span.ar").text();
    var patient_dpt_translated = department_name.children("span.eng").text();
    var printer_status = $("#p_status option:selected").text();
    var printer_status_num = $("#p_status option:selected").val();

    let json = JSON.stringify({
        "create": 1,
        "depart": patient_dpt_val,
        "status": printer_status_num
    });

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",  "./php-data/security.php", true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(json);
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            var result = JSON.parse(this.responseText);

            if(result.status !== "success"){
                console.error("Database error : ", result.error);
            } else {

                var t_num = result.result.num;
                var t_waiters_l = result.result.waiting_num;

                $(".printer_page .printer_num").text(t_num);
                $(".printer_page .waiters_num span.w_l").text(t_waiters_l);
                $(".printer_page .printer_dept").html(patient_dpt_translated + "<br><span style=\"font-size:13px\">" + patient_dpt + "</span>");
                $(".printer_page .printer_status span").html(printer_status.replace(/([أ-ي]+\s+[أ-ي]+)/gmi, "<span style=\"font-size: 10px;color: #787878;\">($1)</span>"));
                var date = new Date();
                var time_zone = "AM";
                var time_hours = date.getHours();
                if(time_hours > 12){
                    time_hours = time_hours - 12;
                    time_zone = "PM";
                }
                var date_string = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                var time_string = time_hours + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + time_zone;

                $(".printer_page .printer_date .date").text(date_string);
                $(".printer_page .printer_date .time").text(time_string);
                var prtContent = document.getElementById("patient_reset");
                var WinPrint = window.open('', '', 'left=100,top=100,width=800,height=700,toolbar=0,scrollbars=0,status=0');
                WinPrint.document.write(prtContent.outerHTML);
                WinPrint.document.close();
                function waitForElement(querySelector, timeout){
                    return new Promise((resolve, reject)=>{
                        var timer = false;
                        if(WinPrint.document.querySelectorAll(querySelector).length) return resolve();
                        const observer = new MutationObserver(()=>{
                            if(WinPrint.document.querySelectorAll(querySelector).length){
                            observer.disconnect();
                            if(timer !== false) clearTimeout(timer);
                            return resolve();
                            }
                        });
                        observer.observe(WinPrint.document.body, {
                            childList: true, 
                            subtree: true
                        });
                        if(timeout) timer = setTimeout(()=>{
                            observer.disconnect();
                            reject();
                        }, timeout);
                    });
                }
                waitForElement("img", 3000).then(function(){
                    setTimeout(() => {
                        WinPrint.focus();
                        WinPrint.print();
                        WinPrint.close();
                    }, 1000);
                }).catch(()=>{
                    WinPrint.focus();
                    WinPrint.print();
                    WinPrint.close();
                });

            }

        }

    }
    
});

$(document).on("click", ".cBTN.cancel_btn", function (){

    $(".ticket-details-background").removeClass("active");
    $(".ticket-details-background .first_step").addClass("active");
    $(".ticket-details-background .second_step").removeClass("active");
    $(".cBTN.create_btn").removeClass("active");
    
});

$(document).on("click", ".patients_info:not(.show) .open_close", function (){

    $(this).parents(".patients_info").addClass("show");

});

$(document).on("click", ".patients_info.show .open_close", function (){

    $(this).parents(".patients_info").removeClass("show");

});

$(document).on("click", ".page-nav .logo", function (){

    window.location.href = window.location.protocol + "//" + window.location.host;

});

$(function () {

    $(".patients_info").addClass("show");

    function diff_date(first_date, second_date) {
        var current_time = first_date - second_date;
        var hours_b = current_time/1000/60/60;
        var hours = Math.floor(hours_b);
        var minutes_b = (hours_b - hours) * 60;
        var minutes = Math.floor(minutes_b);
        var seconds = Math.floor((minutes_b - minutes) * 60);
        return {
            "hours":hours,
            "minutes":minutes,
            "seconds":seconds
        };
    }

    function fromNow(date) {
        var current_time = new Date() - date;
        var days_b = current_time/1000/60/60/24;
        var days = Math.floor(days_b);
        var hours_b = (days_b - days) * 24;
        var hours = Math.floor(hours_b);
        var minutes_b = (hours_b - hours) * 60;
        var minutes = Math.floor(minutes_b);
        var seconds = Math.floor((minutes_b - minutes) * 60);
        return {
            "days":days,
            "hours":hours,
            "minutes":minutes,
            "seconds":seconds
        };
    }

    const departments_translated = {
        "male exam":"كشف رجال",
        "female exam":"كشف نساء",
        "male observ":"حالات رجال",
        "female observ":"حالات نساء",
        "trauma":"غرفة الصدمات",
        "orthopedic":"جراحة وعظام",
        "children":"اطفال"
    };

    setInterval(() => {

        let json = JSON.stringify({
            "select": 1
        });
    
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST",  "./php-data/security.php", true);
        xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhttp.send(json);
        xhttp.onreadystatechange = function() {
    
            if (this.readyState == 4 && this.status == 200) {
    
                var result = JSON.parse(this.responseText);
    
                if(result.status == "success"){
    
                    var result = result.result;
                    var waiting_patients = result.filter(r => !r.ticket_finished && !r.ticket_entered);
                    var finished_patients = result.filter(r => r.ticket_finished);
                    var pending_patients = result.filter(r => !r.ticket_finished && r.ticket_entered);
                    
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

                    var pendings_array = [];

                    var pending_ticket_html = "";

                    for (let i = 0; i < waiters_.length; i++) {

                        var waiter_e = waiters_[i];
                        var pending_e = pendings_[i];

                        if(pending_e.length == 0){
                            if(waiter_e.length > 0){
                                pendings_[i] = waiter_e[0];
                                var date = new Date();
                                date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                                pendings_[i].ticket_entered = date;
                                
                                let json2 = JSON.stringify({
                                    "update": 1,
                                    "id": pendings_[i].id,
                                    "num": pendings_[i].num,
                                    "complete": 0,
                                    "ticket_created": pendings_[i].ticket_created,
                                    "ticket_entered": date,
                                    "ticket_finished": pendings_[i].ticket_finished
                                });
                            
                                var xhttp2 = new XMLHttpRequest();
                                xhttp2.open("POST",  "./php-data/security.php", true);
                                xhttp2.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                                xhttp2.send(json2);
                                xhttp2.onreadystatechange = function() {
                            
                                    if (this.readyState == 4 && this.status == 200) {
        
                                    }
        
                                }
                            } else {
                                pendings_[i] = false;
                            }
                        } else {
                            pendings_[i] = pendings_[i][0];
                        }
    
                        if(pendings_[i] !== false){

                            pendings_array.push(pendings_[i]);
        
                            var num = pendings_[i].num;

                            var id = pendings_[i].id;
                            var num = pendings_[i].num;
                            var dpt = departments_translated[pendings_[i].ticket_depart];
                            var status = pendings_[i].ticket_status;

                            if(status == 1){
        
                                pending_ticket_html = pending_ticket_html + `<div id="${id}" class="patient-book">
                                <div class="book-info">
                                    <div class="circle purple"></div>
                                    <div class="book-num purple">${num}</div>
                                </div>
                                <div class="book-type">${dpt}</div>
                                <div class="running"><img src="images/sand-clock.png" alt="..."></div>
                            </div>`;
        
                            } else if(status == 2){
        
                                pending_ticket_html = pending_ticket_html + `<div id="${id}" class="patient-book">
                                <div class="book-info">
                                    <div class="circle red"></div>
                                    <div class="book-num red">${num}</div>
                                </div>
                                <div class="book-type">${dpt}</div>
                                <div class="running"><img src="images/sand-clock.png" alt="..."></div>
                            </div>`;
        
                            } else if(status == 3){
        
                                pending_ticket_html = pending_ticket_html + `<div id="${id}" class="patient-book">
                                <div class="book-info">
                                    <div class="circle yellow"></div>
                                    <div class="book-num yellow">${num}</div>
                                </div>
                                <div class="book-type">${dpt}</div>
                                <div class="running"><img src="images/sand-clock.png" alt="..."></div>
                            </div>`;
                                
                            } else if(status == 4){
        
                                pending_ticket_html = pending_ticket_html + `<div id="${id}" class="patient-book">
                                <div class="book-info">
                                    <div class="circle green"></div>
                                    <div class="book-num green">${num}</div>
                                </div>
                                <div class="book-type">${dpt}</div>
                                <div class="running"><img src="images/sand-clock.png" alt="..."></div>
                            </div>`;
                                
                            } else {
        
                                pending_ticket_html = pending_ticket_html + `<div id="${id}" class="patient-book">
                                <div class="book-info">
                                    <div class="circle blue"></div>
                                    <div class="book-num blue">${num}</div>
                                </div>
                                <div class="book-type">${dpt}</div>
                                <div class="running"><img src="images/sand-clock.png" alt="..."></div>
                            </div>`;
        
                            }
                            
                        }

                    }

                    waiting_patients = waiting_patients.filter( function( el ) {
                        return !pendings_array.includes( el );
                    });
    
                    if(finished_patients.length > 0){
                        finished_patients.sort((a, b) => {
                            return new Date(b.ticket_finished) - new Date(a.ticket_finished);
                        });
                    }
    
                    if(waiting_patients.length > 0){
                        waiting_patients.sort((a, b) => {
                            return new Date(a.ticket_status) - new Date(b.ticket_status);
                        });
                    }
    
                    $(".patients_info:not(.finished) .content .head span.number").text(waiting_patients.length);
                    $(".patients_info.finished .content .head span.number").text(finished_patients.length);
    
                    var dang_tickets = waiting_patients.filter(wp => wp.ticket_status == 1);
                    var first_tickets = waiting_patients.filter(wp => wp.ticket_status == 2);
                    var second_tickets = waiting_patients.filter(wp => wp.ticket_status == 3);
                    var third_tickets = waiting_patients.filter(wp => wp.ticket_status == 4);
                    var fourth_tickets = waiting_patients.filter(wp => wp.ticket_status == 5);
    
                    var dang_waiters_html = "";

                    dang_tickets.forEach(wp => {
    
                        var id = wp.id;
                        var num = wp.num;
                        var dpt = departments_translated[wp.ticket_depart];
    
                        dang_waiters_html = dang_waiters_html + `<div ticket-id="${id}" ticket-num="${num}" class="patient-book">
                        <div class="book-info">
                            <div class="circle purple"></div>
                            <div class="book-num purple">${num}</div>
                        </div>
                        <div class="book-type">${dpt}</div>
                        <div class="delete"><i class="fas fa-trash"></i></div>
                    </div>`;
    
                    });

                    var first_waiters_html = "";
    
                    first_tickets.forEach(wp => {
    
                        var id = wp.id;
                        var num = wp.num;
                        var dpt = departments_translated[wp.ticket_depart];
    
                        first_waiters_html = first_waiters_html + `<div ticket-id="${id}" ticket-num="${num}" class="patient-book">
                        <div class="book-info">
                            <div class="circle red"></div>
                            <div class="book-num red">${num}</div>
                        </div>
                        <div class="book-type">${dpt}</div>
                        <div class="delete"><i class="fas fa-trash"></i></div>
                    </div>`;
    
                    });
    
                    var secons_waiters_html = "";
    
                    second_tickets.forEach(wp => {
    
                        var id = wp.id;
                        var num = wp.num;
                        var dpt = departments_translated[wp.ticket_depart];
    
                        secons_waiters_html = secons_waiters_html + `<div ticket-id="${id}" ticket-num="${num}" class="patient-book">
                        <div class="book-info">
                            <div class="circle yellow"></div>
                            <div class="book-num yellow">${num}</div>
                        </div>
                        <div class="book-type">${dpt}</div>
                        <div class="delete"><i class="fas fa-trash"></i></div>
                    </div>`;
    
                    });
    
                    var third_waiters_html = "";
    
                    third_tickets.forEach(wp => {
    
                        var id = wp.id;
                        var num = wp.num;
                        var dpt = departments_translated[wp.ticket_depart];
    
                        third_waiters_html = third_waiters_html + `<div ticket-id="${id}" ticket-num="${num}" class="patient-book">
                        <div class="book-info">
                            <div class="circle green"></div>
                            <div class="book-num green">${num}</div>
                        </div>
                        <div class="book-type">${dpt}</div>
                        <div class="delete"><i class="fas fa-trash"></i></div>
                    </div>`;
    
                    });
    
                    var fourth_waiters_html = "";
    
                    fourth_tickets.forEach(wp => {
    
                        var id = wp.id;
                        var num = wp.num;
                        var dpt = departments_translated[wp.ticket_depart];
    
                        fourth_waiters_html = fourth_waiters_html + `<div ticket-id="${id}" ticket-num="${num}" class="patient-book">
                        <div class="book-info">
                            <div class="circle blue"></div>
                            <div class="book-num blue">${num}</div>
                        </div>
                        <div class="book-type">${dpt}</div>
                        <div class="delete"><i class="fas fa-trash"></i></div>
                    </div>`;
    
                    });
    
                    $(".patients_info:not(.finished) .content .patients-books .books-dpt.dang-books").html(dang_waiters_html);
                    $(".patients_info:not(.finished) .content .patients-books .books-dpt.first-books").html(first_waiters_html);
                    $(".patients_info:not(.finished) .content .patients-books .books-dpt.second-books").html(secons_waiters_html);
                    $(".patients_info:not(.finished) .content .patients-books .books-dpt.third-books").html(third_waiters_html);
                    $(".patients_info:not(.finished) .content .patients-books .books-dpt.fourth-books").html(fourth_waiters_html);
    
                    finished_tickets_html = "";
    
                    finished_patients.forEach(fp => {
    
                        var id = fp.id;
                        var num = fp.num;
                        var dpt = departments_translated[fp.ticket_depart];
                        var status = fp.ticket_status;
                        var f_date = fromNow(new Date(fp.ticket_finished));
                        if(f_date.days > 0){
                            f_date = f_date.days + " days";
                        } else if(f_date.hours > 0){
                            f_date = f_date.hours + " hours";
                        } else if(f_date.minutes > 0){
                            f_date = f_date.minutes + " minutes";
                        } else if(f_date.seconds > 0){
                            f_date = f_date.seconds + " seconds";
                        } else {
                            f_date = "moments";
                        }
    
                        if(status == 1){
    
                            finished_tickets_html = finished_tickets_html + `<div id="${id}" class="patient-book">
                            <div class="book-info">
                                <div class="circle purple"></div>
                                <div class="book-num purple">${num}</div>
                            </div>
                            <div class="book-type">${dpt}</div>
                            <div class="date">${f_date} ago</div>
                        </div>`;
    
                        } else if(status == 2){
    
                            finished_tickets_html = finished_tickets_html + `<div id="${id}" class="patient-book">
                            <div class="book-info">
                                <div class="circle red"></div>
                                <div class="book-num red">${num}</div>
                            </div>
                            <div class="book-type">${dpt}</div>
                            <div class="date">${f_date} ago</div>
                        </div>`;
    
                        } else if(status == 3){
    
                            finished_tickets_html = finished_tickets_html + `<div id="${id}" class="patient-book">
                            <div class="book-info">
                                <div class="circle yellow"></div>
                                <div class="book-num yellow">${num}</div>
                            </div>
                            <div class="book-type">${dpt}</div>
                            <div class="date">${f_date} ago</div>
                        </div>`;
                            
                        } else if(status == 4){
    
                            finished_tickets_html = finished_tickets_html + `<div id="${id}" class="patient-book">
                            <div class="book-info">
                                <div class="circle green"></div>
                                <div class="book-num green">${num}</div>
                            </div>
                            <div class="book-type">${dpt}</div>
                            <div class="date">${f_date} ago</div>
                        </div>`;
                            
                        } else {
    
                            finished_tickets_html = finished_tickets_html + `<div id="${id}" class="patient-book">
                            <div class="book-info">
                                <div class="circle blue"></div>
                                <div class="book-num blue">${num}</div>
                            </div>
                            <div class="book-type">${dpt}</div>
                            <div class="date">${f_date} ago</div>
                        </div>`;
    
                        }
    
                    });
    
                    $(".patients_info.finished .content .patients-books .books-dpt").html(finished_tickets_html);
    
                    $(".patients_info.finished .content .patients-books .books-dpt").prepend(pending_ticket_html);

                } else {
                    console.error("Database error : ", result.error);
                }
    
            }
    
        }

    }, 1000);
    
});

$(document).on("click", ".patients_info:not(.finished) .content .patients-books .books-dpt .patient-book .delete", function (){

    var parent = $(this).parent();
    var ticketID = parent.attr("ticket-id");
    var ticketNUM = parent.attr("ticket-num");

    let json3 = JSON.stringify({
        "delete": 1,
        "id": ticketID,
        "num": ticketNUM
    });

    var xhttp3 = new XMLHttpRequest();
    xhttp3.open("POST",  "./php-data/security.php", true);
    xhttp3.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp3.send(json3);
    xhttp3.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            parent.remove();

        }

    }

});

$(document).on("click", ".page-nav .logout", function (){

    document.cookie = "login_id='false'; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";

});