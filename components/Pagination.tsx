'use client';

import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from './ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

function Pagination({ itemCount, pageSize, currentPage }: PaginationProps) {
  const pageCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  if (pageCount <= 1) return null;

  function ChagePage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="mb-4 mt-4 flex justify-between">
      <div className="space-x-2">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => ChagePage(1)}
        >
          <ChevronFirst />
        </Button>
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => ChagePage(currentPage - 1)}
        >
          <ChevronLeft />
        </Button>
      </div>
      <div>
        <p>
          Page {currentPage} of {pageCount}
        </p>
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          disabled={currentPage === pageCount}
          onClick={() => ChagePage(currentPage + 1)}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          disabled={currentPage === pageCount}
          onClick={() => ChagePage(pageCount)}
        >
          <ChevronLast />
        </Button>{' '}
      </div>
    </div>
  );
}

export default Pagination;
