import { Status } from '@prisma/client';
import { Badge } from './ui/badge';

type TicketStatusBadgeProps = {
  status: Status;
};

const stausMap: Record<
  Status,
  { label: String; color: 'bg-red-400' | 'bg-blue-400' | 'bg-green-400' }
> = {
  OPEN: { label: 'Open', color: 'bg-red-400' },
  CLOSED: { label: 'Closed', color: 'bg-green-400' },
  STARTED: { label: 'Started', color: 'bg-blue-400' },
};

function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  return (
    <Badge
      className={`${stausMap[status].color} text-background hover:${stausMap[status].color}`}
    >
      {stausMap[status].label}
    </Badge>
  );
}

export default TicketStatusBadge;
