import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";

type TProps = {
  onPrevious: () => void;
  onNext: () => void;
  page: number;
  totalPages: number;
};

export default function CustomPagination({
  onNext,
  onPrevious,
  page,
  totalPages,
}: TProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={onPrevious}
            disabled={page === 1}
            variant={"outline"}
          >
            Previous
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <Button
            disabled={page === totalPages}
            onClick={onNext}
            variant={"outline"}
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
