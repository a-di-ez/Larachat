@extends('layouts.default')

@section('body')
    @include('customer.includes.header')
    @include('customer.includes.navigation')
    @yield('content')
    @include('customer.includes.footer')
@endsection
