import React from 'react';

interface FormFieldsProps {
  type: 'contact' | 'organization';
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  organizations?: { id: number; name: string }[];
  mode: 'edit' | 'add';
  handleUpdate?: () => void;
  handleDelete?: () => void;
}

const FormFields: React.FC<FormFieldsProps> = ({
  type,
  formData,
  handleChange,
  organizations = [],
  mode,
  handleDelete,
  handleUpdate,
}) => {
  const renderActionButtons = () => {
    if (mode === 'add') {
      return (
        <div className="flex justify-end mt-6">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            {type === 'organization' ? 'Add Organization' : 'Add Contact'}
          </button>
        </div>
      );
    }

    if (mode === 'edit') {
      return (
        <div className="flex justify-between mt-6">
          <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600" onClick={handleDelete}>
            {type === 'organization' ? 'Delete Organization' : 'Delete Contact'}
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700" onClick={handleUpdate}>
            {type === 'organization' ? 'Update Organization' : 'Update Contact'}
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className='bg-white p-10 border rounded-lg'>
      {type === 'contact' ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg border-gray-300"
                required
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg border-gray-300"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="organization_id" className="block font-medium text-gray-700 mt-4">Organization</label>
            <select
              id="organization_id"
              name="organization_id"
              value={formData.organization_id}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg border-gray-300"
            >
              <option value="">Select an organization</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">Organization Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg border-gray-300"
            required
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg border-gray-300"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block font-medium text-gray-700">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg border-gray-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="address" className="block font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg border-gray-300"
          />
        </div>
        <div>
          <label htmlFor="city" className="block font-medium text-gray-700">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg border-gray-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="province_state" className="block font-medium text-gray-700">Province/State</label>
          <input
            type="text"
            id="province_state"
            name="province_state"
            value={formData.province_state}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg border-gray-300"
          />
        </div>
        <div>
          <label htmlFor="postal_code" className="block font-medium text-gray-700">Postal Code</label>
          <input
            type="text"
            id="postal_code"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg border-gray-300"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="country" className="block font-medium text-gray-700">Country</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg border-gray-300"
        >
          <option value="">Select country</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
        </select>
      </div>

      {renderActionButtons()}
      
    </div>
  );
};

export default FormFields;
