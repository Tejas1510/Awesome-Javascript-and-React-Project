import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { MainCtx } from "./provider";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export function Path() {
  const { auth } = useContext(MainCtx);

  return (
    <Routes>
      {auth ? (
        <>
          <Route path="/Dashboard" element={<Dashboard />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
        </>
      )}
      <Route
        path="*"
        element={<div>{!auth ? "Go to Login" : "Go to logout"}</div>}
      />
    </Routes>
  );
}

export default Path;
