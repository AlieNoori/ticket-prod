'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type StatusFilterProps = {};

const statuses: { label: string; value?: string }[] = [
  { label: 'Open / Started' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Started', value: 'STARTED' },
  { label: 'Closed', value: 'CLOSED' },
];

function StatusFilter(props: StatusFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function changeStatus(status: string) {
    const params = new URLSearchParams();
    if (status) params.append('status', status);

    const query = params.size ? `?${params.toString()}` : '0';
    router.push(`/tickets${query}`);
  }

  return (
    <Select
      defaultValue={searchParams.get('status') || ''}
      onValueChange={changeStatus}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filter by Status..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statuses.map((status) => (
            <SelectItem value={status.value || '0'} key={status.value || '0'}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default StatusFilter;
