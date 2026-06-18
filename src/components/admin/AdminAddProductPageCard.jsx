import { useState } from 'react';
import axios from "axios"
import {Typography, Box, FormControl, TextField, InputLabel, InputAdornment, IconButton, Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { getAdminAuthConfig } from "../../utils/adminAuth"

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});



const AdminAddProductPageCard = () => {
    const [imagePreview, setImagePreview] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const handleImageUpload = (event) => {
        const file = event.target.files[0]

        if (file) {
            setImageFile(file)
            const previewURL = URL.createObjectURL(file)
            setImagePreview(previewURL)
            setErrorMsg('')
            setSuccessMsg('')
        }
    }



    const handleAddSubmit = async(event) => {
        event.preventDefault()
        
        if(!imagePreview){
            setErrorMsg('Please upload a saree image')
            setSuccessMsg('')
            return
        }

        if(!name){
            setErrorMsg('Please enter saree name')
            setSuccessMsg('')
            return
        }

        if(price <= 0){
            setErrorMsg('Please enter valid price')
            setSuccessMsg('')
            return
        }

        if(!description){
            setErrorMsg('Please enter description')
            setSuccessMsg('')
            return
        }

        
        
        try{
            const formData = new FormData()
            formData.append("name", name)
            formData.append("price", price)
            formData.append("description", description)
            formData.append("image", imageFile)


            const response = await axios.post('http://localhost:5000/admin/products', formData, getAdminAuthConfig()) 
            
            const data = response.data
            

            setSuccessMsg(data)
            setErrorMsg("")

            setImagePreview(null)
            setName('')
            setPrice('')
            setDescription('')
        }catch (error){
            if(error.response && error.response.data){
                setErrorMsg(error.response.data)
            } else {
                setErrorMsg("Failed to add product")
            }
        }
    }

    
    return(
        <form onSubmit={handleAddSubmit}>
        <Box sx={{bgcolor: '#fff', m: 1, px: 3, py: 3, width: {xs: '300px' , md:'410px', xl: '550px'}, minHeight: {xs:'320px', md:'420px', xl: '420px'}, display: 'flex', flexDirection:'column', justifyContent: 'center', borderRadius: '15px', boxShadow: "0 8px 24px rgba(0,0,0,0.08)",}} variant="outlined">
            
            <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                Upload Saree image
                <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </Button>

            {
                imagePreview && (
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap:1 }}>
                        <img src={imagePreview} alt="preview" style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px" }} />

                        <Button
                            variant="outlined"
                            color="error"
                            
                            sx={{border: 'none', height: "28px", minWidth: "28px", width: "28px", borderRadius: "50%", fontWeight: "bold", "&:hover": {border: "none", backgroundColor: "rgba(239, 68, 68, 0.08)"}}}
                            onClick={() => {
                                setImagePreview(null)
                                setImageFile(null)
                            }}
                        >
                            <CloseIcon />
                        </Button>
                    </Box>
                )
            }

            <TextField
                placeholder="Enter Saree Name"
                value={name}
                fullWidth
                sx={{bgcolor: "#fff", mt: 2, "& .MuiOutlinedInput-root": {"& fieldset": { borderColor: "#ccc" }, "&:hover fieldset": { borderColor: "#ccc" }, "&.Mui-focused fieldset": { borderColor: "#ccc" }}}}
                onChange={(e) => {
                    setName(e.target.value) 
                    setErrorMsg('')
                    setSuccessMsg('')
                }}
            />
            
            <TextField
                placeholder="Enter Saree Price"
                value={price}
                type='number'
                fullWidth
                sx={{bgcolor: "#fff", mt: 2, "& .MuiOutlinedInput-root": {"& fieldset": { borderColor: "#ccc" }, "&:hover fieldset": { borderColor: "#ccc" }, "&.Mui-focused fieldset": { borderColor: "#ccc" }}}}
                onChange={(e) => {
                    setPrice(e.target.value)
                    setErrorMsg('')
                    setSuccessMsg('')
                }}
            />

            <TextField
                placeholder="Enter Saree Description"
                value={description}
                fullWidth
                multiline
                rows={3}
                sx={{bgcolor: "#fff", mt: 2, "& .MuiOutlinedInput-root": {"& fieldset": { borderColor: "#ccc" }, "&:hover fieldset": { borderColor: "#ccc" }, "&.Mui-focused fieldset": { borderColor: "#ccc" }}}}
                onChange={(e) => {
                    setDescription(e.target.value)
                    setErrorMsg('')
                    setSuccessMsg('')
                }}
            />

            <Button variant="contained" type="submit" fullWidth startIcon={<CloudUploadIcon />} size="small" sx={{mt: 1, backgroundColor: "#facc15", color: "#000", fontWeight: 600, "&:hover": {backgroundColor: "#eab308"}}}>Add Product</Button>

            <Typography sx={{mt: 2, fontSize: "14px", fontWeight: 500, color: "#ef4444", textAlign: 'center'}}>{errorMsg}</Typography>
            <Typography sx={{mt: 2, fontSize: "14px", fontWeight: 500, color: "#16a34a", textAlign: 'center'}}>{successMsg}</Typography>

            
        </Box>
        </form>
    )
}

export default AdminAddProductPageCard