const convertToDate = (date: string): Date => {
    return new Date(date);
}

const convertDateToString = (date: Date): string => {
    return date.toISOString();
}
export {convertToDate, convertDateToString}
