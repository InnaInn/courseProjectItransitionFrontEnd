import React from 'react';

function UserInfo({ firstName, lastName }) {
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : 'Loading...';

  return (
    <div className="max-w-7xl mx-auto flex justify-end">
      <p className="text-gray-500 text-base mb-0">
        Logged in as: <strong className="text-gray-700">{fullName}</strong>
      </p>
    </div>
  );
}

export default UserInfo;