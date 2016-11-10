<!doctype html>
<html class="no-js css-menubar" lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('head.title')</title>

    <link rel="stylesheet" href="{{ asset('assets/css/fonts/web-icons/web-icons.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/fonts/font-awesome/font-awesome.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/fonts/brand-icons/brand-icons.css') }}">
    <link rel='stylesheet' href='//fonts.googleapis.com/css?family=Roboto:300,400,500,300italic'>

    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap/bootstrap-extend.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/site.css') }}">

    <link rel="stylesheet" href="{{ asset('assets/css/animsition.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/asScrollable.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/introjs.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/slidePanel.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/fonts/flag-icon-css/flag-icon.css') }}">

    @stack('head.stylesheets')
    @stack('head.scripts')

    <script src="{{ asset('assets/js/jquery/jquery.js') }}"></script>

    <!--[if lt IE 9]>
    <script src="{{ asset('assets/js/html5shiv.js') }}"></script>
    <![endif]-->

    <!--[if lt IE 10]>
    <script src="{{ asset('assets/js/media.match.js') }}"></script>
    <script src="{{ asset('assets/js/respond.js') }}"></script>
    <![endif]-->

    <!-- Scripts -->
    <script src="{{ asset('assets/js/modernizr.js') }}"></script>
    <script src="{{ asset('assets/js/breakpoints.js') }}"></script>
    <script>
        Breakpoints();
    </script>
    <script>
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    </script>
</head>
<body class="@yield('body.class', '')">

    @hasSection('body')
        @yield('body')
    @endif

    <script src="{{ asset('assets/js/bootstrap/bootstrap.js') }}"></script>
    <script src="{{ asset('assets/js/animsition.js') }}"></script>
    <script src="{{ asset('assets/js/jquery/jquery-asScroll.js') }}"></script>
    <script src="{{ asset('assets/js/jquery/jquery.mousewheel.js') }}"></script>
    <script src="{{ asset('assets/js/jquery/jquery.asScrollable.all.js') }}"></script>
    <script src="{{ asset('assets/js/jquery/jquery-asHoverScroll.js') }}"></script>

    <script src="{{ asset('assets/js/intro.js') }}"></script>
    <script src="{{ asset('assets/js/screenfull.js') }}"></script>
    <script src="{{ asset('assets/js/jquery/jquery-slidePanel.js') }}"></script>

    <script src="{{ asset('assets/js/core.js') }}"></script>
    <script src="{{ asset('assets/js/site.js') }}"></script>

    <script src="{{ asset('assets/js/menu.js') }}"></script>
    <script src="{{ asset('assets/js/menubar.js') }}"></script>
    <script src="{{ asset('assets/js/sidebar.js') }}"></script>

    <script src="{{ asset('assets/js/config-colors.js') }}"></script>
    <script src="{{ asset('assets/js/config-tour.js') }}"></script>

    <script src="{{ asset('assets/js/asscrollable.js') }}"></script>
    <script src="{{ asset('assets/js/animsition-component.js') }}"></script>
    <script src="{{ asset('assets/js/slidepanel.js') }}"></script>
    <script src="{{ asset('assets/js/app.js') }}"></script>

    @stack('footer.scripts')
    @stack('footer.counter')

    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-80998605-1', 'auto');
        ga('send', 'pageview');

    </script>

</body>
</html>
