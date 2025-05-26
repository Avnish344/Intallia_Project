import { create } from "zustand";
import { fetchCompanyList, deleteCompany } from "@/http/api";

interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  linkedin: string;
}

interface RawCompany {
  CompanyId: string;
  CompanyName: string;
  Email: string;
  PhoneNumber: string;
  Status: string;
  Website: string;
}

interface CompanyListResponse {
  data: {
    LookupData?: RawCompany[];
  };
}

interface DeleteResponse {
  data: {
    ErrorCode?: string;
  };
}

interface CompanyStore {
  companies: Company[];
  loading: boolean;
  fetchCompanies: () => Promise<void>;
  removeCompany: (id: string) => Promise<boolean>;
}

export const useCompanyStore = create<CompanyStore>((set, get) => ({
  companies: [],
  loading: false,


  // fetchCompanies: async () => {
  //   setTimeout(() => {
  //     const mockCompanies = [
  //       { id: "1", name: "ABC Corp", email: "abc@corp.com", phone: "1234567890", type: "Free", linkedin: "linkedin.com/abc" },
  //       { id: "2", name: "XYZ Ltd", email: "xyz@ltd.com", phone: "0987654321", type: "Paid", linkedin: "linkedin.com/xyz" },
  //     ];
  //     set({ companies: mockCompanies, loading: false });
  //   }, 1000);

  // },



  fetchCompanies: async () => {
  set({ loading: true });

  const payload = {
    ScreenName: "CompanyMaster",
    LookUpKey: "GetList",
    Filter1: "",
    Filter2: "",
    Filter3: "",
    Filter4: "",
    Filter5: "",
  };

  try {
    const res = await fetchCompanyList(payload);
    const rawData = res.data?.LookupData || [];

    const companyList = rawData.map((company: any) => ({
      id: company.CompanyId || "N/A",
      name: company.CompanyName || "N/A",
      email: company.Email || "N/A",
      phone: company.PhoneNumber || "N/A",
      type: company.Status || "Free",
      linkedin: company.Website || "N/A",
    }));

    set({ companies: companyList, loading: false });
  } catch (err) {
    console.error("Error fetching company list:", err);
    set({ loading: false });
  }
},



  removeCompany: async (companyId: string) => {
    const payload = {
      JSON: JSON.stringify({
        Header: [{ CompanyId: companyId }],
        Response: [{ ResponseText: "", ErrorCode: "" }],
      }),
    };

    try {
      const res: DeleteResponse = await deleteCompany(payload);
      const errorCode = res?.data?.ErrorCode;

      if (!errorCode || errorCode === "") {
        set({
          companies: get().companies.filter((c) => c.id !== companyId),
        });
        return true;
      }
    } catch (err) {
      console.error("Error deleting company:", err);
    }
    return false;
  },
}));
