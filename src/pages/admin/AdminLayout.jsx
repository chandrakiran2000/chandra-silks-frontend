import { Box } from "@mui/material";
import AdminSideBar from "../../components/admin/AdminSideBar";

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%" }}>

      {/* LEFT SIDEBAR */}
      
      <AdminSideBar />

      {/* RIGHT CONTENT (Scroll) */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          p: { xs: 2, md: 3 },
          overflowY: "hidden",
        }}
      >
        {children}
      </Box>

    </Box>
  );
};

export default AdminLayout;
