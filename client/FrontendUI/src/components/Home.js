import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import CARD from "./Card"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useHistory } from 'react-router-dom';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

const Home = () => {
      const history = useHistory();
      const [open, setOpen] = useState(false);
      const [taskData,settaskData]=useState([]);
      // const taskData = [
      //                   {_id:'1234',status: "1", title: 'test 1',description: 'none 1'},
      //                   {_id:'1235',status: "2", title: 'test 2',description: 'none 2'},
      //                   {_id:'1236',status: "1", title: 'test 1',description: 'none 1'},
      //                   {_id:'1237',status: "2", title: 'test 2',description: 'none 2'},
      //                   {_id:'1238',status: "3", title: 'test 3',description: 'none 3'},
      //                   {_id:'1239',status: "2", title: 'test 2',description: 'none 2'},
      //                   {_id:'1230',status: "3", title: 'test 3',description: 'none 3'}
      //                   ]

      const handleClickOpen = () => {
        setOpen(true);
      };

      useEffect(()=>{
            fetch("/alltask",{
                headers:{
                    "Authorization":"iCareerD "+localStorage.getItem("jwt")
                }
            }).then(res=> res.json())
            .then(result =>{
            //     setPics(result.mypost)
            // console.log(result.tasks)
            settaskData(result.tasks)
           
            })
          },[])
    
      const handleClose = (flag) => {
            if(flag==='Y'){
                localStorage.removeItem('jwt');
                localStorage.removeItem('user');
                history.push('/signin');

            }
            setOpen(false);
      };
      
      return (
            <div>
                 <div className="container-fluid">
                       <div className="row">
                             <div id="make_border" className="col-md-2 pb-5 p-3 pr-0">
                                   <h1>.taskez</h1>
                                   <div className="row pt-5 pb-5 mb-5">
                                   <Box sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
                                                <nav aria-label="main mailbox folders">
                                                <List>
                                                <ListItem disablePadding>
                                                      <ListItemButton>
                                                      <ListItemIcon>
                                                      <HomeRoundedIcon />
                                                      </ListItemIcon>
                                                      <ListItemText primary="Overview" />
                                                      </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding>
                                                      <ListItemButton>
                                                      <ListItemIcon>
                                                      <EqualizerRoundedIcon />
                                                      </ListItemIcon>
                                                      <ListItemText primary="Stats" />
                                                      </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding>
                                                      <ListItemButton>
                                                      <ListItemIcon>
                                                      <FolderOpenRoundedIcon />
                                                      </ListItemIcon>
                                                      <ListItemText primary="Projects" />
                                                      </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding>
                                                      <ListItemButton>
                                                      <ListItemIcon>
                                                      <TextsmsRoundedIcon />
                                                      </ListItemIcon>
                                                      <ListItemText primary="Chat" />
                                                      </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding>
                                                      <ListItemButton>
                                                      <ListItemIcon>
                                                      <DateRangeRoundedIcon />
                                                      </ListItemIcon>
                                                      <ListItemText primary="Calendar" />
                                                      </ListItemButton>
                                                </ListItem>
                                                </List>
                                                </nav>
                                          </Box>
                                   </div>
                                   <div id="logout_button" className="row pt-5 mt-5">
                                   <Box sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
                                          <nav aria-label="main mailbox folders">
                                          <List>
                                          <ListItem disablePadding>
                                                <ListItemButton>
                                                <ListItemIcon>
                                                <SettingsIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Settings" />
                                                </ListItemButton>
                                          </ListItem>
                                          <ListItem disablePadding onClick={handleClickOpen}>
                                                <ListItemButton>
                                                <ListItemIcon>
                                                <LogoutIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Log Out" />
                                                </ListItemButton>
                                          </ListItem>
                                          <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                >
                                                <div className="p-5">
                                                <h1>Do you Want to Log out! </h1>
                                                <DialogActions>
                                                <Button onClick={()=>handleClose('Y')}>yes</Button>
                                                <Button onClick={()=>handleClose('N')} autoFocus>
                                                      No
                                                </Button>
                                                </DialogActions>
                                                </div>
                                                </Dialog>
                                          </List>
                                          </nav>
                                    </Box>  
                                   </div>
                             </div>
                             <div className="col-md-10">
                                   <div className="row p-3">
                                         <div className="row">
                                               <div className="col-4">
                                               <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                      <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                      <TextField id="input-with-sx" label="search" variant="standard" />
                                                </Box>
                                    
                                               </div>
                                               <div className="col-4">
                                                     <h1>users</h1>
                                                </div>
                                                <div className="col-4">
                                                      <h1>user</h1>
                                                </div>
                                         </div>
                                         <div className="row pt-5">
                                         <div class="d-flex justify-content-between">
                                         <h2>Project</h2>
                                               <h2><FilterListRoundedIcon /> Filter</h2>
                                         </div>
                                              
                                         </div>
                                         <div className="row">
                                               <div className="col-md-4 p-3">
                                                <CARD heading="Project" id={'3'} taskData={taskData} settaskData={settaskData}/>
                                               </div>
                                               <div className="col-md-4 p-3">
                                               <CARD heading="In Progress" id={'2'} taskData={taskData} settaskData={settaskData}/>
                                                </div>
                                                <div className="col-md-4 p-3">
                                                <CARD heading="Completed" id={'1'} taskData={taskData} settaskData={settaskData}/>
                                                </div>
                                         </div>
                                   </div>
                             </div>
                       </div>
                 </div>
            </div>
      )
}

export default Home
