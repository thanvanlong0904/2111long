"use client";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  className,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const getPageNumbers = (): Array<number | string> => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: Array<number | string> = [];
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    pages.push(1);

    if (left > 2) {
      pages.push("ellipsis-left");
    }

    for (let page = left; page <= right; page++) {
      pages.push(page);
    }

    if (right < totalPages - 1) {
      pages.push("ellipsis-right");
    }

    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      className={cn("bg-gray-50 px-6 py-4 border-t border-gray-200", className)}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700">
          Hiển thị{" "}
          <span className="font-semibold">
            {startIndex} - {endIndex}
          </span>{" "}
          trong tổng số <span className="font-semibold">{totalItems}</span> sản
          phẩm
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "p-2 rounded-lg transition-colors",
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-300"
            )}
            aria-label="Trang trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1">
            {pageNumbers.map((page, index) =>
              typeof page === "number" ? (
                <button
                  key={`page-${page}`}
                  onClick={() => handlePageChange(page)}
                  className={cn(
                    "min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    currentPage === page
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-300"
                  )}
                >
                  {page}
                </button>
              ) : (
                <span
                  key={`${page}-${index}`}
                  className="px-2 text-gray-500 select-none"
                >
                  ...
                </span>
              )
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "p-2 rounded-lg transition-colors",
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-300"
            )}
            aria-label="Trang sau"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
