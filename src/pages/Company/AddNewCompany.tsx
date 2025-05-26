import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import CompanyForm from "./CompanyForm";
import { MainLayout } from "../../components/layout/MainLayout";
import SidebarActions from "../../components/users/SidebarActions";
import { addCompany, getCompanyById } from "@/http/api.js";

type Action = {
  variant: "primary" | "outline" | "danger";
  text: string;
  onClick?: () => void;
};

export const AddNewCompany: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const companyId = searchParams.get("companyId");
  console.log("companyId:", companyId);


  const [formData, setFormData] = useState({
    companyId: "",
    companyName: "",
    contactPersonName: "",
    phoneNumber: "",
    website: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    status: "",
    numberOfUsers: "",
    numberOfSimulations: "",
  });

  const { data: companyData } = useQuery({
    queryKey: ["company", companyId],
    // queryFn: async () => {
    //   if (!companyId) return null;
    //   const payload = {
    //     JSON: JSON.stringify({
    //       Header: [{ CompanyId: companyId }],
    //       Response: [{ ResponseText: "", ErrorCode: "" }],
    //     }),
    //   };
    //   const response = await getCompanyById(payload);
    //   return response?.Header?.[0];
    // },
    queryFn: async () => {
      if (!companyId) return null;

      try {
        const payload = {
          JSON: JSON.stringify({
            Header: [{ CompanyId: companyId }],
            Response: [{ ResponseText: "", ErrorCode: "" }],
          }),
        };

        const response = await getCompanyById(payload);

        if (!response || !response.data || !response.data.Header || response.data.Header.length === 0) {
          console.error("No company data found in response:", response);
          return null;
        }
        console.log("API response for companyId", companyId, ":", response);
        return response?.data?.Header?.[0] || null;
      } catch (error) {
        console.error("Error fetching company data:", error);
        return null;
      }
    },

    enabled: !!companyId,
  });

  useEffect(() => {
    console.log("companyData:", companyData);
    if (companyData) {
      setFormData((prev) => ({
        ...prev,
        companyId: companyData.CompanyId || "",
        companyName: companyData.CompanyName || "",
        contactPersonName: companyData.ContactPersonName || "",
        phoneNumber: companyData.PhoneNumber || "",
        website: companyData.Website || "",
        email: companyData.Email || "",
        address: companyData.Address || "",
        city: companyData.City || "",
        state: companyData.State || "",
        country: companyData.Country || "",
        status: companyData.Status || "",
      }));
    }
  }, [companyData]);

  const handleAddNewCompany = async () => {
    if (!formData.companyId.trim() || !formData.companyName.trim() || !formData.contactPersonName.trim() || !formData.phoneNumber.trim() || !formData.website.trim() || !formData.email.trim() || !formData.address.trim() || !formData.city.trim() || !formData.state.trim() || !formData.country.trim() || !formData.status.trim()) {
      alert("Please fill in all required fields before submitting.");
      return;
    }
    try {
      const payload = {
        JSON: JSON.stringify({
          Header: [
            {
              ...formData,
              NumberOfUsers: formData.numberOfUsers || "500",
              NumberOfSimulations: formData.numberOfSimulations || "500",
              CreateBy: "Admin",
              CreateDate: new Date().toISOString(),
              ModifyBy: "Admin",
              ModifyDate: new Date().toISOString(),
              Intallia1: null,
              Intallia2: null,
              Intallia3: null,
              Intallia4: null,
              Intallia5: null,
              Intallia6: null,
              Intallia7: null,
              Intallia8: null,
              Intallia9: null,
              Intallia10: null,
              Intallia11: null,
              Intallia12: null,
              Intallia13: null,
              Intallia14: null,
              Intallia15: null,
            },
          ],
          Response: [{ ResponseText: "", ErrorCode: "" }],
        }),
      };

      const response = await addCompany(payload);
      console.log("Company added:", response);
      await queryClient.invalidateQueries({ queryKey: ["companies"] });
      navigate('/company')
    } catch (error) {
      console.error("Failed to add company:", error);
    }
  };

  const actions: Action[] = [
    {
      variant: "primary",
      text: "Add New Company",
      onClick: handleAddNewCompany,
    },
    {
      variant: "primary",
      text: "Add New User",
      onClick: () => console.log("Add New User clicked"),
    },
    {
      variant: "outline",
      text: "Save & Exit",
      onClick: () => console.log("Save & Exit clicked"),
    },
    {
      variant: "outline",
      text: "Save",
      onClick: () => console.log("Save clicked"),
    },
    {
      variant: "danger",
      text: "Delete",
      onClick: () => console.log("Delete clicked"),
    },
  ];

  return (
    <MainLayout>
      <div className="bg-[#F8F9FA] flex items-start gap-[35px] overflow-hidden flex-wrap p-8">
        <div className="flex flex-col items-stretch grow shrink-0 basis-0 w-fit">
          <h1 className="page-heading">Add New Company</h1>

          <div className="shadow-[0px_3.5px_5.5px_0px_rgba(0,0,0,0.02)] bg-white flex items-stretch gap-5 flex-wrap justify-between mt-[30px] px-[45px] py-[31px] rounded-[15px] h-[88vh] sticky top-0 overflow-y-scroll">
            <CompanyForm formData={formData} setFormData={setFormData} />
            <SidebarActions actions={actions} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
