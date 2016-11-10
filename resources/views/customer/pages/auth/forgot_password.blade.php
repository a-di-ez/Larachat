@extends('layouts.default')

@section('head.title', 'Forgot password')

@push('head.stylesheets')
    <link rel="stylesheet" href="{{ asset('assets/css/pages/forgot-password.css') }}">
@endpush

@section('body.class', 'page-forgot-password layout-full')

@section('body')
    <div class="page animsition vertical-align text-center" data-animsition-in="fade-in"
         data-animsition-out="fade-out">
        <div class="page-content vertical-align-middle">
            <h2>Forgot Your Password ?</h2>
            <p>Input your registered email to reset your password</p>

            <form method="post" role="form">
                <div class="form-group">
                    <input type="email" class="form-control" id="inputEmail" name="email" placeholder="Your Email">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">Reset Your Password</button>
                </div>
            </form>

            <footer class="page-copyright">
                <p>Botlabs by MagPayLabs</p>
                <p>© 2016. All RIGHT RESERVED.</p>
                <div class="social">
                    <a href="javascript:void(0)">
                        <i class="icon bd-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="javascript:void(0)">
                        <i class="icon bd-facebook" aria-hidden="true"></i>
                    </a>
                    <a href="javascript:void(0)">
                        <i class="icon bd-dribbble" aria-hidden="true"></i>
                    </a>
                </div>
            </footer>
        </div>
    </div>
@endsection

@push('footer.scripts')
<script src="{{ asset('assets/js/jquery/jquery.placeholder.js') }}"></script>
<script src="{{ asset('assets/js/jquery/jquery-placeholder-component.js') }}"></script>
<script src="{{ asset('assets/js/material.js') }}"></script>

<script>
    (function(document, window, $) {
        'use strict';

        var Site = window.Site;
        $(document).ready(function() {
            Site.run();
        });
    })(document, window, jQuery);
</script>
@endpush
