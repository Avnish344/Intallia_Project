import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { deleteCompany } from "@/axios/api";

export const useDeleteCompany = (): UseMutationResult<any, Error, string, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
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
};
