const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export function dateDiffInDays(startDate: Date, endDate: Date) {
  const utc1 = Date.UTC(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  );
  const utc2 = Date.UTC(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
  );

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export function dateDiffInHours(startDate: Date, endDate: Date) {
  const msInHour = 1000 * 60 * 60;

  return Math.round(
    Math.abs(endDate.getTime() - startDate.getTime()) / msInHour,
  );
}
