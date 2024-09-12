<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/security dashboard.css">
    <title>Security Dashboard</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha384-xBuQ/xzmlsLoJpyjoggmTEz8OWUFM0/RC5BsqQBDX2v5cMvDHcMakNTNrHIW2I5f" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>

</head>
<body>

    <div class="background-cover"></div>
    <img class="page-background" src="images/background9.png">
    <div class="line-loop"></div>

    <div class="page-nav">
        <div class="logo">
            <img src="images/logo.jpeg">
            <div class="logo-name">
                <span class="n1">مستشفى</span>
                <br>
                <span class="n2">الحــيــــــــــــــــــــــــاة</span>
            </div>
        </div>
        <div class="logout">
            <span>Log out</span>
        </div>
    </div>

    <div class="btn-create-parent">
        <div class="book-new-tickets">
            <img class="btn-background" src="images/lines-design.png">
            <span>حجز موعد جديد</span>
        </div>
        <div class="book-ticket-title"></div>
    </div>

    <div class="ticket-details-background">
        <div class="ticket-details-parent">
            <div class="box-ticket-details">
                <img class="btn-background" src="images/lines-design.png">
                <div class="first_step active">
                    <label class="form-label">اختر نوع الحالة المرضية</label>
                    <div class="dpts-buttons">
                        <div class="dpt-btn" value="male exam"><span class="eng">Male Examination</span><span class="ar">كشف رجال</span></div>
                        <div class="dpt-btn" value="female exam"><span class="eng">Female Examination</span><span class="ar">كشف نساء</span></div>
                        <div class="dpt-btn" value="male observ"><span class="eng">Male Observation</span><span class="ar">حالات رجال</span></div>
                        <div class="dpt-btn" value="female observ"><span class="eng">Female Observation</span><span class="ar">حالات نساء</span></div>
                        <div class="dpt-btn" value="trauma"><span class="eng">Trauma Room</span><span class="ar">غرفة الصدمات</span></div>
                        <div class="dpt-btn" value="orthopedic"><span class="eng">Orthopedic - ER</span><span class="ar">جراحة وعظام</span></div>
                        <div class="dpt-btn" value="children"><span class="eng">Children</span><span class="ar">اطفال</span></div>
                    </div>
                </div>
                <div class="second_step">
                    <div class="back"><svg viewBox="0 0 512 512"><path d="M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z"/></svg></div>
                    <label class="form-label">اختر مستوى حالة المريض</label>
                    <select class="form-select form-select-lg mb-3" id="p_status" aria-label=".form-select-lg example">
                        <option style="color: #ae37cf;" value="1" selected>1 <span>Resuscitation</span></option>
                        <option style="color: #ff0404;" value="2">2 <span>Emergency</span></option>
                        <option style="color: #cd8804;" value="3">3 <span>Urgency</span></option>
                        <option style="color: #1ca360;" value="4">4 <span>Less Urgency</span></option>
                        <option style="color: #4870b3;" value="5">5 <span>Non Urgency</span></option>
                    </select>
                    <div class="dpt-name"><span class="en">Pediatrician</span> <span class="translated">اطفال</span></div>
                </div>
            </div>
            <div class="create_t_btns">
                <div class="create_btn cBTN"><span>حجز</span></div>
                <div class="cancel_btn cBTN"><span>الغاء</span></div>
            </div>
        </div>
    </div>

    <div class="patients_info">
        <div class="open_close">
            <span><span>O</span>nline Ticket<span>s</span></span>
        </div>
        <div class="content">
            <div class="head">
                <span><span class="number">35</span> Waiters</span>
            </div>
            <div class="patients-books">
                <div class="books-dpt dang-books">
                </div>
                <div class="books-dpt first-books">
                </div>
                <div class="books-dpt second-books">
                </div>
                <div class="books-dpt third-books">
                </div>
                <div class="books-dpt fourth-books">
                </div>
            </div>
            <div class="footer">
                <div class="status"><div class="circle red"></div><div class="status-name red">خطر جدا</div></div>
                <div class="status"><div class="circle yellow"></div><div class="status-name yellow">خطر</div></div>
                <div class="status"><div class="circle green"></div><div class="status-name green">متوسط</div></div>
                <div class="status"><div class="circle blue"></div><div class="status-name blue">عادي</div></div>
            </div>
        </div>
    </div>

    <div class="patients_info finished">
        <div class="open_close">
            <span><span>F</span>inished Ticket<span>s</span></span>
        </div>
        <div class="content show">
            <div class="head">
                <span><span class="number">143</span> Finished</span>
            </div>
            <div class="patients-books">
                <div class="books-dpt">
                </div>
            </div>
            <div class="footer">
                <div class="status"><div class="circle red"></div><div class="status-name red">خطر جدا</div></div>
                <div class="status"><div class="circle yellow"></div><div class="status-name yellow">خطر</div></div>
                <div class="status"><div class="circle green"></div><div class="status-name green">متوسط</div></div>
                <div class="status"><div class="circle blue"></div><div class="status-name blue">عادي</div></div>
            </div>
        </div>
    </div>

    <div class="printer_page" id="patient_reset" style="position: absolute;display: flex;width: 300px;height: 300px;background-color: white;text-align: center;left: 0;top: 0;flex-direction: column;flex-wrap: nowrap;align-content: center;justify-content: center;align-items: center;">
        <img src="images/logo.jpeg" alt="Ministry of Health وزارة الصحة" style="position: absolute;width: 65px;left: 10px;top: 5px;filter: grayscale(1);">
        <div class="logo-name" style="position: absolute;right: 20px;top: 20px;font-size: 16px;font-weight: 600;font-family: serif;color: #838383;">مستشفى<br>الحياة</div>
        <div class="printer_dept" style="font-size: 25px;font-weight: 700;color: #949494;transform: translateY(10px);margin-top: 35px;">children</div>
        <div class="printer_num" style="text-align: center;font-family: system-ui;font-size: 90px;font-weight: 800;color: #616161;">114</div>
        <div class="waiters_num" style="font-size: 13px;font-weight: 400;color: #949494;transform: translateY(-15px);">امامك <span class="w_l" style="font-weight: 700;">10</span> من المرضى في الانتظار</div>
        <div class="printer_status" style="position: absolute;right: 15px;bottom: 10px;font-size: 13px;font-family: system-ui;color: #535353;font-weight: 500;"><span style="font-size: 12px;top: 0px;position: relative;">3</span> : حالة المريض</div>
        <div class="printer_date" style="position: absolute;left: 16px;bottom: 2px;font-size: 12px;font-weight: 600;color: #a6a6a6;font-family: monospace;"><span class="date">7/11/2022</span><br><span class="time" style="font-weight: 600;font-size: 10px;color: #757575;">11:00:35 AM</span></div>
    </div>

    <script src="scripts/security dashboard.js"></script>

</body>
</html>