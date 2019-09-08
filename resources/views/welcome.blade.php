<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{csrf_token()}}">
        <title>Big Store</title>
        <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet"/>
    </head>
    <body>
        <div id="app"></div>
<!--        <script src="js/bootstrap.js"></script>-->
<!--        <script src="js/app.js"></script>-->

        <script src="{{ mix('js/bootstrap.js') }}" type="text/javascript"></script>
        <script src="{{ mix('js/app.js') }}" type="text/javascript"></script>
    </body>
</html>
