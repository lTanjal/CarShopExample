import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar({data,updateCar}) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        console.log(data)
        setCar({
        brand: data.brand,
        model: data.model,
        color: data.color,
        fuel: data.fuel,
        modelYear: data.modelYear,
        price: data.price 
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price: ''
    })

    const handleSave=()=>{
       updateCar(data._links.car.href,car);
       handleClose();
    }

    return (
        <>
            <Button size='small' onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Update car</DialogTitle>
                <DialogContent>

                    <TextField
                        margin="dense"
                        label="Brand"
                        value={car.brand}
                        onChange={e=>setCar({...car, brand:e.target.value})}
                        fullWidth
                        variant="standard"
          />
 <TextField
                        margin="dense"
                        label="Model"
                        value={car.model}
                        onChange={e=>setCar({...car, model:e.target.value})}
                        fullWidth
                        variant="standard"
          />    

<TextField
                        margin="dense"
                        label="Color"
                        value={car.color}
                        onChange={e=>setCar({...car, color:e.target.value})}
                        fullWidth
                        variant="standard"
          />

<TextField
                        margin="dense"
                        label="Fuel"
                        value={car.fuel}
                        onChange={e=>setCar({...car, fuel:e.target.value})}
                        fullWidth
                        variant="standard"
          />
<TextField
                        margin="dense"
                        label="Model year"
                        value={car.modelYear}
                        onChange={e=>setCar({...car, modelYear:e.target.value})}
                        fullWidth
                        variant="standard"
          />

<TextField
                        margin="dense"
                        label="Price"
                        value={car.price}
                        onChange={e=>setCar({...car, price:e.target.value})}
                        fullWidth
                        variant="standard"
          />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                   
                </DialogActions>
            </Dialog>
        </>
    );
}