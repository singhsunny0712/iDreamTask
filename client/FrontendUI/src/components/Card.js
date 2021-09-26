import React, { useState,useEffect } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import TextField from "@mui/material/TextField";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik } from "formik";
import * as yup from "yup";

const validation_Schema = yup.object({
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
});

export default function BasicCard({ heading, id, taskData ,settaskData}) {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [editid, setid] = React.useState("");
  const [deleteid, setdeleteid] = React.useState("");
  const [editTitleData, setTitleData] = React.useState("");
  const [editDesData, setDesData] = React.useState("");

  const handleClickOpen2 = (x) => {
    // console.log("first time true",x._id)
    setdeleteid(x._id);
    setOpen2(true);
  };
  
  const handleClose2 = (flag) => {
    if(flag==='Y'){

      // console.log(deleteid)

      fetch(`/deletetask/${deleteid}`, {
        method: "delete",
        headers: {
          "Authorization": "iCareerD " + localStorage.getItem("jwt")
        }
      }).then(res => res.json())
        .then(result => {
  
          // console.log(result);
          // console.log(taskData);
          let filterData= taskData.filter(item=>item._id !== result._id)
          // console.log(filterData);
          settaskData(filterData)
          // console.log(taskData);
        }).catch(err => {
          console.log(err);
        })
      
    }
    setOpen2(false);
    // console.log(flag);
    // console.log(open2);
};

  const handleClickOpen = () => {
    // console.log(x)
    setOpen(true);
  };

  const handleClickOpen1 = (x) => {
    // console.log("edditt",x.description)

    setid(x._id);
    setTitleData(x.title);
    setDesData(x.description);
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setid("");
    setTitleData("");
    setDesData("");
    setOpen1(false);
  };


  async function callApi(values) {
    values.status = id;

    await fetch("/addtask", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "iCareerD " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        userid: JSON.parse(localStorage.getItem("user"))._id,
        title: values.title,
        description: values.description,
        status: id,
      }),
     })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // M.toast({html: data.error,classes:"#c62828 red darken-3"})
          console.log(data.error);
        } else {
          // console.log(data.task);
          taskData.push(data.task);
          // console.log(taskData);
          // window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });

     // taskData.push(values)
     // console.log(taskData);
     setOpen(false);
     ////--------------------API Call --------------------------------------------------
  }

  ///---------------api for edit --------------------------------------
  async function EditApi(values, id) {
    // console.log(values, id);

    await fetch("/titleupdate", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "iCareerD " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        taskid: id,
        updatetitle: values.editTitle,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // M.toast({html: data.error,classes:"#c62828 red darken-3"})
          console.log(data.error);
        } else {
          taskData.filter((x) => x._id === id)[0].title = values.editTitle;
          // console.log(data.task);
          // taskData.push(data.task)
          // console.log(taskData);
          // window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await fetch("/desupdate", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "iCareerD " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        taskid: id,
        description: values.editDescription,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // M.toast({html: data.error,classes:"#c62828 red darken-3"})
          console.log(data.error);
        } else {
          taskData.filter((x) => x._id === id)[0].description =
            values.editDescription;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(taskData.filter(x => x._id === id))
    // console.log(taskData)
    setOpen1(false);
  }

  useEffect(() => {
    // console.log("test")
  }, [open, open1,open2]);

  return (
    <Card
      sx={{ minWidth: 275, minHeight: 600 }}
      className="card_bg_color p-4"
      id={id}
    >
      <div class="d-flex justify-content-between">
        <h6>{heading}</h6>
        <h6 className="digit">
          {taskData.filter((x) => x.status === id).length}
        </h6>
      </div>
      <Button className="addto_btn" onClick={handleClickOpen}>
        <AddRoundedIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Formik
          initialValues={{ title: "", description: "" }}
          validationSchema={validation_Schema}
          onSubmit={(values, actions) => {
            console.log(values);
            callApi(values);
          }}
        >
          {({
            errors,
            touched,
            handleChange,
            handleBlur,
            values,
            handleSubmit,
          }) => (
            <div className="row m-5">
              <TextField
                id="outlined-basic"
                name="title"
                label="Title"
                variant="standard"
                className="p-4"
                onBlur={handleBlur("title")}
                onChange={handleChange("title")}
                value={values.title}
              />
              {touched.title && errors.title ? (
                <h6 style={{ color: "red" }}>{errors.title}</h6>
              ) : null}
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                name="description"
                multiline
                maxRows={4}
                className="p-4"
                variant="standard"
                onBlur={handleBlur("description")}
                onChange={handleChange("description")}
                value={values.description}
              />
              {touched.description && errors.description ? (
                <h6 style={{ color: "red" }}>{errors.description}</h6>
              ) : null}

              <Button onClick={handleSubmit}>Add</Button>
            </div>
          )}
        </Formik>
      </Dialog>
      <div className="row pt-4 pb-4 pl-4 pr-4">
        {taskData
          .filter((x) => x.status === id)
          .map((x) => {
            return (
              <Card sx={{ minWidth: 275 }} className="p-4 m-2" id={x._id}>
                {/* <button onClick={() => handleClickOpen1(x)} id={x._id}>
                  edit
                </button> */}
                <div id='iconplace'>
                   <h4 >{x.title}</h4>
                   <IconButton aria-label="edit" size="small" onClick={() => handleClickOpen1(x)} id={x._id} >
                     <EditIcon fontSize="inherit" />
                   </IconButton>
                   <IconButton aria-label="delete" size="small" onClick={() => handleClickOpen2(x)} id='deletebutton'>
                     <DeleteIcon fontSize="inherit" />
                   </IconButton>
                   <Dialog
                                                open={open2}
                                                onClose={handleClose2}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                >
                                                <div className="p-5">
                                                <h1>Do you Want to Delete Task</h1>
                                                <DialogActions>
                                                <Button onClick={()=>handleClose2('Y')}>Yes</Button>
                                                <Button onClick={()=>handleClose2('N')} autoFocus>
                                                      No
                                                </Button>
                                                </DialogActions>
                                                </div>
                   </Dialog>
                </div>
                <hr></hr>
                {/* <br></br> */}
                <h6>{x.description}</h6>
                {/* //////------------------mapping------------------------//// */}
                <Dialog
                  open={open1}
                  onClose={handleClose1}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <Formik
                    initialValues={{
                      editTitle: editTitleData,
                      editDescription: editDesData,
                    }}
                    onSubmit={(values, actions) => {
                      // console.log(values);
                      EditApi(values, editid);
                    }}
                  >
                    {({
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      values,
                      handleSubmit,
                    }) => (
                      <div className="row m-5">
                        <TextField
                          id="outlined-basic"
                          name="title"
                          label="Title"
                          variant="standard"
                          className="p-4"
                          onBlur={handleBlur("editTitle")}
                          onChange={handleChange("editTitle")}
                          value={values.editTitle}
                        />
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Description"
                          name="description"
                          multiline
                          maxRows={4}
                          className="p-4"
                          variant="standard"
                          onBlur={handleBlur("editDescription")}
                          onChange={handleChange("editDescription")}
                          value={values.editDescription}
                        />

                        <Button onClick={handleSubmit}>Edit</Button>
                        {/* <EDITICON /> */}
                      </div>
                    )}
                  </Formik>
                </Dialog>
              </Card>
            );
          })}
      </div>
    </Card>
  );
}
