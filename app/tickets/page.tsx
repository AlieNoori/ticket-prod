import prisma from '@/prisma/db';
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';

type TicketsProps = {
  searchParams: { page: string };
};

async function Tickets({ searchParams }: TicketsProps) {
  const pageSize = 7;
  const page = parseInt(searchParams.page) || 1;

  const ticketsCount = await prisma.ticket.count();
  const tickets = await prisma.ticket.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <div>
      <Link
        href="/tickets/new"
        className={buttonVariants({ variant: 'default' })}
      >
        New Ticket
      </Link>
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
