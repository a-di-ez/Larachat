<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class AuthController extends Controller
{
    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    private $allowedGuard = ['anonymous', 'customer'];

    /**
     * AuthController constructor.
     */
    public function __construct()
    {
        $this->customer = Auth::guard('customer')->user();
        $this->middleware($this->guestMiddleware(), ['except' => 'logout']);
    }

    public function getLogin(Request $request)
    {
        $params = $request->only(['guard', 'redirect_uri']);

        if (!in_array($params['guard'], $this->allowedGuard)) {
            abort(500);
        }

        return view('customer.pages.auth.login', [
            'params' => $params
        ]);
    }

    public function postLogin(Request $request)
    {
        $this->validate($request, [
            'guard' => 'required|in:' . implode(',', $this->allowedGuard),
//            'redirect_uri' => 'required|active_url'
        ]);

        $this->guard = $request->input('guard');
        $this->redirectPath = $request->input('redirect_uri');

        return $this->login($request);
    }

    public function getLogout(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'guard' => 'required|in:' . implode(',', $this->allowedGuard),
//            'redirect_uri' => 'required|active_url'
        ]);

        if ($validator->fails()) {
            abort(500);
        }

        $this->guard = $request->input('guard');
        $request->input('redirect_uri');

        return $this->logout();
    }

//    public function register(Request $request)
//    {
//        $validation = $this->validator($request->all());
//        if ($validation->fails())  {
//            return response()->json($validation->errors()->toArray());
//        }
//        else{
//            $this->create($request->all());
//            return redirect('/');
//        }
//    }


    /**
     * Get a validator for an incoming registration request.
     *
     * @param array $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param array $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }
}
