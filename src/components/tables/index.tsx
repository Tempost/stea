import MemberTable from './Members';
import HorseTable from './Horses';
import OwnerTable from './Owners';
import ShowsTable from './Shows';
import PlacingsTable from './Placings';
import RidersTable from './RiderCombos';
import TableWithData from './BaseTable';

export type TableSelection =
  | 'members'
  | 'horses'
  | 'riders'
  | 'owners'
  | 'shows';

export {
  TableWithData,
  MemberTable,
  HorseTable,
  OwnerTable,
  ShowsTable,
  PlacingsTable,
  RidersTable,
};
