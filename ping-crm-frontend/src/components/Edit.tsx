import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FormFields from "./FormField";
import axios from "axios";
import OrganizationContacts from "./OrganizationContacts";
import RestoreNotification from "./Restore";
import { deleteEntity, getOrganizations, updateEntity } from "../services/api";

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const originalData = location.state?.formData;

  const [formData, setFormData] = useState<any>(originalData);
  const [organizations, setOrganizations] = useState<
    { id: number; name: string }[]
  >([]);

  const isContact = "first_name" in formData && "last_name" in formData;
  const title = isContact
    ? `Contact/${formData.first_name} ${formData.last_name}`
    : `Organization/${formData.name}`;

  const type = isContact ? "contact" : "organization";

  useEffect(() => {
    if (isContact) {
      getOrganizations().then(setOrganizations).catch(console.error);
    }
  }, [isContact]);

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state?.formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === "organization_id" ? parseInt(value) || null : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateEntity(type, formData.id, formData);
      alert("The Entry has been Updated");
      navigate(-1);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEntity(type, formData.id);
      alert("The Entry has been Deleted");
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleBack = () => navigate(-1);

  const handleRestoreSuccess = () => {
    setFormData((prevData: any) => ({
      ...prevData,
      is_deleted: false,
    }));
  };

  if (!formData) {
    return <div className="p-4">No data provided.</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2
        className="text-xl font-semibold mb-4 cursor-pointer"
        onClick={handleBack}
      >
        {title}
      </h2>
      {formData.is_deleted && (
        <RestoreNotification
          type={type}
          id={formData.id}
          onRestoreSuccess={handleRestoreSuccess}
        />
      )}
      <FormFields
        type={type}
        formData={formData}
        handleChange={handleChange}
        organizations={organizations}
        mode="edit"
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      {!isContact && <OrganizationContacts organizationId={formData.id} />}
    </div>
  );
};

export default Edit;
