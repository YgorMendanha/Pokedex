import React,{ useState , useEffect } from 'react';
import { ListPokemons, PokedexListInterface } from './components/services/ListPokemons';
import { GetPokemonsDetails } from './components/services/GetPokemonsDetails';
import { PokemonsDetails } from './components/interfaces/PokemonsDetails';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid red',
    boxShadow: 24,
    p: 4,
  };


const App: React.FC = () => {

    
    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(true)

    const [ pokemons , setPokemons ] = useState<PokedexListInterface[]>([])

    const [ selectpokemons , setSelectPokemons ] = useState<PokedexListInterface | any >()

    const [ selectPokemonsDetails , setSelectPokemonsDetails ] = useState<PokemonsDetails | any >()


    useEffect(() => {
        ListPokemons().then((response) => { 
            response.results.forEach((item, index) => {
                item.id = index + 1;
            });           
            setPokemons(response.results)
        }).catch((e)=>{
            console.log(e)
        }

        )     
    }, [selectpokemons]);
    
    useEffect(() => {
        if(!selectpokemons) return

        GetPokemonsDetails(selectpokemons.name).then((response) => {
            setSelectPokemonsDetails(response)
            setLoading(false)
        }).catch((e)=>{
            console.log(e)
        })     
    }, [selectpokemons]);

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ bgcolor: 'red' }}>
                    <Toolbar>
                        <Typography component="div" >
                            <CatchingPokemonIcon  sx={{  fontSize: '40px'}}/>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container maxWidth="xl">             
                
                <Box mt={3} >
                    <Grid container spacing={0.5} >
                        {pokemons.map((pokemons,idx) => {

                            return (
                                <Grid key={idx} item xs={6} md={3}> 
                                    <Card variant="outlined" >
                                        <CardContent  sx={{margin:"auto"}}>
                                            <Typography sx={{textAlign: 'center'}}>
                                                <img
                                                    src={`https://cdn.traction.one/pokedex/pokemon/${pokemons.id}.png`} width="120"
                                                    height="120"
                                                />
                                            </Typography>
                                            <Typography align="center" sx={{ fontSize: 14 }}  color="text.secondary" gutterBottom>
                                                 {pokemons.name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions >
                                            <Button sx={{margin:"auto"}} onClick={()=>{setSelectPokemons(pokemons),setOpen(true)}} size="small">Abrir</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )                        
                        })}
                        
                        <Modal
                            open={open}
                            onClose={() => {setOpen(false),setLoading(true)}}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"                            
                        >
                            <Box sx={style}>                                
                                <Typography  sx={{textAlign: 'center' }} id="modal-modal-title" variant="h4" component="h2">
                                    {selectpokemons?.name}
                                </Typography>
                                <Typography  id="modal-modal-description" sx={{ mt: 2  , textAlign: 'center' }}>
                                    {
                                       loading === true ? (
                                        <Box >
                                             <CircularProgress  sx={{ color: 'red' }}/>
                                        </Box>
                                       ):(
                                           <>
                                            <img
                                            src={`https://cdn.traction.one/pokedex/pokemon/${selectPokemonsDetails?.id}.png`} 
                                            width="180"
                                            height="180"
                                            />
                                            <Typography sx={{ mt: 0, fontWeight: 'light', textAlign: 'left' }}>
                                                {selectPokemonsDetails?.types.map((types:any) => {
                                                    return <p>Tipo: {types.type.name}</p>
                                                })}
                                                <p>Altura: {selectPokemonsDetails?.height * 10}cm</p>
                                                <p>Peso: {selectPokemonsDetails?.weight / 10}kg</p>
                                           </Typography>
                                           </>                                        
                                       )
                                    }
                                </Typography>
                            </Box>
                        </Modal>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};
export default App;