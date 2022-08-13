import MemberTable from './members';
import { HorseTable, OwnerTable, Points, TableSelection } from '.';

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
    case 'points':
      return <Points />;
    case 'ridercombos':
    default:
      return <>No valid table...</>;
  }
}

export default TablePicker;
