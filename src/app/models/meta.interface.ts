export interface IDateRange {
  start: Date;
  end: Date;
}

export interface IMetaData {
  id: string;
  title: string;
  period: IDateRange;
}
