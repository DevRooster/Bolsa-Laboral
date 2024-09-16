import React from 'react';

const JobCard = ({ title, company, location, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 flex flex-col h-full">
      <div className="p-4 flex-1">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-1">{company}</p>
        <p className="text-gray-500 mb-4">{location}</p>
        <p className="text-gray-700">{description}</p>
      </div>
      <div className="p-4 border-t border-gray-200">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;