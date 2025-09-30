import React, { useState, useEffect } from "react";
import { XIcon } from "../icons/Icons";

interface Employee {
  name: string;
  email: string;
  phone: string;
  officeEmail: string;
  employeeId: string;
  aadhaar: string;
  nationality: string;
  maritalStatus: string;
  dob: string;
  gender: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  homePhone: string;
  mobilePhone: string;
  workPhone: string;
  workEmail: string;
  otherEmail: string;
  joiningDate: string;
  jobTitle: string;
  jobSpecification: string;
  jobCategory: string;
  location: string;
  employmentStatus: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Employee) => void;
  employeeToEdit: Employee | null;
}

const emptyEmployee: Employee = {
  name: "",
  email: "",
  phone: "",
  officeEmail: "",
  employeeId: "",
  aadhaar: "",
  nationality: "",
  maritalStatus: "",
  dob: "",
  gender: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  homePhone: "",
  mobilePhone: "",
  workPhone: "",
  workEmail: "",
  otherEmail: "",
  joiningDate: "",
  jobTitle: "",
  jobSpecification: "",
  jobCategory: "",
  location: "",
  employmentStatus: "",
};

const AddEditEmployeeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  employeeToEdit,
}) => {
  const [employee, setEmployee] = useState<Employee>(emptyEmployee);

  useEffect(() => {
    setEmployee(employeeToEdit || emptyEmployee);
  }, [employeeToEdit, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employee.name && employee.email && employee.phone) {
      onSave(employee);
    } else {
      alert("Please fill in all required fields (*)");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            {employeeToEdit ? "Edit Employee" : "Add New Employee"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <XIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-grow overflow-y-auto p-6 space-y-6"
        >
          {/* Basic Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={employee.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Personal Email *"
                value={employee.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone No *"
                value={employee.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="officeEmail"
                placeholder="Office Email *"
                value={employee.officeEmail}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="employeeId"
                placeholder="Employee ID *"
                value={employee.employeeId}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="aadhaar"
                placeholder="Aadhaar No *"
                value={employee.aadhaar}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="nationality"
                placeholder="Nationality *"
                value={employee.nationality}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <select
                name="maritalStatus"
                value={employee.maritalStatus}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Marital Status *</option>
                <option>Single</option>
                <option>Married</option>
              </select>
              <input
                type="date"
                name="dob"
                value={employee.dob}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <select
                name="gender"
                value={employee.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Gender *</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="street1"
                placeholder="Street 1"
                value={employee.street1}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="street2"
                placeholder="Street 2"
                value={employee.street2}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={employee.city}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="state"
                placeholder="State/Province"
                value={employee.state}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="zip"
                placeholder="Zip/Postal Code"
                value={employee.zip}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <select
                name="country"
                value={employee.country}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Country</option>
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="tel"
                name="homePhone"
                placeholder="Home Phone"
                value={employee.homePhone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="tel"
                name="mobilePhone"
                placeholder="Mobile Phone"
                value={employee.mobilePhone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="tel"
                name="workPhone"
                placeholder="Work Phone"
                value={employee.workPhone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="workEmail"
                placeholder="Work Email"
                value={employee.workEmail}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="otherEmail"
                placeholder="Other Email"
                value={employee.otherEmail}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Job Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Job Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                name="joiningDate"
                value={employee.joiningDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                value={employee.jobTitle}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="jobSpecification"
                placeholder="Job Specification"
                value={employee.jobSpecification}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="jobCategory"
                placeholder="Job Category"
                value={employee.jobCategory}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <select
                name="location"
                value={employee.location}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Location</option>
                <option>Head Office</option>
                <option>Branch Office</option>
              </select>
              <select
                name="employmentStatus"
                value={employee.employmentStatus}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Employment Status</option>
                <option>Active</option>
                <option>Probation</option>
                <option>Resigned</option>
              </select>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded"
            >
              Save Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditEmployeeModal;
