import { Badge } from "@/components/ui/badge";
import ActonModal from "@/components/common/ActonModal";
import { DataTable, Column } from "@/components/common/DataTable";
import { Plan } from "@/types/index";


const tableColumns: Column<Plan>[] = [
  {
    key: "userID",
    header: "User ID",
    render: (plan) => plan.UserID,
  },
  {
    key: "name",
    header: "Package Name",
    render: (plan) => plan.PackageName,
  },
  {
    key: "email",
    header: "Email",
    render: (plan) => plan.Plan1,
  },
  {
    key: "phone",
    header: "Phone Number",
    render: (plan) => plan.Plan2,
  },
  {
    key: "website",
    header: "Website",
    render: (plans) => plans.Plan3,
  },
];

interface PTableProps {
  startIndex: number;
  endIndex: number;
  searchQuery: string;
  plan: Plan[];
}

export const PTable = ({
  startIndex,
  endIndex,
  searchQuery,
  plan,
}: PTableProps) => {
  // const filteredData = companies?.filter((company: Company) => {
  //   const searchStr = searchQuery?.toLowerCase();
  //   return (
  //     company.CompanyId?.toLowerCase().includes(searchStr) ||
  //     company.CompanyName?.toLowerCase().includes(searchStr) ||
  //     company.Email?.toLowerCase().includes(searchStr) ||
  //     company.PhoneNumber?.toLowerCase().includes(searchStr)
  //   );
  // });

  // const displayedData: Company[] = filteredData.slice(startIndex, endIndex);/

  return (
    <DataTable
      data={plan}
      columns={tableColumns}
      rowKey={(plan) => plan.PlanID}
      selectable
      actions={(plan) => <ActonModal />}
    />
  );
};
