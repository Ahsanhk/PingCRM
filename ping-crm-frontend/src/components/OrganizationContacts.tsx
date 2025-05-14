import React, { useEffect, useState } from "react";
import DataTableBody from "./DataTableBody";
import { getContact } from "../services/api";

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  phone?: string;
  city?: string;
  organization_name?: string;
  is_deleted: boolean;
}

interface Props {
  organizationId: number;
}

const OrganizationContacts: React.FC<Props> = ({ organizationId }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  const columns = ["Name", "Organization", "City", "Phone"];

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContact(organizationId);
        setContacts(data);
        setFilteredContacts(data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [organizationId]);

  type ContactColumn = "Name" | "Organization" | "City" | "Phone";

  const contactColumnMapping: Record<ContactColumn, (contact: any) => any> = {
    Name: (contact) => `${contact.first_name} ${contact.last_name}`,
    Organization: (contact) => contact.organization_name,
    City: (contact) => contact.city,
    Phone: (contact) => contact.phone,
  };

  if (loading) return <div>Loading contacts...</div>;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Contacts</h3>
      <div className="bg-white rounded-lg shadow-md p-4">
        <DataTableBody
          data={filteredContacts}
          columns={columns}
          columnMapping={contactColumnMapping}
          isContactData={true}
        />
      </div>
    </div>
  );
};

export default OrganizationContacts;
