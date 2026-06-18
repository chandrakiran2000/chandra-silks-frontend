import { TableRow, TableCell, TableBody } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


const AdminOrdersItemCard = (props) => {
    const {order_item_id, quantity, price,  name, image_url, user_name
} = props.item

    return(
        <TableRow key={order_item_id}>
            <TableCell>{order_item_id}</TableCell>
            <TableCell>
              <img src={image_url} style={{ width: 50, height: 50, borderRadius: 4 }} />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>₹ {price}</TableCell>
            <TableCell>{user_name}</TableCell>
        </TableRow>
    )
}

export default AdminOrdersItemCard