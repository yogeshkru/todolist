import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Grid, Typography, Paper, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useFormik } from "formik"
import * as Yup from "yup"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
function App() {
  const [table, setTable] = useState([])
  const [edite, setEdite] = useState("")
  const { handleBlur, handleChange, values, errors, touched, handleSubmit,resetForm,setValues } = useFormik({
    initialValues: {
      task: "",


    }, validationSchema: Yup.object().shape({
      task: Yup.string().required("Task is required"),

    }),
    onSubmit: (value) => {
     if(edite !== ""){
           const newTable=[...table]
           newTable[edite]=value
           setTable(newTable)
           setEdite("")
     }else{
      setTable([...table, value])
     
     }
     resetForm()
    }
  })
 const handleEdite=(id)=>{
  const EditeIndex=table.find((item,index)=>index === id)
  setEdite(id)
  setValues({
    task:EditeIndex.task
  })
  
 
 }
const handleDelete=(id)=>{
  const filtered=table.filter((item,index)=>index !== id)
  setTable(filtered)
}


  return (
    <Box>
      <Typography variant='h4' sx={{ textAlign: "center", fontWeight: "bold" }}>
        Todo List
      </Typography>
      <Grid container spacing={2} mt={3}>
        <Grid item xs={4} >
          <Paper elevation={5} sx={{ padding: "20px" }}>
            <Typography variant='h4' sx={{ textAlign: "center", fontWeight: "bold" }}>
              Tasks Management
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ marginTop: "10px" }}>
                <TextField fullWidth label="Task" id="fullWidth" name='task' value={values.task} onChange={handleChange} onBlur={handleBlur} helperText={errors.task && touched.task ? errors.task : ""} error={touched.task && Boolean(errors.task)} autoComplete='off' />
              </Box>

              <Box sx={{ marginTop: "10px", textAlign: "center" }}>
                <Button variant='contained' type='submit'>{edite ? "Update the Task" :"Add the Task"}</Button>
              </Box>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          {
            table.length > 0 ? table.map((item, index) => (
              <Box key={index}>
                <Paper elevation={3} sx={{ padding: "20px" }}>
                  <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <Box>
                     <Typography variant='h6' sx={{ fontWeight: "bold" }}>{item.task}</Typography>
                    </Box>
                    <Box>
                   
              
                     <Button type='button' onClick={()=>handleEdite(index)}><EditIcon sx={{color:"black"}}/></Button>
                     <Button type='button' onClick={()=>handleDelete(index)}><DeleteIcon sx={{color:"red"}}/></Button>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            )) : <Typography variant='h6' sx={{ textAlign: "center" }}>No data</Typography>
          }
        </Grid>
      </Grid>
    </Box>
  )
}

export default App