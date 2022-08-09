import MemberTable from './members';
import { HorseTable, TableSelection } from '.';

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
    case 'ridercombos':
    case 'points':
    default:
      return <>No valid table...</>;
  }
}

export default TablePicker;
