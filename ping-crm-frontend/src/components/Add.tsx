import { useLocation, useNavigate } from "react-router-dom";
import FormFields from "./FormField";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  createContact,
  createOrganization,
  getOrganizations,
} from "../services/api";

const Add = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const type = location.state?.type || "organization";

  const isContact = type === "contact";
  const title = isContact ? "Add Contact" : "Add Organization";

  const [organizations, setOrganizations] = useState<
    { id: number; name: string }[]
  >([]);
  const [formData, setFormData] = useState<any>({
    email: null,
    phone: null,
    address: null,
    city: null,
    province_state: null,
    country: null,
    postal_code: null,
  });

  useEffect(() => {
    const fetchOrganizationNames = async () => {
      try {
        const orgs = await getOrganizations();
        setOrganizations(orgs);
      } catch (error) {
        console.error("Error fetching organization names", error);
      }
    };

    if (type === "contact") fetchOrganizationNames();
  }, [type]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === "organization_id" ? parseInt(value) || null : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      type === "contact"
        ? await createContact(formData)
        : await createOrganization(formData);
      navigate(`/${type}s`);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const emptyFormData = isContact
    ? {
        first_name: "",
        last_name: "",
        organization_id: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        province_state: "",
        postal_code: "",
        country: "",
      }
    : {
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        province_state: "",
        postal_code: "",
        country: "",
      };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2
        className="text-xl font-semibold mb-4 cursor-pointer"
        onClick={handleBack}
      >
        {title}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormFields
          type={type}
          formData={formData}
          handleChange={handleChange}
          organizations={organizations}
          mode="add"
        />
      </form>
    </div>
  );
};

export default Add;
