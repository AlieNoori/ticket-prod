import prisma from '@/prisma/db';
import DataTable from './DataTable';

async function Tickets() {
  const pageSize = 5;
  const page = 1;

  const tickets = await prisma.ticket.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div>
      <DataTable tickets={tickets} />
    </div>
  );
}

export default Tickets;
