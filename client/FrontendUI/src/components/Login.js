import React, { useEffect} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import { Formik} from "formik";
import * as yup from "yup";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useHistory } from 'react-router-dom'


const validation_Schema = yup.object({
      email: yup.string()
      .email("Please enter a valid Email")
      .required("Email is required"),
      password: yup.string().required("Password is required")

})


const Login = () => {

      const history = useHistory();
     // const {state,dispatch}=useContext(UserContext);
      useEffect(()=>{
      const user =JSON.parse( localStorage.getItem("user"));
        if(user){
         // dispatch({type:"USER",payload:user})
           history.push('/home');
         }else{
         history.push('/');

         }
      },[])

      const [value, setValues] = React.useState({
            amount: '',
            password: '',
            weight: '',
            weightRange: '',
            showPassword: false,
          });
          const [checked, setChecked] = React.useState(localStorage.getItem('RMe')==='marked'?true:false);
          const handleChange1 = (event) => {
                  // setChecked(event.target.checked);
                  if(localStorage.getItem('RMe')==='marked'){
                    setChecked(false);
                    localStorage.removeItem('RMData');
                  }else{
                    setChecked(true);

                  }
                  
                  
                  // checked?console.log(checked,"unmarked"):console.log(checked,"marked")

                  checked?localStorage.removeItem('RMe'):localStorage.setItem("RMe","marked");
                  // localStorage.setItem("RMData",false);
            };
        
          const handleClickShowPassword = () => {
            //     console.log(values);
            setValues({
              ...value,
              showPassword: !value.showPassword,
            });
          };
        
          const handleMouseDownPassword = (event) => {
            event.preventDefault();
          };

          
          //------------------call api ------------------//
          const postData = (value) => {
                // console.log(value);

                if(localStorage.getItem('RMe')==='marked'){
                  localStorage.setItem("RMData",JSON.stringify(value));
                }

                fetch("/signin",{
                  method:"post",
                  headers:{
                      "Content-Type":"application/json"
                  },
                  body:JSON.stringify({
                     email:value.email,
                     password:value.password
                  })
              }).then(res=>res.json())
              .then(data => {
                  if(data.error){    
                      // M.toast({html: data.error,classes:"#c62828 red darken-3"})
                      console.log(data.error)
                  }else{
                      console.log(data);
                      localStorage.setItem("jwt",data.token)
                      localStorage.setItem("user",JSON.stringify(data.user))
                      // dispatch({type:"USER",payload:data.user})
                      // M.toast({html: "Signedin Success",classes:"#43a047 green darken-3"})

                      history.push('/home')
                  }
              }).catch(err =>{
                  console.log(err,value.email);
              })

          }
      return (
            <div> 
           <div className="container pt-5">
                 <div className="row justify-content-center">
                  <div className="col-8">
                  <hr className="divider"/>
                  <h2>To continue</h2>
                 <h6>We need your name & email </h6>
                 <Formik
              initialValues={{ email: localStorage.getItem('RMe')==='marked' && localStorage.getItem('RMData')  ? JSON.parse(localStorage.getItem('RMData')).email:'', password: localStorage.getItem('RMe')==='marked' && localStorage.getItem('RMData')  ? JSON.parse(localStorage.getItem('RMData')).password:'',}}
              validationSchema={validation_Schema}
                onSubmit={(values, actions) => {
                  // console.log(values);
                  postData(values)
                  // actions.resetForm(); 
                }}
              >
                {
                  ({ errors, touched ,handleChange, handleBlur, values, handleSubmit }) => (
                  <Box
                        component="form"
                        sx={{
                        '& > :not(style)': { mt: 1,mb: 1, width: '35ch' },
                        }}
                        noValidate
                        autoComplete="off"
                  >
                  <TextField 
                 id="outlined-basic" 
                 label="Email" 
                 variant="outlined"
                 className="inputRounded"
                 onBlur={handleBlur('email')}
                onChange={handleChange('email')}
                value={localStorage.getItem('RMe')==='marked' && localStorage.getItem('RMData')  ? JSON.parse(localStorage.getItem('RMData')).email:values.email}
                 />
                 {touched.email && errors.email ?   <h6 style={{color: 'red'}}>{errors.email}</h6> : null}
                  <FormControl className="inputRounded" variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                        id="outlined-adornment-password"
                        type={value.showPassword ? 'text' : 'password'}
                        value={localStorage.getItem('RMe')==='marked' && localStorage.getItem('RMData')  ? JSON.parse(localStorage.getItem('RMData')).password:values.password}
                        onChange={handleChange('password')}
                        onBlur={handleBlur('password')}
                        endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                        >
                              {value.showPassword===false ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                  />
                  {touched.password && errors.password ?   <h6 style={{color: 'red'}}>{errors.password}</h6> : null}
                  </FormControl>
                  <button className="button1st" type="button" onClick={() => handleSubmit()}>Login</button>

                  <FormControlLabel
                        control={
                        <Checkbox checked={checked} onChange={handleChange1} name="jason" />
                        }
                        label="Remember me"
                  />
                 </Box>
                 )}
              </Formik>
                  </div>
                 </div>

           </div>
            </div>
      )
}

export default Login
