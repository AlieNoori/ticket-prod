import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/db';
import { ticketPatchSchema } from '@/ValidationSchemas/ticket';
import { revalidateTag } from 'next/cache';
import { getServerSession } from 'next-auth';
import options from '../../auth/[...nextauth]/options';

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();

  const validation = ticketPatchSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket)
    return NextResponse.json({ error: 'Ticket Not Found' }, { status: 404 });

  if (body?.assignedToUserId)
    body.assignedToUserId = parseInt(body.assignedToUserId);

  const updatedTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: {
      ...body,
    },
  });

  return NextResponse.json(updatedTicket);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket)
    return NextResponse.json({ error: 'Ticket Not Found' }, { status: 404 });

  await prisma.ticket.delete({ where: { id: ticket.id } });

  revalidateTag(`/ticket/${params.id}`);

  return NextResponse.json({ message: 'Ticket Deleted' });
}
