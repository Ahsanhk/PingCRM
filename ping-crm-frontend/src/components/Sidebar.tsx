import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-64 h-full fixed top-0 left-0 bg-gray-800 text-white">
      <div className="flex flex-col items-start p-10">
        <h2 className="text-xl font-bold mb-5">Ping CRM</h2>
        <ul>
          <li>
            <button
              onClick={() => handleClick('/')}
              className="block py-2 text-left w-full"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClick('/organizations')}
              className="block py-2 text-left w-full"
            >
              Organizations
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClick('/contacts')}
              className="block py-2 text-left w-full"
            >
              Contacts
            </button>
          </li>
          <li>
            <button
              onClick={() => handleClick('/reports')}
              className="block py-2 text-left w-full"
            >
              Reports
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
