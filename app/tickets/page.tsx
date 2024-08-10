import prisma from '@/prisma/db';
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import { Status, Ticket } from '@prisma/client';

export type OrderKey = keyof Ticket;
export type SortOrder = 'asc' | 'desc';
type OrderBy = `${OrderKey}-${SortOrder}`;

export type SearchParams = {
  page: string;
  status: Status;
  orderBy: OrderBy;
};

type TicketsProps = {
  searchParams: SearchParams;
};

async function Tickets({ searchParams }: TicketsProps) {
  const pageSize = 7;
  const page = parseInt(searchParams.page) || 1;

  const orderKey = searchParams.orderBy
    ? (searchParams.orderBy.split('-').at(0) as OrderKey)
    : 'createdAt';

  const direction = searchParams.orderBy
    ? (searchParams.orderBy.split('-').at(1) as SortOrder)
    : 'desc';

  const statues = Object.values(Status);

  const status = statues.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = status ? { status } : { NOT: [{ status: 'CLOSED' as Status }] };

  const ticketsCount = await prisma.ticket.count({ where });
  const tickets = await prisma.ticket.findMany({
    where,
    orderBy: {
      [orderKey]: direction,
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <div>
      <div className="flex gap-2">
        <Link
          href="/tickets/new"
          className={buttonVariants({ variant: 'default' })}
        >
          New Ticket
        </Link>
        <StatusFilter />
      </div>
      <DataTable tickets={tickets} searchParams={searchParams} />
      <Pagination
        itemCount={ticketsCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
}

export default Tickets;
