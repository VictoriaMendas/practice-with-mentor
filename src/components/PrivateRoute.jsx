import { useSelector } from "react-redux";

import { selectIsLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, redirectTo = "/sign-in" }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return <>{isLoggedIn ? children : <Navigate to={redirectTo} />}</>;
}
