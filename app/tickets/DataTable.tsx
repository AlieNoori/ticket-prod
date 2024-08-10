import TicketPriority from '@/components/TicketPriority';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Ticket } from '@prisma/client';
import Link from 'next/link';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { OrderKey, SearchParams } from './page';

type DataTableProps = {
  tickets: Ticket[];
  searchParams: SearchParams;
};

function DataTable({ tickets, searchParams }: DataTableProps) {
  function renderSortArrow(field: string) {
    if (searchParams.orderBy === `${field}-asc`) {
      return <ArrowDown className="inline p-1" />;
    }
    if (searchParams.orderBy === `${field}-desc`) {
      return <ArrowUp className="inline p-1" />;
    }
    return null;
  }

  function createOrderByLink(field: OrderKey) {
    const newOrderBy =
      searchParams.orderBy === `${field}-asc`
        ? `${field}-desc`
        : `${field}-asc`;
    return {
      ...searchParams,
      orderBy: newOrderBy,
    };
  }

  return (
    <div className="mt-5 w-full">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Link href={{ query: createOrderByLink('title') }}>Title</Link>
                {renderSortArrow('title')}
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link href={{ query: createOrderByLink('status') }}>
                    Status
                  </Link>
                  {renderSortArrow('status')}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link href={{ query: createOrderByLink('priority') }}>
                    Priority
                  </Link>
                  {renderSortArrow('priority')}
                </div>
              </TableHead>
              <TableHead>
                <Link href={{ query: createOrderByLink('createdAt') }}>
                  Created At
                </Link>
                {renderSortArrow('createdAt')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets?.map((ticket) => (
              <TableRow key={ticket.id} data-href="/">
                <TableCell>
                  <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <TicketStatusBadge status={ticket.status} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <TicketPriority priority={ticket.priority} />
                  </div>
                </TableCell>
                <TableCell>
                  {ticket.createdAt.toLocaleDateString('en-US', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DataTable;
