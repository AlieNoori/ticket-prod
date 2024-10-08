'use client';

import { ticketSchema } from '@/ValidationSchemas/ticket';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Ticket } from '@prisma/client';

type TicketFormData = z.infer<typeof ticketSchema>;

type TicketFormProps = {
  ticket?: Ticket;
};

function TicketForm({ ticket }: TicketFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const form = useForm<TicketFormData>({ resolver: zodResolver(ticketSchema) });

  async function onSubmit(values: z.infer<typeof ticketSchema>) {
    try {
      setIsSubmitting(true);
      setError('');

      ticket
        ? await axios.patch(`/api/tickets/${ticket.id}`, values)
        : await axios.post('/api/tickets', values);
      setIsSubmitting(false);

      router.push('/tickets');
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      setError('Unknown Error Occured.');
    }
  }

  return (
    <div className="w-full rounded-md border p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            defaultValue={ticket?.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ticket Title..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Controller
            name="description"
            defaultValue={ticket?.description}
            control={form.control}
            render={({ field }) => (
              <SimpleMDE placeholder="description" {...field} />
            )}
          />
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="status"
              defaultValue={ticket?.status}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={ticket?.status}
                          placeholder="Status..."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="STARTED">Started</SelectItem>
                      <SelectItem value="CLOSED">CLosed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              defaultValue={ticket?.priority}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={ticket?.priority}
                          placeholder="Priority..."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {ticket ? 'Update Ticket' : 'Create Ticket'}
          </Button>
        </form>
      </Form>
      <p className="text-destructive">{error}</p>
    </div>
  );
}

export default TicketForm;
