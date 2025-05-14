import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import { getOrganizations } from '../services/api';

export interface Organization {
  id: number;
  name: string;
  industry: string;
  is_deleted: boolean; 
}

const Organizations: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filter, setFilter] = useState('false');

  useEffect(() => {
    const fetchOrganizations = async () => {
      const organizations = await getOrganizations(currentPage, searchValue, filter);
      setOrganizations(organizations.items);
      setTotalPages(organizations.totalPages);
    };

    fetchOrganizations();
  }, [currentPage, searchValue, filter]); 

  const handleSearch = (query: string) => {
    setSearchValue(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
    setCurrentPage(1); 
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Organizations</h2>
      <DataTable
        data={organizations}
        columns={['Name', 'City', 'Phone']}
        onSearch={handleSearch}
        searchValue={searchValue}
        onPageChange={handlePageChange}
        totalPages={totalPages}
        currentPage={currentPage}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default Organizations;
