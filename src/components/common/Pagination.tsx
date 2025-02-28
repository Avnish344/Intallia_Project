import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center justify-between space-x-2 mt-2">
            <Button
                variant="ghost"
                className="gap-2 w-[111px] h-[37px] bg-gradient-to-r from-[#0DAFDC] to-[#22E9A2] p-[2px] rounded-full py-2 pl-2 pr-4"
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="w-4 h-4" />
                Previous
            </Button>
            <div className="flex justify-center">
                {[
                    1,
                    2,
                    3,
                    "...",
                    totalPages - 2,
                    totalPages - 1,
                    totalPages,
                ].map((page, i) => (
                    <Button
                        key={i}
                        variant={page === currentPage ? "secondary" : "ghost"}
                        className="w-10 h-10 p-0"
                        onClick={() => {
                            if (typeof page === "number") {
                                onPageChange(page);
                            }
                        }}
                        disabled={typeof page !== "number"}
                    >
                        {page}
                    </Button>
                ))}
            </div>
            <Button
                variant="ghost"
                className="gap-2 w-[83px] h-[37px] bg-gradient-to-r from-[#0DAFDC] to-[#22E9A2] p-[2px] rounded-full py-2 pr-2 pl-4"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Next
                <ChevronRight className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default Pagination;
