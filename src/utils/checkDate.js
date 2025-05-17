export function isToday(dateString) {
  const inputDate = new Date(dateString);
  const today = new Date();

  return (
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getDate() === today.getDate()
  );
}

export function getDaysUntilNow(dateString) {
  const pastDate = new Date(dateString);
  const currentDate = new Date();
  const differenceMs = currentDate - pastDate;
  const daysDifference = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
  
  return Math.abs(daysDifference);
}