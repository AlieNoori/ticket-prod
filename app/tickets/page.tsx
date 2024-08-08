import prisma from '@/prisma/db';
import DataTable from './DataTable';
import TicketTablePagination from '@/components/TicketTablePagination';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

type Props = {
  searchParams: { page: Number };
};

async function Tickets({ searchParams }: Props) {
  const count = await prisma.ticket.count();
  const pageSize = 7;
  const page = Number(searchParams.page);

  const tickets = await prisma.ticket.findMany({
    skip: page ? (page - 1) * pageSize : 1,
    take: pageSize,
  });
  const numPages = Math.ceil(count / pageSize);

  return (
    <div className="space-y-4">
      <Link
        href="/tickets/new"
        className={buttonVariants({ variant: 'default' })}
      >
        New Ticket
      </Link>
      <DataTable tickets={tickets} />
      <TicketTablePagination numPages={numPages} />
    </div>
  );
}

export default Tickets;
