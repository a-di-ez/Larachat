@extends('layouts.default')

@section('head.title', 'Not Found')

@push('head.stylesheets')
    <link rel="stylesheet" href="{{ asset('assets/css/pages/errors.css') }}">
@endpush

@section('body.class', 'page-error page-error-404 layout-full')

@section('body')
<div class="page animsition vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">
    <div class="page-content vertical-align-middle">
        @include('errors.includes.header')
        <p class="error-advise">YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
        <a class="btn btn-primary btn-round" href="{{ route('customer.getChatsList') }}">GO TO HOME PAGE</a>
        @include('errors.includes.footer')
    </div>
</div>
@endsection

@push('footer.scripts')
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

