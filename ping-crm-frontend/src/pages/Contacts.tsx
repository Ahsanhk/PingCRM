import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import { getContacts, getOrganizations } from '../services/api';

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  organization_name?: string;
  organization_id?: number;
  city?: string;
  phone?: string;
  email?: string;
  address?: string;
  province_state?: string;
  postal_code?: string;
  country?: string;
}

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filter, setFilter] = useState<string>('false');
  const [organizations, setOrganizations] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    fetchContacts();
    fetchOrganizations();
  }, [currentPage, searchValue, filter]);

  const fetchContacts = async () => {
    try {
      const data = await getContacts(currentPage, searchValue, filter);
      if (data) {
        setContacts(data.items);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const data = await getOrganizations();
      if (data) {
        setOrganizations(data.items);
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

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
      <h2 className="text-2xl font-semibold mb-4">Contacts</h2>
      <DataTable
        data={contacts}
        columns={['Name', 'Organization', 'City', 'Phone']}
        onSearch={handleSearch}
        searchValue={searchValue}
        onPageChange={handlePageChange}
        totalPages={totalPages}
        currentPage={currentPage}
        isContactData={true}
        onFilterChange={handleFilterChange}
        organizations={organizations}
      />
    </div>
  );
};

export default Contacts;
