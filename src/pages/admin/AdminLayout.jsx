import { Box } from "@mui/material";
import AdminSideBar from "../../components/admin/AdminSideBar";

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>

      {/* LEFT SIDEBAR */}
      
      <AdminSideBar />

      {/* RIGHT CONTENT (Scroll) */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          overflowY: "auto",
        }}
      >
        {children}
      </Box>

    </Box>
  );
};

export default AdminLayout;
