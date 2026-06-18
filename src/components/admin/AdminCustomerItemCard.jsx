import { TableRow, TableCell, TableBody } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


const AdminCustomerItemCard = (props) => {
    const {id, name, mobile} = props.item

    return(
        <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{mobile}</TableCell>
            <TableCell>{name}@gmail.com</TableCell>
        </TableRow>
    )
}

export default AdminCustomerItemCard