import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getOrganizations = async (
  currentPage?: number,
  searchValue?: string,
  filter?: string
) => {
  try {
    const API_ENDPOINT = currentPage
      ? `?page=${currentPage}&search=${searchValue}&deleted=${filter}`
      : "/names";
    const response = await axios.get(`${API_URL}/organizations${API_ENDPOINT}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching organizations:", error);
  }
};

export const createOrganization = async (formData: any) => {
  try {
    await axios.post(`${API_URL}/organizations/`, formData);
    alert("Organization Created Successfully!");
  } catch (error) {
    console.error("Error creating organization: ", error);
  }
};

export const getContacts = async (
  currentPage?: number,
  searchValue?: string,
  filter?: string
) => {
  try {
    const API_ENDPOINT = currentPage
      ? `?page=${currentPage}&search=${searchValue}&deleted=${filter}`
      : "/names";
    const response = await axios.get(`${API_URL}/contacts${API_ENDPOINT}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching contacts: ", error);
  }
};

export const getContact = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/organizations/${id}/contacts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contact: ", error);
  }
};

export const createContact = async (formData: any) => {
  try {
    await axios.post(`${API_URL}/contacts/`, formData);
    alert("Contact created successfully.");
  } catch (error) {
    console.error("Error creating contact: ", error);
  }
};

export const updateEntity = async (type: string, id: number, data: any) => {
  try {
    const url = `${API_URL}/${type}s/${id}/`;
    return await axios.patch(url, data);
  } catch (error) {
    console.error("Error updating: ", error);
  }
};

export const deleteEntity = async (type: string, id: number) => {
  try {
    const url = `${API_URL}/${type}s/${id}/`;
    return await axios.delete(url);
  } catch (error) {
    console.error("Error updating: ", error);
  }
};

export const restoreEntity = async (type: string, id: number) => {
  const url = `${API_URL}/${type}s/${id}/restore`;
  return await axios.patch(url);
};
