import { ActionButton } from "@/components/common/ActionButton";
import Pagination from "@/components/common/Pagination";
import { MainLayout } from "@/components/layout/MainLayout";
import { UserTable } from "@/components/users/UserTable";
import { UserTableActions } from "@/components/users/UserTableActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getScreen } from "@/http/api.js";
import { useQuery } from "@tanstack/react-query";

const UserManagement = () => {
  const navigate = useNavigate();

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["User"],
    queryFn: async () =>
      await getScreen({
        ScreenName: "UserMaster",
        LookUpKey: "GetList",
        Filter1: "",
        Filter2: "",
        Filter3: "",
        Filter4: "",
        Filter5: "",
      }),
    retry: 2,
  });
  console.log(users);


  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const usersPerPage = 8;
  const totalPages = Math.ceil(users?.LookupData?.length / usersPerPage); // Ensure correct pagination

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = Math.min(startIndex + usersPerPage);

  return (
    <MainLayout>
      <div className="flex min-h-screen bg-background">
        <main className="flex-1 p-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="page-heading">User Management (Users)</h1>
            </div>

            <UserTableActions onSearch={setSearchQuery} />
            <div className="bg-white p-6 rounded-lg">
              <UserTable
                startIndex={startIndex}
                endIndex={endIndex}
                searchQuery={searchQuery}
                users={users?.LookupData}
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

export default UserManagement;
