import { Navigate } from "react-router-dom";

import decode from "jwt-decode";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  try {
    decode(token);
    //console.log([decode(token)]);
    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
  
}

export default PrivateRoute;
