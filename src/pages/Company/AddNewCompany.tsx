import React, { useRef } from "react";
import CompanyForm from "./CompanyForm";
import { MainLayout } from "../../components/layout/MainLayout";
import SidebarActions from "../../components/users/SidebarActions";
import { useSearchParams } from "react-router-dom";

const AddNewCompany: React.FC = () => {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("companyId") ?? null;
  const companyFormRef = useRef<{ submit: () => void }>(null);

  const handleAddNewCompany = () => {
    companyFormRef.current?.submit();
  };

  const handleSaveAndExit = () => {
    console.log("Save & Exit clicked");
  };

  const handleSave = () => {
    console.log("Save clicked");
  };

  const handleDelete = () => {
    console.log("Delete clicked");
  };

  const actions: {
    variant: "primary" | "outline" | "danger";
    text: string;
    onClick?: () => void;
  }[] = [
    {
      variant: "primary",
      text: `${companyId ? "Update Company" : "Add New Company"}`,
      onClick: handleAddNewCompany,
    },
    {
      variant: "outline",
      text: "Save & Exit",
      onClick: handleSaveAndExit,
    },
    { variant: "outline", text: "Save", onClick: handleSave },
    { variant: "danger", text: "Delete", onClick: handleDelete },
  ];
  return (
    <MainLayout>
      <div className="bg-[#F8F9FA] flex items-start gap-[35px] overflow-hidden flex-wrap p-8">
        <div className="flex flex-col items-stretch grow shrink-0 basis-0 w-fit">
          <h1 className="page-heading">Add New Company</h1>

          <div className="shadow-[0px_3.5px_5.5px_0px_rgba(0,0,0,0.02)] bg-white flex items-stretch gap-5 flex-wrap justify-between mt-[30px] px-[45px] py-[31px] rounded-[15px]  h-[88vh] sticky top-0 overflow-y-scroll">
            <CompanyForm ref={companyFormRef} companyId={companyId}/>
            <SidebarActions actions={actions} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default AddNewCompany;
