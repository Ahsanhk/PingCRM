import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTableBody from './DataTableBody';

export interface DataTableProps {
  data: any[];
  columns: string[];
  onSearch: (query: string) => void;
  searchValue: string;
  onPageChange: (page: number) => void;
  totalPages: number;
  currentPage: number;
  isContactData?: boolean;
  onFilterChange: (filter: string) => void;
  organizations?: { id: number; name: string }[];
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  onSearch,
  searchValue,
  onPageChange,
  totalPages,
  currentPage,
  isContactData = false,
  onFilterChange,
}) => {
  const [filter, setFilter] = useState('false');
  const navigate = useNavigate();

  type ContactColumn = 'Name' | 'Organization' | 'City' | 'Phone';
  type OrganizationColumn = 'Name' | 'City' | 'Phone';

  const contactColumnMapping: Record<ContactColumn, (contact: any) => any> = {
    Name: (contact) => `${contact.first_name} ${contact.last_name}`,
    Organization: (contact) => contact.organization_name,
    City: (contact) => contact.city,
    Phone: (contact) => contact.phone,
  };

  const organizationColumnMapping: Record<OrganizationColumn, (organization: any) => any> = {
    Name: (organization) => organization.name,
    City: (organization) => organization.city,
    Phone: (organization) => organization.phone,
  };

  const columnMapping = isContactData ? contactColumnMapping : organizationColumnMapping;

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    onFilterChange(selectedFilter);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <select
            className="border p-2 rounded mr-4"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="false">Default</option>
            <option value="all">With Trashed</option>
            <option value="true">Only Trashed</option>
          </select>
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() =>
            navigate(`/${isContactData ? 'contact' : 'organization'}/add`, {
              state: { type: isContactData ? 'contact' : 'organization' },
            })
          }
        >
          Add New {isContactData ? 'Contact' : 'Organization'}
        </button>
      </div>

      <DataTableBody
        data={data}
        columns={columns}
        columnMapping={columnMapping}
        isContactData={isContactData}
      />

      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-gray-500 text-white p-2 rounded"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="bg-gray-500 text-white p-2 rounded"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
