// import { useEffect, useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { MoreVertical } from "lucide-react";
// import axios from "axios";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";

// interface Company {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   type: string;
//   linkedin: string;
// }

// interface CompanyTableProps {
//   startIndex: number;
//   endIndex: number;
//   searchQuery: string;
// }

// export const CompanyTable = ({
//   startIndex,
//   endIndex,
//   searchQuery,
// }: CompanyTableProps) => {
//   const [companies, setCompanies] = useState<Company[]>([]);
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const fetchCompanyData = async () => {
//     try {
//       const response = await axios.post(
//         "http://3.6.31.102/Intallia24/api/Intallia24/GETLookupData",
//         {
//           ScreenName: "CompanyMaster",
//           LookUpKey: "GetList",
//           Filter1: "",
//           Filter2: "",
//           Filter3: "",
//           Filter4: "",
//           Filter5: "",
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       console.log("API Raw Response:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching company data:", error);
//       return null;
//     }
//   };

//   // Delete company API call
//   const handleDelete = async (companyId: string) => {
//     if (!window.confirm("Are you sure you want to delete this company?")) {
//       return;
//     }
//     const payload = {
//       JSON: JSON.stringify({
//         Header: [{ CompanyId: companyId }],
//         Response: [{ ResponseText: "", ErrorCode: "" }],
//       }),
//     };

//     try {
//       const response = await axios.post(
//         "http://3.6.31.102/Intallia24/api/Intallia24/DeleteCompany",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       console.log("Delete response data:", response.data);

//       // Flexible success check based on absence of ErrorCode or empty ErrorCode
//       const isSuccess =
//         response.data &&
//         (!response.data.ErrorCode || response.data.ErrorCode === "");

//       if (isSuccess) {
//         alert("Company deleted successfully!");

//         console.log("Deleted company ID:", companyId);
//         console.log("Companies before update:", companies);

//         setCompanies((prev) => {
//           const updated = prev.filter((company) => company.id !== companyId);
//           console.log("Companies after update:", updated);
//           return updated;
//         });

//         setSelectedUsers((prev) => prev.filter((id) => id !== companyId));
//       } else {
//         alert("Failed to delete company. Please try again.");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       alert("Error deleting company. Please check console.");
//     }
//   };

//   // Helper to safely render fields
//   const safeRender = (value: any) => (value ? value : "N/A");

//   useEffect(() => {
//     const getCompanies = async () => {
//       const data = await fetchCompanyData();

//       if (data && Array.isArray(data.LookupData)) {
//         const companyDetails = data.LookupData.map((company: any) => ({
//           id: company.CompanyId || "N/A",
//           name: company.CompanyName || "N/A",
//           email: company.Email || "N/A",
//           phone: company.PhoneNumber || "N/A",
//           type: company.CompanyType || "Free",
//           linkedin: company.LinkedInURL || company.Website || "N/A",
//         }));

//         setCompanies(companyDetails);
//       } else {
//         console.error("Unexpected data format:", data);
//       }

//       setLoading(false);
//     };

//     getCompanies();
//   }, []);

//   const filteredCompanies = companies.filter((company) => {
//     const searchStr = searchQuery.toLowerCase();
//     return (
//       company.id.toLowerCase().includes(searchStr) ||
//       company.name.toLowerCase().includes(searchStr) ||
//       company.email.toLowerCase().includes(searchStr) ||
//       company.phone.toLowerCase().includes(searchStr)
//     );
//   });

//   const displayedCompanies = filteredCompanies.slice(startIndex, endIndex);

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedUsers([]);
//     } else {
//       setSelectedUsers(filteredCompanies.map((company) => company.id));
//     }
//     setSelectAll(!selectAll);
//   };

//   const handleSelectUser = (id: string) => {
//     setSelectedUsers((prev) =>
//       prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id],
//     );
//   };

//   if (loading) return <div className="p-4 text-center">Loading...</div>;

//   return (
//     <div className="rounded-md">
//       <Table>
//         <TableHeader>
//           <TableRow className="bg-[#F9FAFB]">
//             <TableHead>
//               <input
//                 type="checkbox"
//                 checked={selectAll}
//                 onChange={handleSelectAll}
//               />
//             </TableHead>
//             <TableHead>User ID</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Phone Number</TableHead>
//             <TableHead>User Type</TableHead>
//             <TableHead>LinkedIn URL</TableHead>
//             <TableHead>Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {displayedCompanies.map((company) => (
//             <TableRow key={company.id} className="text-sm">
//               <TableCell className="py-4 text-sm">
//                 <input
//                   type="checkbox"
//                   checked={selectedUsers.includes(company.id)}
//                   onChange={() => handleSelectUser(company.id)}
//                 />
//               </TableCell>
//               <TableCell className="py-4">{safeRender(company.id)}</TableCell>
//               <TableCell className="py-4">{safeRender(company.name)}</TableCell>
//               <TableCell className="py-4">{safeRender(company.email)}</TableCell>
//               <TableCell className="py-4">{safeRender(company.phone)}</TableCell>
//               <TableCell className="py-4">
//                 <Badge
//                   variant="secondary"
//                   className={
//                     company.type === "Paid"
//                       ? "bg-[#ECFDF3] text-[#23C16B]"
//                       : "bg-[#FEF3F2] text-[#FF3A3A]"
//                   }
//                 >
//                   {safeRender(company.type)}
//                 </Badge>
//               </TableCell>
//               <TableCell className="py-4 text-blue-600">
//                 {safeRender(company.linkedin)}
//               </TableCell>
//               <TableCell className="py-4">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="icon">
//                       <MoreVertical className="w-4 h-4" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" sideOffset={4}>
//                     <DropdownMenuItem
//                       onClick={() => alert(`Edit company ${company.id}`)}
//                     >
//                       Edit Company
//                     </DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => handleDelete(company.id)}>
//                       Delete Company
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };


// components/CompanyTable.tsx
import { useEffect, useState } from "react";
import { useCompanyStore } from "@/store/companyStore";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuTrigger,
  DropdownMenuContent, DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

interface CompanyTableProps {
  startIndex: number;
  endIndex: number;
  searchQuery: string;
}

export const CompanyTable = ({
  startIndex,
  endIndex,
  searchQuery,
}: CompanyTableProps) => {
  const { companies, loading, fetchCompanies, removeCompany } = useCompanyStore();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) => {
    const searchStr = searchQuery.toLowerCase();
    return (
      company.id.toLowerCase().includes(searchStr) ||
      company.name.toLowerCase().includes(searchStr) ||
      company.email.toLowerCase().includes(searchStr) ||
      company.phone.toLowerCase().includes(searchStr)
    );
  });

  const displayedCompanies = filteredCompanies.slice(startIndex, endIndex);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      await removeCompany(id);
      setSelectedUsers((prev) => prev.filter((uid) => uid !== id));
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredCompanies.map((c) => c.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const safeRender = (val: any) => (val ? val : "N/A");

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F9FAFB]">
            <TableHead>
              <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
            </TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>User Type</TableHead>
            <TableHead>LinkedIn URL</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedCompanies.map((company) => (
            <TableRow key={company.id} className="text-sm">
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(company.id)}
                  onChange={() => handleSelectUser(company.id)}
                />
              </TableCell>
              <TableCell>{safeRender(company.id)}</TableCell>
              <TableCell>{safeRender(company.name)}</TableCell>
              <TableCell>{safeRender(company.email)}</TableCell>
              <TableCell>{safeRender(company.phone)}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={
                    company.type === "Paid"
                      ? "bg-[#ECFDF3] text-[#23C16B]"
                      : "bg-[#FEF3F2] text-[#FF3A3A]"
                  }
                >
                  {safeRender(company.type)}
                </Badge>
              </TableCell>
              <TableCell className="text-blue-600">
                {safeRender(company.linkedin)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" sideOffset={4}>
                    <DropdownMenuItem onClick={() => alert(`Edit ${company.id}`)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(company.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
