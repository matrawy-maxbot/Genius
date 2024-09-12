const snd = new Audio("file.wav");
snd.play();

$(document).on("click", ".book-new-tickets", function (){

    $(".ticket-details-background").addClass("active");
    
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

    let json = JSON.stringify({
        "check": 1,
        "id": getCookie("login_id")
    });

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",  "./php-data/login.php", true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp.send(json);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var result = JSON.parse(this.responseText);
            const doctor_depart = result["result"]["depart"];

            console.log(doctor_depart);

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
                xhttp.open("POST",  "./php-data/doctor.php", true);
                xhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhttp.send(json);
                xhttp.onreadystatechange = function() {
            
                    if (this.readyState == 4 && this.status == 200) {
            
                        var result = JSON.parse(this.responseText);
            
                        if(result.status == "success"){
            
                            var result = result.result.filter(r => r.ticket_depart == doctor_depart);
                            var waiting_patients = result.filter(r => !r.ticket_finished && !r.ticket_entered);
                            var finished_patients = result.filter(r => r.ticket_finished);
                            var pending_patients = result.filter(r => !r.ticket_finished && r.ticket_entered);
                            
                            if(pending_patients.length == 0){
                                if(waiting_patients.length > 0){
                                    pending_patients = waiting_patients[0];
                                    waiting_patients = waiting_patients.filter((v, i) => i !== 0);
                                    var date = new Date();
                                    date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                                    pending_patients.ticket_entered = date;
                                    
                                    let json2 = JSON.stringify({
                                        "update": 1,
                                        "id": pending_patients.id,
                                        "num": pending_patients.num,
                                        "complete": 0,
                                        "ticket_created": pending_patients.ticket_created,
                                        "ticket_entered": date,
                                        "ticket_finished": pending_patients.ticket_finished
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
                                    pending_patients = false;
                                }
                            } else {
                                pending_patients = pending_patients[0];
                            }
            
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
            
                            if(pending_patients !== false){
            
                                var id = pending_patients.id;
                                var num = pending_patients.num;
                                var dpt = departments_translated[pending_patients.ticket_depart];
                                var status = pending_patients.ticket_status;
        
                                var pending_ticket_html = "";
        
                                if(status == 1){
            
                                    pending_ticket_html = `<div id="${id}" class="patient-book">
                                    <div class="book-info">
                                        <div class="circle purple"></div>
                                        <div class="book-num purple">${num}</div>
                                    </div>
                                    <div class="book-type">${dpt}</div>
                                    <div class="running"><img src="images/sand-clock.png" alt="..."></div>
                                </div>`;
            
                                } else if(status == 2){
            
                                    pending_ticket_html = `<div id="${id}" class="patient-book">
                                    <div class="book-info">
                                        <div class="circle red"></div>
                                        <div class="book-num red">${num}</div>
                                    </div>
                                    <div class="book-type">${dpt}</div>
                                    <div class="running"><img src="images/sand-clock.png" alt="..."></div>
                                </div>`;
            
                                } else if(status == 3){
            
                                    pending_ticket_html = `<div id="${id}" class="patient-book">
                                    <div class="book-info">
                                        <div class="circle yellow"></div>
                                        <div class="book-num yellow">${num}</div>
                                    </div>
                                    <div class="book-type">${dpt}</div>
                                    <div class="running"><img src="images/sand-clock.png" alt="..."></div>
                                </div>`;
                                    
                                } else if(status == 4){
            
                                    pending_ticket_html = `<div id="${id}" class="patient-book">
                                    <div class="book-info">
                                        <div class="circle green"></div>
                                        <div class="book-num green">${num}</div>
                                    </div>
                                    <div class="book-type">${dpt}</div>
                                    <div class="running"><img src="images/sand-clock.png" alt="..."></div>
                                </div>`;
                                    
                                } else {
            
                                    pending_ticket_html = `<div id="${id}" class="patient-book">
                                    <div class="book-info">
                                        <div class="circle blue"></div>
                                        <div class="book-num blue">${num}</div>
                                    </div>
                                    <div class="book-type">${dpt}</div>
                                    <div class="running"><img src="images/sand-clock.png" alt="..."></div>
                                </div>`;
            
                                }
                                $(".patients_info.finished .content .patients-books .books-dpt").prepend(pending_ticket_html);
            
                                $(".running_book .book-info").attr("ticket-id", pending_patients.id).attr("ticket-num", pending_patients.num);
                
                                $(".running_book .book-info").text(pending_patients.num + " ~ " + departments_translated[pending_patients.ticket_depart]);
        
                                var ddate = diff_date(new Date(), new Date(pending_patients.ticket_entered));
                                $(".running_book .book-time").html((ddate.hours.toString().length == 1 ? "0" + ddate.hours.toString() : ddate.hours.toString()) + "<span class=\"block\">:</span>" + (ddate.minutes.toString().length == 1 ? "0" + ddate.minutes.toString() : ddate.minutes.toString()) + "<span class=\"block\">:</span>" + (ddate.seconds.toString().length == 1 ? "0" + ddate.seconds.toString() : ddate.seconds.toString()));
            
                            } else {
                                $(".running_book .book-info").text("__" + " ~ " + "___________");
                                $(".running_book .book-time").html("00" + "<span class=\"block\">:</span>" + "00" + "<span class=\"block\">:</span>" + "00");
                            }
            
                        } else {
                            console.error("Database error : ", result.error);
                        }
            
                    }
            
                }
        
            }, 1000);

        }
    }
    
});

$(document).on("click", ".running_book .book-complete-btn", function (){

    var ticketID = $(".running_book .book-info").attr("ticket-id");
    var ticketNUM = $(".running_book .book-info").attr("ticket-num");

    var date = new Date();
    date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    let json3 = JSON.stringify({
        "update": 1,
        "id": ticketID,
        "num": ticketNUM,
        "complete": 1,
        "ticket_finished": date
    });

    var xhttp3 = new XMLHttpRequest();
    xhttp3.open("POST",  "./php-data/security.php", true);
    xhttp3.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhttp3.send(json3);
    xhttp3.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            $(".running_book .book-info").text("__" + " ~ " + "___________");
            $(".running_book .book-time").html("00" + "<span class=\"block\">:</span>" + "00" + "<span class=\"block\">:</span>" + "00");

        }

    }

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

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
        c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
    }
    }
    return "";
}

$(document).on("click", "#ex1-play", function (){

    var sound = new Howl({
        src: ['/images/audio/sound.wav']
    });
    sound.stop().play();

});