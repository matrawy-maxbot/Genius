<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/login page.css">
    <title>login</title>

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
        <div class="nav-line">
            <img src="images/nav-line.png">
            <div class="shine"></div>
        </div>
        <div class="logo">
            <img src="images/logo.jpeg">
        </div>
    </div>

    <div class="form">
        <img src="images/lines-design.png">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Username</label>
            <select class="form-select" aria-label="Default select example">
                <option value="mexam" selected>Male Examination</option>
                <option value="fexam">Female Examination</option>
                <option value="mobserv">Male Observation</option>
                <option value="fobserv">Female Observation</option>
                <option value="trauma">Trauma</option>
                <option value="orthopedic">Orthopedic</option>
                <option value="children">Children</option>
                <option value="security">Security</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Password</label>
            <input type="password" class="form-control" id="password_input" placeholder="*******">
        </div>
        <div class="login-btn"><span>Login</span></div>
    </div>
    
    <script src="scripts/login page.js"></script>

</body>
</html>