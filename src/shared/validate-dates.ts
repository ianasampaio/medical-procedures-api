import { parseISO, isAfter } from 'date-fns';
import { BadRequestException } from '@nestjs/common';

export function validateDates(startDate: string, endDate: string) {
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  if (isAfter(start, end)) {
    throw new BadRequestException(
      'Start date must be before or equal to end date.',
    );
  }
}
