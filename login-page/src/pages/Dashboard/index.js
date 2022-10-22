import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button className="logout" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
