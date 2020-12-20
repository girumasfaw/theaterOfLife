import { IMetaData } from './meta.interface';

export interface IRole {
  metadata: IMetaData;
  action: string;
  frequency: number[];
  completedDates: Date[];
  labelColor: string;
  personaIcon: string;
}
