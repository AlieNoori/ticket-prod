import prisma from '@/prisma/db';
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import { Status } from '@prisma/client';

type TicketsProps = {
  searchParams: { page: string; status: Status };
};

async function Tickets({ searchParams }: TicketsProps) {
  const pageSize = 7;
  const page = parseInt(searchParams.page) || 1;

  const statues = Object.values(Status);

  const status = statues.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let where = {};

  status
    ? (where = { status })
    : (where = { NOT: [{ status: 'CLOSED' as Status }] });

  const ticketsCount = await prisma.ticket.count({ where });
  const tickets = await prisma.ticket.findMany({
    where,
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
      <DataTable tickets={tickets} />
      <Pagination
        itemCount={ticketsCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
}

export default Tickets;
