<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/doctor dashboard.css">
    <title>Doctor Dashboard</title>

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

    <div class="patients-info-parent">

        <div class="patients_info">
            <div class="content">
                <div class="head">
                    <span><span class="number">28</span> Waiting Tickets</span>
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
            <div class="content show">
                <div class="head">
                    <span><span class="number">143</span> Finished Tickets</span>
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

    </div>

    <div class="running_book-ring_btn">

        <div class="running_book">
            <img class="background" src="images/lines-design.png">
            <div class="book-info">224 ~ باطني</div>
            <div class="book-time">00:00:34</div>
            <div class="book-complete-btn"><span>Complete</span></div>
        </div>

        <div class="ring_btn_parent">
            <img class="background" src="images/lines-design.png">
            <div class="ring_btn-info">Ring the alarm for the waiting area</div>
            <div class="ring-btn" id="ex1-play"><i class="fas fa-bell"></i></div>
        </div>

    </div>

    <script src="scripts/howler.js"></script>
    <script src="scripts/doctor dashboard.js"></script>

</body>
</html>