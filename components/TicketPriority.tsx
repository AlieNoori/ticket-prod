import { Priority } from '@prisma/client';
import { Flame } from 'lucide-react';

type TicketPriorityProps = {
  priority: Priority;
};

const priorityMap: Record<Priority, { label: String; level: 1 | 2 | 3 }> = {
  HIGH: { label: 'High', level: 3 },
  MEDIUM: { label: 'Medium', level: 2 },
  LOW: { label: 'Low', level: 1 },
};

function TicketPriority({ priority }: TicketPriorityProps) {
  return (
    <div className="flex justify-between">
      <Flame
        className={`${priorityMap[priority].level >= 1 ? 'text-red-500' : 'text-muted'}`}
      />
      <Flame
        className={`${priorityMap[priority].level >= 2 ? 'text-red-500' : 'text-muted'}`}
      />
      <Flame
        className={`${priorityMap[priority].level >= 3 ? 'text-red-500' : 'text-muted'}`}
      />
    </div>
  );
}

export default TicketPriority;
