import MemberTable from './members';
import HorseTable from './horses';
import OwnerTable from './owners';
import Points from './points';
import TableWithData from './tablewithdata';

export type TableSelection =
  | 'members'
  | 'horses'
  | 'ridercombos'
  | 'points'
  | 'owners';
export { TableWithData, MemberTable, HorseTable, OwnerTable, Points };
