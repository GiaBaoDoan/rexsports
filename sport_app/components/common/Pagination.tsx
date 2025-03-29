"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { useQueryParams } from "@/hooks/use-params";
import { PaginationRes } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  MdKeyboardDoubleArrowLeft,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const PaginationCustom = ({ pagination }: { pagination: PaginationRes }) => {
  const { updateQuery } = useQueryParams();
  const searchParams = useSearchParams();

  // Chuyển đến trang đầu
  const handleFirstPage = () => {
    if (pagination.currentPage > 1) {
      updateQuery("page", "1");
    }
  };

  // Chuyển đến trang cuối
  const handleLastPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      updateQuery("page", `${pagination.totalPages}`);
    }
  };

  // Trang tiếp theo
  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      updateQuery("page", `${pagination.currentPage + 1}`);
    }
  };

  // Trang trước đó
  const handlePreviousPage = () => {
    if (pagination.currentPage > 1) {
      updateQuery("page", `${pagination.currentPage - 1}`);
    }
  };

  // Chọn số hàng mỗi trang
  const handleLimitPage = (limit: string) => {
    updateQuery("limit", limit);
  };

  return (
    <div className="flex justify-between items-center mt-5">
      <span className="text-sm inline-block">
        0 of {pagination?.totalRecords} row(s) selected.
      </span>
      <Pagination className="m-0 flex items-center gap-5 w-auto">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Row per pages: </span>
          <Select
            value={`${searchParams.get("limit") ?? pagination.limit}`}
            onValueChange={handleLimitPage}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="1" />
            </SelectTrigger>
            <SelectContent className="text-sm">
              <SelectGroup>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <PaginationContent className="gap-3">
          <p className="text-sm font-medium">
            Page {pagination?.currentPage} of {pagination?.totalPages}
          </p>
          {/* frist page */}
          <PaginationItem className="cursor-pointer">
            <Button
              variant="outline"
              disabled={pagination.currentPage === 1}
              onClick={handleFirstPage}
            >
              <MdKeyboardDoubleArrowLeft />
            </Button>
          </PaginationItem>
          {/* pre page */}
          <PaginationItem className="cursor-pointer">
            <Button variant="outline" onClick={handlePreviousPage}>
              <MdOutlineKeyboardArrowLeft />
            </Button>
            {/* <PaginationPrevious />s */}
          </PaginationItem>
          {/* next page */}
          <PaginationItem className="cursor-pointer">
            <Button variant="outline" onClick={handleNextPage}>
              <MdOutlineKeyboardArrowRight />
            </Button>
          </PaginationItem>
          {/* last page */}
          <PaginationItem className="cursor-pointer">
            <Button
              variant="outline"
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={handleLastPage}
            >
              <MdOutlineKeyboardDoubleArrowRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationCustom;
