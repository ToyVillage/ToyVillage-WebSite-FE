interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  onRowClick?: (row: T) => void;
}

export default function AdminTable<T>({
  columns,
  rows,
  onRowClick,
}: AdminTableProps<T>) {
  console.log(rows);
  
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={String(col.key)}
                className={`px-6 py-4 text-body-3 font-semibold text-gray-600 ${idx === 0 ? 'w-full' : ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-body-3 text-gray-400">
                데이터가 없습니다.
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(row)}
                className={`bg-white transition-colors ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
              >
                {columns.map((col, idx) => (
                  <td
                    key={String(col.key)}
                    className={`px-6 py-4 text-body-3 text-black whitespace-nowrap ${idx === columns.length - 1 ? 'text-right' : ''}`}
                  >
                    {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key as string] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
