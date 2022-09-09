import MemberTable from './members';
import HorseTable from './horses';
import OwnerTable from './owners';
import TableWithData from './tablewithdata';

export type TableSelection = 'members' | 'horses' | 'riders' | 'owners';
export { TableWithData, MemberTable, HorseTable, OwnerTable };
