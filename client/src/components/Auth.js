import { useState } from "react";
import { useCookies } from 'react-cookie';

function Auth() {
  const[cookies,setCookie, removeCookie] = useCookies(null);

  const [isLogIn, setIsLogin] = useState(true);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [error, setError] = useState(null);

  console.log(cookies);

  function viewLogin(status) {
    setError(null);
    setIsLogin(status);
  }

  async function handleSubmit(e, endpoint) {
    e.preventDefault();

    if(!isLogIn && password !== confirmPassword) {
      setError('Make sure passwords match!');
      return
    }

    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/${endpoint}`, {
      method: 'POST',
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify({email, password})
    });

    const data = await response.json();
    console.log(data);

    if(data.detail) {
      setError(data.detail);
    } else {
      setCookie('Email', data.email);
      setCookie('AuthToken', data.token);

      window.location.reload();
    }
  }

    return (
    <div className="bg-[#191919] h-screen flex flex-col items-center justify-center px-8">
      <div className="flex flex-col items-center justify-center mb-24">

        <div className="flex flex-row items-ceter justify-center xs:mb-8 lg:mb-12">  
          <img 
            src={`${process.env.PUBLIC_URL}/images/check.png`} 
            alt="Logo"
            className="xs:w-12 xs:h-12 sm:w-12 sm:h-12 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-30 xl:h-30 2xl:w-30 2xl:h-30"   
          />
          <div className="text-gray-100 font-semibold xs:text-4xl lg:text-5xl ml-2">
          Listly
          </div>
        </div>


        <form className="flex flex-col items-center w-full xl:w-auto 2xl:w-auto">
          <div className="text-xl mb-4 font-medium text-white xs:text-2xl xs:mb-6 sm:mb-6 sm:text-2xl lg:text-3xl lg:mb-8 xl:mb-10 2xl:mb-10">
            {isLogIn ? 'Please log in' : 'Please sign up'}</div>

          <input 
            type="email"
            placeholder="Enter your email address" 
            className = "border border-[#444444] rounded-lg text-sm mb-4 xs:w-[280px] sm:w-[320px] md:w-[380px] lg:w-[400px] xl:w-[420px] 2xl:w-[420px] p-4 bg-[#151515] placeholder-[#808080] focus:border-[#808080] focus:ring-0 outline-none text-white pl-4"
            onChange={(e) => setEmail(e.target.value)} />

          <input 
            type="password"
            placeholder="Password"
            className = "border border-[#444444] rounded-lg text-sm mb-4 xs:w-[280px] sm:w-[320px] md:w-[380px] lg:w-[400px] xl:w-[420px] 2xl:w-[420px] p-4 bg-[#151515] placeholder-[#808080] focus:border-[#808080] focus:ring-0 outline-none text-white pl-4"
            onChange={(e) => setPassword(e.target.value)} />
            

          {!isLogIn && <input 
            type="password"
            placeholder="Confirm Password" 
            className = "border border-[#444444] rounded-lg text-sm mb-4 xs:w-[280px] sm:w-[320px] md:w-[380px] lg:w-[400px] xl:w-[420px] 2xl:w-[420px] p-4 bg-[#151515] placeholder-[#808080] focus:border-[#808080] focus:ring-0 outline-none text-white pl-4"
            onChange={(e) => setConfirmPassword(e.target.value)} />}
          
          {error && <p className="text-red-600 text-lg font-semibold mb-3">{error}</p>}

          <input 
            type="submit" 
            value={isLogIn ? "Login" : 'Sign up'} 
            className="text-[#151515] font-medium text-center bg-[#ffffff] rounded-lg py-2 w-[250px] hover:bg-[#e7e7e7] xs:w-[280px] sm:w-[320px] md:w-[380px] lg:w-[400px] xl:w-[420px] 2xl:w-[420px]"
            onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} /> 
            
          <div className="text-[#c9c9c9] font-normal text-sm mt-3 sm:text-sm sm:mt-3 lg:text-[16px] lg:mt-4 ">
            <p>
            {isLogIn ? "don't have an account?" : 'already have an account?'}&nbsp;
            <a 
              className="text-blue-500 cursor-pointer hover:underline" 
              onClick={() => (isLogIn ? viewLogin(false) : viewLogin(true))}>
            {isLogIn ? 'Sign up' : 'Sign in'}</a>
            </p>
          </div>

        </form>
      </div>

    </div>
  );
}
  
export default Auth;
  