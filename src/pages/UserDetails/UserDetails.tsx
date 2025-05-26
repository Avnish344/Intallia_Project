import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/login/Header";
import { ProfileSidebar } from "@/components/login/ProfileSidebar";
import { PersonalDetailsForm } from "@/components/login/PersonalDetailsForm";
import { ResumeUpload } from "@/components/login/ResumeUpload";
import { EducationForm } from "@/components/login/EducationForm";
import { CustomButton } from "@/components/login/CustomButton";
import skipIcon from "@/assets/skip.svg";
import nextIcon from "@/assets/next.svg";
import { getScreen } from "@/http/api.js";
import {useQuery} from "@tanstack/react-query";


const UserDetails: React.FC = () => {
    const {
      data: usereducation = [],
      isLoading,
      isError,
    } = useQuery({
      queryKey: ["UserEduction"],
      queryFn: async () =>
        await getScreen({
          ScreenName: "UserEduction",
          LookUpKey: "GetUserEduction",
          Filter1: "",
          Filter2: "",
          Filter3: "",
          Filter4: "",
          Filter5: "",
        }),
      retry: 2,
    });
    console.log(usereducation);

  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step >= 2) {
      navigate("/preferences");
    } else {
      setStep(step + 1);
    }
  };

  const handleSkip = () => {
    navigate("/preferences");
  };

  return (
    <div className="bg-white overflow-hidden pb-[90px] max-md:pb-[60px]">
      <Header />
      <div className="flex w-full max-w-[1388px] flex-col ml-[129px] mt-[55px] max-md:max-w-full max-md:mt-10">
        <div className="self-stretch max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            <div className="w-[28%] max-md:w-full max-md:ml-0">
              <ProfileSidebar />
            </div>
            <div className="w-[72%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-stretch max-md:max-w-full max-md:mt-10">
                <div className="text-center text-[34px] font-semibold leading-none tracking-[0.37px] bg-clip-text text-[#18d3c2] mb-2">
                  Let's get Started
                </div>

                {step === 1 && (
                  <>
                    <PersonalDetailsForm />
                    <ResumeUpload />
                  </>
                )}

                {step === 2 && <EducationForm />}

                <div className="max-w-xl px-4 mt-6">
                  <div className="flex w-full justify-end gap-4 max-md:justify-start max-md:gap-3">
                    <CustomButton
                      variant="secondary"
                      icon={skipIcon}
                      onClick={handleSkip}
                    >
                      Skip
                    </CustomButton>

                    <CustomButton
                      variant="primary"
                      icon={nextIcon}
                      onClick={handleNext}
                    >
                      Next
                    </CustomButton>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
