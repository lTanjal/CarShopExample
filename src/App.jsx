import { useState } from 'react'
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Carlist from './components/Carlist';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Container maxWidth="xl">
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>CarShop</Typography>
          </Toolbar>
        </AppBar>
      </Container>
      <Carlist />
    </>
  )
}

export default App
