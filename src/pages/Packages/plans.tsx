import { ActionButton } from "@/components/common/ActionButton";
import Pagination from "@/components/common/Pagination";
import { MainLayout } from "@/components/layout/MainLayout";
import { UserTable } from "@/components/users/UserTable";
import { UserTableActions } from "@/components/users/UserTableActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "@/data/users";
import { useQuery } from "@tanstack/react-query";
import { getScreen } from "@/http/api.js";


const Plans = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const usersPerPage = 8;
  const totalPages = Math.ceil(users.length / usersPerPage); // Ensure correct pagination

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const {
    data: plans = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: async () =>
      await getScreen({
        ScreenName: "Plan",
        LookUpKey: "GetList",
        Filter1: "",
        Filter2: "",
        Filter3: "",
        Filter4: "",
        Filter5: "",
      }),
    retry: 2,
  });

const filteredPlans = plans?.LookupData?.filter(
    (plan) => {
      const searchStr = searchQuery.toLowerCase();
      return (
        plan.UserId?.toLowerCase().includes(searchStr) ||
        plan.UserGroupId?.toLowerCase().includes(searchStr) ||
        plan.CompanyId?.toLowerCase().includes(searchStr) ||
        plan.IsValid?.toLowerCase().includes(searchStr) ||
        plan.Token?.toLowerCaser().includes(searchStr)
      );
    },
  );



  return (
    <MainLayout>
      <div className="flex min-h-screen bg-background">
        <main className="flex-1 p-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="page-heading">Plans</h1>
            </div>

            <UserTableActions onSearch={setSearchQuery} />
            <div className="bg-white p-6 rounded-lg">
              <UserTable
                startIndex={startIndex}
                endIndex={endIndex}
                searchQuery={searchQuery}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

export default Plans;
