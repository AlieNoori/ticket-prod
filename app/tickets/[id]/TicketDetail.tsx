import { Ticket, User } from '@prisma/client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import TicketPriority from '@/components/TicketPriority';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import DeleteButton from './DeleteButton';
import AssignTicket from '@/components/AssignTicket';

type TicketDetailProps = {
  ticket: Ticket;
  users: User[];
};

function TicketDetail({ ticket, users }: TicketDetailProps) {
  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="mx-4 mb-4 lg:col-span-3 lg:mr-4">
        <CardHeader>
          <div className="mb-3 flex justify-between">
            <TicketStatusBadge status={ticket.status} />
            <TicketPriority priority={ticket.priority} />
          </div>

          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription>
            Created:{' '}
            {ticket.createdAt.toLocaleDateString('en-US', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert">
          <ReactMarkdown>{ticket.description}</ReactMarkdown>
        </CardContent>
        <CardFooter>
          Created:{' '}
          {ticket.updatedAt.toLocaleDateString('en-US', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })}
        </CardFooter>
      </Card>
      <div className="mx-4 flex gap-2 lg:mx-0 lg:flex-col">
        <AssignTicket ticket={ticket} users={users} />
        <Link
          href={`/tickets/edit/${ticket.id}`}
          className={`${buttonVariants({
            variant: 'default',
          })}`}
        >
          Edit Ticket
        </Link>
        <DeleteButton ticketId={ticket.id} />
      </div>
    </div>
  );
}

export default TicketDetail;
