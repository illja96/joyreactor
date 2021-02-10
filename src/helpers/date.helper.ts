export abstract class DateHelper {
  public static getTotalWeeks(year: number): number {
    const start = new Date(year, 0, 0);
    const end = new Date(year + 1, 0, 0);

    const startTimestamp = start.getTime();
    const endTimestamp = end.getTime();

    const differenceInMs = endTimestamp - startTimestamp;
    const differenceInWeeks = Math.ceil(differenceInMs / 604800000);

    return differenceInWeeks;
  }

  public static getWeek(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);

    const startTimestamp = start.getTime();
    const endTimestamp = date.getTime();

    const differenceInMs = endTimestamp - startTimestamp;
    console.log(differenceInMs);
    const differenceInWeeks = Math.floor(differenceInMs / 604800000);
    console.log(differenceInWeeks);

    return differenceInWeeks;
  }
}