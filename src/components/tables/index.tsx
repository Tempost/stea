import MemberTable from './members';
import HorseTable from './horses';
import OwnerTable from './owners';
import ShowsTable from './shows';
import TableWithData from './tablewithdata';

export type TableSelection = 'members' | 'horses' | 'riders' | 'owners' | 'shows';
export { TableWithData, MemberTable, HorseTable, OwnerTable, ShowsTable };
