import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompany } from "@/http/api";
import { useNavigate } from "react-router-dom";

// Define props
interface Company {
  CompanyId: string;
  // Add other fields if needed
}


interface Props {
  company?: Company;
}

const ActionModal: React.FC<Props> = ({ company }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  // Inside ActionModal component
  const navigate = useNavigate();

  const handleEdit = () => {
  if (!company || !company.CompanyId) {
    console.error("Company is undefined or missing CompanyId");
    return;
  }
  setOpen(false);
  navigate(`/add-company?companyId=${company.CompanyId}`);
};

  const queryClient = useQueryClient();

  const deleteCompanyMutation = useMutation({
    mutationFn: async (companyId: string) => {
      const payload = {
        JSON: JSON.stringify({
          Header: [{ CompanyId: companyId }],
          Response: [{ ResponseText: "", ErrorCode: "" }],
        }),
      };
      return await deleteCompany(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: (error) => {
      console.error("Delete failed:", error);
      alert("Failed to delete company.");
    },
  });

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAction = (label: string) => {
    alert(`You clicked: ${label}`);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="text-gray-600 hover:text-black text-2xl px-2 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
      >
        ⋮
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              type="button"
              onClick={handleEdit}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Edit Company
            </button>
            <button
              className="text-red-500 hover:underline px-4 py-2 text-sm w-full text-left"
              onClick={() => deleteCompanyMutation.mutate(company.CompanyId)}
              disabled={deleteCompanyMutation.isPending}
            >
              {deleteCompanyMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionModal;
