import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LogsPage from "./pages/LogsPage/LogsPage";
import LogsSearchPage from "./pages/LogsSearchPage/LogsSearchPage";
import LogDetailsPage from "./pages/LogDetailsPage/LogDetailsPage";
import NotFound from "./pages/NotFound/NotFound";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { useEffect } from "react";
import { refresh } from "./redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) {
    return <div>Loading....</div>;
  }
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/logs"
            element={
              <PrivateRoute>
                <LogsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/logs-search"
            element={
              <PrivateRoute>
                <LogsSearchPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/logs/:logId"
            element={
              <PrivateRoute>
                <LogDetailsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/sign-in"
            element={
              <RestrictedRoute>
                <SignIn />
              </RestrictedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <RestrictedRoute>
                <SignUp />
              </RestrictedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
