import { IMetaData } from './meta.interface';
import { IRole } from './role.interface';

export interface IArea {
  metadata: IMetaData;
  roles: IRole[];
}
