import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DataTableBodyProps {
  data: any[];
  columns: string[];
  columnMapping: Record<string, (item: any) => any>;
  isContactData?: boolean;
}

const DataTableBody: React.FC<DataTableBodyProps> = ({
  data,
  columns,
  columnMapping,
  isContactData = false,
}) => {
  const navigate = useNavigate();

  const handleRowClick = (item: any) => {
    navigate(`/${isContactData ? 'contact' : 'organization'}/edit`, {
      state: { formData: item },
    });
  };

  if (!data || !columns) {
    return <div>Loading...</div>;
  }

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="px-4 py-2 text-left border-b">{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr
              key={index}
              className={`cursor-pointer hover:bg-gray-100 ${item.is_deleted ? 'bg-red-100' : ''}`}
              onClick={() => handleRowClick(item)}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-4 py-2 border-b">
                  {item.is_deleted && column === 'Name' ? (
                    <span className="text-red-500 flex items-center">
                      {columnMapping[column](item)}
                    </span>
                  ) : (
                    columnMapping[column](item)
                  )}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center py-4">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DataTableBody;
