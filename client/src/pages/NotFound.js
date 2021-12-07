import React from 'react';
import { useLocation } from 'react-router-dom';

function NotFound() {
  let location = useLocation();
  return (
    <div>
      <div>
        <h1>
          No match for <code>{location.pathname}</code>
        </h1>
      </div>
    </div>
  );
}

export default NotFound;
