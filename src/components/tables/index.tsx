import MemberTable from './members';
import HorseTable from './horses';
import TableWithData from './tablewithdata';

export type TableSelection =
  | 'members'
  | 'horses'
  | 'ridercombos'
  | 'points'
  | 'owners';
export { TableWithData, MemberTable, HorseTable };
