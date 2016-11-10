@extends('layouts.default')

@section('head.title', 'Login')

@push('head.stylesheets')
    <link rel="stylesheet" href="{{ asset('assets/css/pages/login-v3.css') }}">
@endpush

@section('body.class', 'page-login-v3 layout-full')

@section('body')
<div class="page animsition vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">
    <div class="page-content vertical-align-middle">
        <div class="panel">
            <div class="panel-body">
                <div class="brand">
                    <img class="brand-img" src="{{ asset('assets/images/logo-blue.png') }}" alt="...">
                    <h2 class="brand-text font-size-18">Larachat</h2>
                </div>

                @if (count($errors) > 0)
                    @foreach ($errors->all() as $error)
                        <div role="alert" class="alert dark alert-icon alert-danger alert-dismissible">
                            <button aria-label="Close" data-dismiss="alert" class="close" type="button">
                                <span aria-hidden="true">×</span>
                            </button>
                            <i aria-hidden="true" class="icon wb-close"></i> {{ $error }}
                        </div>
                    @endforeach
                @endif

                <form id="loginForm" action="{{ route('auth.postLogin') }}" method="post">
                    <input type="hidden" name="guard" value="{{ $params['guard'] or ''}}">
                    <input type="hidden" name="redirect_uri" value="{{ $params['redirect_uri'] or '' }}">
                    {!! csrf_field() !!}

                    <div class="form-group form-material floating">
                        <input type="email" class="form-control" name="email" value="{{ old('email') }}" autocomplete="off" />
                        <label class="floating-label">Email</label>
                    </div>
                    <div class="form-group form-material floating">
                        <input type="password" class="form-control" name="password" autocomplete="off" />
                        <label class="floating-label">Password</label>
                    </div>
                    <div class="form-group clearfix">
                        <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-lg pull-left">
                            <input type="checkbox" id="inputCheckbox" name="remember">
                            <label for="inputCheckbox">Remember me</label>
                        </div>
                        <a class="pull-right" href="#">Forgot password?</a>
                    </div>
                    <button id="submit-form" type="submit" class="btn btn-primary btn-block btn-lg margin-top-40">Sign in</button>
                </form>
                <p>Still no account? Please go to <a href="#">Sign up</a></p>
            </div>
        </div>

        <footer class="page-copyright page-copyright-inverse">
            <p>Larachat By Vadim Osochenko</p>
            <p>© 2016. All RIGHT RESERVED.</p>
            <div class="social">
                <a class="btn btn-icon btn-pure" href="javascript:void(0)">
                    <i class="icon bd-twitter" aria-hidden="true"></i>
                </a>
                <a class="btn btn-icon btn-pure" href="javascript:void(0)">
                    <i class="icon bd-facebook" aria-hidden="true"></i>
                </a>
                <a class="btn btn-icon btn-pure" href="javascript:void(0)">
                    <i class="icon bd-google-plus" aria-hidden="true"></i>
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
    <script src="{{ asset('assets/js/formValidation.js') }}"></script>
    <script src="{{ asset('assets/js/bootstrap.js') }}"></script>

    <script>
        (function(document, window, $) {
            'use strict';

            var Site = window.Site;
            $(document).ready(function() {
                Site.run();
            });
        })(document, window, jQuery);
    </script>
    <script>
        $("#loginForm").formValidation({
            framework: 'bootstrap',
            live: 'disabled',
            fields: {
                email: {
                    validators: {
                        notEmpty: {
                            message: 'The e-mail is required'
                        },
                        emailAddress: {
                            message: 'Incorrect e-mail'
                        },
                        blank: {}
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'The password is required'
                        },
                        blank: {}
                    }
                }
            }
        });

        $('#submit-form').click(function(e) {
            var fv = $("#loginForm").data('formValidation');
            fv.validate();

            if (!fv.isValid()) {
                e.preventDefault();
                return false;
            }
            return true;
        });
    </script>
@endpush
