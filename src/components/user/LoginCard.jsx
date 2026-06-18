import { useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import {Typography, Box, FormControl, TextField, InputLabel, InputAdornment, IconButton, Button} from '@mui/material';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";


const LoginCard = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const navigate = useNavigate()

    const token = Cookies.get("jwt_token")

    if(token) {
        return <Navigate to="/" replace />
    }

    


    const handleSubmit = async(e) => {
        e.preventDefault()
        setErrorMsg("")
        setSuccessMsg('')
        
        
        if (mobile === '') {
            setErrorMsg("Enter your mobile number")
            setSuccessMsg('')
            return
        }
        if(String(mobile).length !== 10 ){
            setErrorMsg('Enter valid 10 digit mobile number')
            setSuccessMsg('')
            return
        }
        if(password === "") {
            setErrorMsg('Enter password')
            setSuccessMsg('')
            return
        }

        try {
            const userData = {"mobile": mobile, "password": password}
            const response = await axios.post("http://localhost:5000/login",userData)
            const data = response.data

            
            Cookies.set("jwt_token", data.token, {expires: 7, path: "/"})
            localStorage.setItem("userData", JSON.stringify(data.user))

            setMobile('')
            setPassword('')
            setSuccessMsg(data.message)

            setTimeout(() => {
                navigate("/")
            }, 1500)
        } catch (error) {
            if(error.response && error.response.data){
                setErrorMsg(error.response.data)
            } else {
                setErrorMsg("Login failed")
            }
        }

        
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return(
        <form onSubmit={(e) => handleSubmit(e)}>
        <Box sx={{bgcolor: '#fff', m: 1, px: 3, py: 3, width: {xs: '300px' , md:'410px', xl: '550px'}, minHeight: {xs:'320px', md:'420px', xl: '420px'}, display: 'flex', flexDirection:'column', justifyContent: 'center', borderRadius: '15px', boxShadow: "0 8px 24px rgba(0,0,0,0.08)",}} variant="outlined">
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600,color: "#1e293b", textAlign: "center", }}>
                Login
            </Typography>
            
            <Typography sx={{mb: "6px", mt: '6px', fontSize: "14px", fontWeight: 500, color: "#475569",}} >Mobile Number</Typography>
            <TextField
                placeholder="123456789"
                type='number'
                fullWidth
                value={mobile}
                onChange={(e) => {
                    setMobile(e.target.value) 
                    setErrorMsg('')
                    setSuccessMsg('')
                }}
                sx={{bgcolor: "#fff", "& .MuiOutlinedInput-root": {"& fieldset": { borderColor: "#ccc" }, "&:hover fieldset": { borderColor: "#ccc" }, "&.Mui-focused fieldset": { borderColor: "#ccc" }}
                     ,"& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {WebkitAppearance: "none",margin: 0,},
                     "& input[type=number]": { MozAppearance: "textfield",}
                    }}
            />
                

            <Typography sx={{mb: "6px", mt: '6px', fontSize: "14px", fontWeight: 500, color: "#475569",}} >Password</Typography>
            <TextField  fullWidth placeholder="Enter your password" type={showPassword ? "text" : "password"} sx={{bgcolor: "#fff", "& .MuiOutlinedInput-root": {"& fieldset": { borderColor: "#ccc" }, "&:hover fieldset": { borderColor: "#ccc" }, "&.Mui-focused fieldset": { borderColor: "#ccc" }}}} 
            value={password}
            onChange={(e) => {
                    setPassword(e.target.value) 
                    setErrorMsg('')
                    setSuccessMsg('')
                }}
            InputProps={{ endAdornment: ( 
            <InputAdornment position="end"> 
                <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>)}}
            />

            
            <Typography sx={{mt: 2, fontSize: "14px", fontWeight: 500, color: "#ef4444", textAlign: 'center'}}>{errorMsg}</Typography>
            <Typography sx={{mt: 2, fontSize: "14px", fontWeight: 500, color: "#16a34a", textAlign: 'center'}}>{successMsg}</Typography>

            <Button variant="contained" type="submit" size="small" sx={{mt: '10px', backgroundColor: "#facc15", color: "#000", fontWeight: "bold", "&:hover": {backgroundColor: "#eab308"}}}>Login</Button>
            <Typography sx={{mt: 2, fontSize: "14px", textAlign: "center", color: "#475569",}}>
                New user?{" "} <span onClick={() => navigate("/register")} style={{ color: "#0b69ff", cursor: "pointer" }}>Register</span>
            </Typography>
        </Box>
        </form>
    )
}

export default LoginCard