'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import { useCallback } from 'react';

type TicketTablePaginationProps = {
  numPages: number;
};

function TicketTablePagination({ numPages }: TicketTablePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const key = searchParams.toString().split('=').at(0) || 'page';
  const value = Number(searchParams.toString().split('=').at(1)) || 1;

  const updateSearchParams = useCallback(
    (key: string, value: number) => {
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set(key, String(value));
      router.push(`${pathname}?${key}=${value}`, { scroll: false });
    },
    [router, pathname]
  );

  function handleNext() {
    if (value + 1 <= numPages) updateSearchParams(key, value + 1);
  }

  function handlePrev() {
    if (value - 1 >= 1) updateSearchParams(key, value - 1);
  }

  return (
    <Pagination className="w-full">
      <PaginationContent className="flex w-full justify-between">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePrev()}
            className="cursor-pointer"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>{value}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => handleNext()}
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default TicketTablePagination;
