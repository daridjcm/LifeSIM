import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
} from '@heroui/react';

const ReusableTable = ({
  type,
  data = [],
  columns = [],
  renderCell,
  status,
}) => {
  const isStatusColumn = (key) => key === 'status' && status;

  return (
    <Table
      aria-label={`${type} table`}
      shadow='md'
      color='primary'
      defaultSelectedKeys={[data[0]?.id]}
      selectionMode='single'
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key || column.uid}
            align={column.align || (column.uid === 'date' ? 'center' : 'start')}
          >
            {column.label || column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent={`No ${type} data to display.`} items={data}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {type === 'appointments' && renderCell ? (
                  renderCell(item, columnKey)
                ) : isStatusColumn(columnKey) ? (
                  <Chip color={status.color[item.status - 1]}>
                    {status.label[item.status - 1]}
                  </Chip>
                ) : (
                  item[columnKey]
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ReusableTable;
