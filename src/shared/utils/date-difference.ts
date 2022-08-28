const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function dateDiffInDays(dateA: Date, dateB: Date) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
  const utc2 = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export default dateDiffInDays;
