export function setMembershipYear() {
  const currDate = new Date();
  const endDate = new Date(currDate.getFullYear(), 10, 30);

  // If the current month is decemeber
  if (currDate.getMonth() == 11) {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  return endDate;
}
