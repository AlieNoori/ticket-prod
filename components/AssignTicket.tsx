'use client';

import { useState } from 'react';
import axios from 'axios';
import { Ticket, User } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { revalidatePath } from 'next/cache';

type AssignTicketProps = {
  ticket: Ticket;
  users: User[];
};

function AssignTicket({ ticket, users }: AssignTicketProps) {
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState('');

  async function assignTicket(userId: string) {
    setError('');
    setIsAssigning(true);

    await axios
      .patch(`/api/tickets/${ticket.id}`, {
        assignedToUserId: userId === '0' ? null : userId,
      })
      .catch(() => setError('Unable to Assign Ticket.'));

    setIsAssigning(false);
  }

  return (
    <div>
      <Select
        defaultValue={ticket.assignedToUserId?.toString() || '0'}
        onValueChange={assignTicket}
        disabled={isAssigning}
      >
        <SelectTrigger>
          <SelectValue
            placeholder="Select User..."
            defaultValue={ticket.assignedToUserId?.toString() || '0'}
          ></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Unassign</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-destructive">{error}</p>
    </div>
  );
}

export default AssignTicket;
