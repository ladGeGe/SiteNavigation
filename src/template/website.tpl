<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>公安网站点导航</title>
    <link href="/src/public/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/">导航</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="/website">公安网站点 <span class="sr-only">(current)</span></a></li>
                    <li><a href="/apps">Apps</a></li>
                    <li><a href="/">下载中心</a></li>
                    <li><a href="/njdzjk">对帐接口</a></li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
    <div class="container">
        <div class="row">
            <ol class="breadcrumb">
                <li><a href="#">导航</a></li>
                <li class="active"><a href="#">公安网站点</a> </li>
            </ol>
            <ul class="list-group">
                {{#each websiteData}}
                <li class="list-group-item">
                    <a href="{{this.url}}">{{this.title}}</a>
                </li>
                {{/each}}
            </ul>
        </div>
    </div>




    <!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
    <script src="/src/public/js/jquery-1.11.3.min.js"></script>
    <!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
    <script src="/src/public/js/bootstrap.min.js"></script>
</body>

</html>
