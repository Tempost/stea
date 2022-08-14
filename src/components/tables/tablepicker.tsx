import MemberTable from './members';
import { HorseTable, OwnerTable, TableSelection } from '.';
import RidersTable from './ridercombos';

interface TablePickerProps {
  table: TableSelection;
}

function TablePicker({ table }: TablePickerProps) {
  switch (table) {
    case 'members':
      return <MemberTable />;
    case 'horses':
      return <HorseTable />;
    case 'owners':
      return <OwnerTable />;
    case 'riders':
      return <RidersTable />;
    default:
      return <>No valid table...</>;
  }
}

export default TablePicker;
