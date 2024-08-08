import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/db';
import { ticketSchema } from '@/ValidationSchemas/ticket';

export async function POST(requst: NextRequest) {
  const body = await requst.json();
  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newTicket = await prisma.ticket.create({
    data: { ...body },
  });

  return NextResponse.json(newTicket, { status: 201 });
}
