import Image from 'next/image';
import prisma from '@/prisma/db';
import DashRecentTickets from '@/components/DashRecentTickets';
import DashChart from '@/components/DashChart';

export default async function Home() {
  const tickets = await prisma.ticket.findMany({
    where: {
      NOT: [{ status: 'CLOSED' }],
    },
    orderBy: {
      updatedAt: 'desc',
    },
    skip: 0,
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  const groupTicket = await prisma.ticket.groupBy({
    by: ['status'],
    _count: {
      id: true,
    },
  });

  const data = groupTicket.map((item) => ({
    name: item.status,
    totla: item._count.id,
  }));

  return (
    <main>
      <div className="grid gap-4 px-2 md:grid-cols-2">
        <div>
          <DashRecentTickets tickets={tickets} />
        </div>
        <div>
          <DashChart data={data} />
        </div>
      </div>
    </main>
  );
}
