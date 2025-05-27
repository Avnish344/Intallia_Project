import myImage from '@/assets/Frame 25.svg';
import SignupImg from "@/assets/Hired-bro 1.svg";
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast"
import LoginForm from './LoginForm';

const Login = () => {
  const [isShowV, setIsShowV] = useState(false);

  return (
    <div className="h-screen">
      <div className="container">
        <div className="flex justify-between items-center h-[72px]">
          <div className="">
            <img src={myImage} alt="Example" />
          </div>
          <div className="flex gap-2 items-center">
            <button className="rounded-lg bg-[#242426] py-2 px-3 text-[#FFFFFF] leading-[21px]">
              Login
            </button>
            <button className="ring-1 rounded-lg py-1 px-3 ring-[#242426]">
              Singup
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center p-5 md:p-0">
        <div className="hidden md:w-1/2 bg-[rgb(242,244,247)] md:flex items-center justify-center flex-col gap-5 sticky top-0 h-[90vh]">
          <img src={SignupImg} alt="signup" />
          <h2 className="font-semibold text-5xl leading-[41px] text-center ">
            Explore. Practice. Get Hired!
          </h2>
        </div>
        {!isShowV && <LoginForm />}
      </div>
    </div>
  );
}

export default Login;
