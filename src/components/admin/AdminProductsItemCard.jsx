import { useNavigate, } from "react-router-dom"

import { TableRow, TableCell, TableBody } from "@mui/material";



import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

import { getAdminAuthConfig } from "../../utils/adminAuth"


const AdminProductsItemCard = (props) => {
    const {id, name, price, image_url} = props.item
    
    
    const navigate = useNavigate()
    
    const handleDeleteProduct = async() => {
      
      const confirmDelete = window .confirm( "Are you sure you want to delete this product?")

      if (!confirmDelete){return}
      
      try {
        await axios.delete(`https://chandra-silks-backend.onrender.com/admin/products/${id}`, getAdminAuthConfig())
        props.setMessage("Product deleted successfully")
        props.setSeverity("success")
        props.setOpenSnackbar(true)

        props.getProducts()
      } catch (error) {
        props.setMessage(
        error.response?.data || "Failed to delete product"
        )

        props.setSeverity("error")
        props.setOpenSnackbar(true)

      }
    }

    return(
        <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>
              <img src={image_url} alt="no image" style={{ width: 50, height: 50, borderRadius: 4 }} />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>₹ {price}</TableCell>
            <TableCell>
              <EditIcon onClick={() => navigate(`/admin/edit-product/${id}`)} sx={{ color: "#0b69ff", cursor: "pointer", mr: 2 }} />
              <DeleteIcon onClick={handleDeleteProduct} sx={{ color: "#ef4444", cursor: "pointer" }} />
            </TableCell>
        </TableRow>
    )
}

export default AdminProductsItemCard