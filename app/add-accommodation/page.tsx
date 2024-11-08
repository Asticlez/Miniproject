// app/add-accommodation/page.tsx
"use client";

import React, { useState } from 'react';

const AddAccommodation = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [informDate, setInformDate] = useState(new Date().toISOString().split('T')[0]);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passportNo, setPassportNo] = useState('');
  const [nationality, setNationality] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [nights, setNights] = useState(0);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCancel = () => {
  };

  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-xl font-bold mb-6 text-gray-900">Inform Accommodation > Add</h2>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Accommodation Info */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Address</label>
            <div className="p-3 border rounded-md bg-gray-100 text-gray-900">
              <span className="font-bold text-green-600">Approved</span> Sunshine Inn Resort <br />
              5/55 Moo7, Soi, Khuek Khak, Takua Pa, Phang Nga, 82220
            </div>
          </div>

          {/* Stay Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">Inform Status</label>
              <div className="p-2 bg-blue-200 text-blue-800 rounded-md">In progress</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Inform Date</label>
              <input
                type="date"
                value={informDate}
                onChange={(e) => setInformDate(e.target.value)}
                className="w-full p-2 border rounded-md text-gray-900"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Check-in Date</label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full p-2 border rounded-md text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Check-out Date (Optional)</label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full p-2 border rounded-md text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Number of nights of stay</label>
              <input
                type="number"
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full p-2 border rounded-md text-gray-900"
                min={0}
              />
            </div>
          </div>

          {/* Guest Information */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 border rounded-md text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Middle Name</label>
              <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="w-full p-2 border rounded-md text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 border rounded-md text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 border rounded-md text-gray-900"
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Birth Date</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full p-2 border rounded-md text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Passport No.</label>
              <input
                type="text"
                value={passportNo}
                onChange={(e) => setPassportNo(e.target.value)}
                className="w-full p-2 border rounded-md text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Nationality</label>
              <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full p-2 border rounded-md text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Phone No.</label>
              <input
                type="tel"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="w-full p-2 border rounded-md text-gray-900"
              />
            </div>
          </div>

          {/* Warning Message */}
          <div className="text-red-600 border border-red-500 p-4 rounded-md text-sm">
            Warning: Creating or providing false documents or information is a crime.
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md">Save</button>
            <button type="button" onClick={handleCancel} className="px-6 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccommodation;
