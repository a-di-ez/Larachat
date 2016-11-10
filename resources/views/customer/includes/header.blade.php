<nav class="site-navbar navbar navbar-default navbar-fixed-top navbar-mega navbar-inverse" role="navigation">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle hamburger hamburger-close navbar-toggle-left hided" data-toggle="menubar">
            <span class="sr-only">Toggle navigation</span>
            <span class="hamburger-bar"></span>
        </button>
        <button type="button" class="navbar-toggle collapsed" data-target="#site-navbar-collapse" data-toggle="collapse">
            <i class="icon wb-more-horizontal" aria-hidden="true"></i>
        </button>
        <a class="navbar-brand navbar-brand-center" href="{{ route('customer.getChatsList') }}">
            <img class="navbar-brand-logo navbar-brand-logo-normal" src="{{ asset('assets/images/logo.png') }}" title="Botlabs">
            <img class="navbar-brand-logo navbar-brand-logo-special" src="{{ asset('assets/images/logo-blue.png') }}" title="Botlabs">
            <span class="navbar-brand-text hidden-xs"> Larachat</span>
        </a>
    </div>

    <div class="navbar-container container-fluid">
        <!-- Navbar Collapse -->
        <div class="collapse navbar-collapse navbar-collapse-toolbar" id="site-navbar-collapse">
            <!-- Navbar Toolbar Right -->
            <ul class="nav navbar-toolbar navbar-right navbar-toolbar-right">
                <li class="dropdown">
                    <a class="navbar-avatar dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false" role="button">
                        <span class="margin-right-15">
                            {{ Auth::guard('customer')->user()->name }}
                        </span>

                        <span class="avatar avatar-online">
                            <img src="{{ asset('assets/images/5.jpg') }}" alt="...">
                        </span>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <li role="presentation">
{{--                            <a href="{{ route('customer.getEdit') }}" role="menuitem"><i class="icon wb-settings" aria-hidden="true"></i> Settings</a>--}}
                        </li>
                        <li class="divider" role="presentation"></li>
                        <li role="presentation">
                            <a href="{{ route('auth.getLogout', ['guard' => 'customer', 'redirect_uri' => url('/')]) }}" role="menuitem"><i class="icon wb-power" aria-hidden="true"></i> Logout</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <!-- End Navbar Toolbar Right -->
        </div>
        <!-- End Navbar Collapse -->

        <!-- Site Navbar Seach -->
        <div class="collapse navbar-search-overlap" id="site-navbar-search">
            <form role="search">
                <div class="form-group">
                    <div class="input-search">
                        <i class="input-search-icon wb-search" aria-hidden="true"></i>
                        <input type="text" class="form-control" name="site-search" placeholder="Search...">
                        <button type="button" class="input-search-close icon wb-close" data-target="#site-navbar-search" data-toggle="collapse" aria-label="Close"></button>
                    </div>
                </div>
            </form>
        </div>
        <!-- End Site Navbar Seach -->
    </div>
</nav>
