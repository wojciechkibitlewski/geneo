import React from 'react'
import { Link } from "react-router-dom";

import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';

const CardPerson = (props) => {
    const data=props.data;

  return (
    <Card key={data.id} sx={{padding: '0px', marginTop:"20px" }}>
        <Grid container spacing={0} sx={{ width: "100%", height:'140px', background: 'linear-gradient(122deg, rgba(126,117,105,0.7481915129332983) 0%, rgba(255,255,255,1) 100%)', 
        backgroundImage: 'url("https://jzi.org.pl/wp-content/uploads/2019/12/filipow-1937.jpg")', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '900px'}}>
            <Box sx={{width: '140px', height: '140px', backgroundColor: '#fff', borderRadius: '70px', marginTop: '50px', marginLeft: '50px', border: '1px solid #fff' }}>
                {data.gender === 'female' ? (
                    <img alt={data.fullname} style={{width: '100%', borderRadius: '70px'}} 
                    src="https://img.myloview.com/stickers/abstract-sign-avatar-women-icon-girl-profile-white-symbol-on-gray-circle-background-vector-illustration-700-155650211.jpg" />                 
                ) : (
                    <img alt={data.fullname} style={{width: '100%', borderRadius: '70px'}} 
                    src="https://img.myloview.com/stickers/abstract-sign-avatar-men-icon-male-profile-white-symbol-on-gray-circle-background-vector-illustration-700-155585467.jpg" />                 
                
                )}
                
            </Box>
        </Grid>
        <Grid container spacing={0} sx={{ marginTop: "80px"}} >
            <Grid item xs={12} sm={8} sx={{ padding: "20px"}}>
                {!data.nobility ? (
                <></>
                ) : (
                <Typography variant="body1" sx={{ paddingBottom: '10px'}}>
                    {data.nobility}  
                 </Typography>
                )}
                

                <Typography variant="h3">
                {data.fullname}
                </Typography>
                {!data.surnameMarried ? (
                <></>
                ) : (
                <Typography variant="h6" gutterBottom>
                    (z domu: {data.surname})
                </Typography>
                )} 
                
                <Typography variant="body1" sx={{ paddingTop: '10px'}}>
                    Ur. 
                    {data.age === '2' ? (
                    <> {data.birthyear} - {data.birthyeartwo} </>
                    ) : (
                    <> 
                    {!data.birthday ? '' : ` ${data.birthday}.`}
                    {!data.birthmonth ? '' : ` ${data.birthmonth}.`}
                     {data.birthyear}</>
                    )}
                </Typography>

                <Typography variant="body1" sx={{ paddingBottom: '10px'}}>
                    miejscowość: {data.birthplace} {!data.birthpar ? '-' : `(parafia: ${data.birthpar})`} 
                </Typography>
                
                {!data.deathyear ? (
                <></>
                ) : (
                    <>
                <Typography variant="body1" sx={{ paddingTop: '10px'}}>
                    Zm. 
                    {data.age === '2' ? (
                    <> {data.deathyear} - {data.deathyeartwo} </>
                    ) : (
                    <> 
                    {!data.deathday ? '' : ` ${data.deathday}.`}
                    {!data.deathmonth ? '' : ` ${data.deathmonth}.`}
                     {data.deathyear}</>
                    )}
                </Typography>

                <Typography variant="body1" sx={{ paddingBottom: '10px'}}>
                    miejscowość: {data.deathplace} {!data.deathpar ? '-' : `(parafia: ${data.deathpar})`} 
                </Typography>

                    </>
                )}



                
                <Typography variant="body1" sx={{ paddingBottom: '10px'}}>
                   Zawód: {data.profession}  
                </Typography>

                {!data.info ? (
                <></>
                ) : (
                    <>
                    Informacje:
                    <Typography variant="body2" gutterBottom>
                        {data.info}
                    </Typography>
                    </>
                )}

                

                <Divider />
                <Button href={`/family/editpersons/${data._id}`} variant="outlined" sx={{marginTop: '10px', marginRight: '10px'}}>Edytuj</Button> 
                <Button variant="contained" color="error" sx={{marginTop: '10px'}}>Usuń</Button>

            </Grid>
            <Grid item xs={12} sm={4} sx={{ padding: "20px"}}>
                <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
                key="parents"
                >
                    <ListItem divider key="p0">
                        <Typography variant="h6" gutterBottom>
                            Rodzice:
                        </Typography>
                    </ListItem>
                    <ListItem button divider key="r1">
                    {!data.father ? 
                            <Link style={{textDecoration: 'none', color: 'red'}}
                            to={`/`}
                            title="Dodaj ojca"
                            >
                            <AddIcon sx={{fontSize:'small'}} /> Dodaj ojca  
                            </Link>
                        
                    : 
                        <Link  style={{textDecoration: 'none'}}
                        to={`/family/searchpersons/${data.father._id}`}
                        title={data.father.fullname}
                        >
                         <ListItemText 
                         primary={data.father.fullname}
                         secondary=
                        {data.father.age === '2' ? (
                            <> ur. {data.father.birthyear} - {data.father.birthyeartwo}, {data.father.birthplace} ({data.father.birthpar}) </>
                        ) : (
                            <> ur. 
                            {!data.father.birthday ? '' : ` ${data.father.birthday}.`}
                            {!data.father.birthmonth ? '' : ` ${data.father.birthmonth}.`}
                            {data.father.birthyear}, {data.father.birthplace} ({data.father.birthpar})
                            </>
                        )}
                         />
                        </Link>                                      
                    }
                    </ListItem> 
                    <ListItem button divider key="r2">
                    {!data.mother ? 
                        <Link style={{textDecoration: 'none', color: 'red'}}
                        to={`/`}
                        title="Dodaj matkę"
                        >
                        <AddIcon sx={{fontSize:'small'}} /> Dodaj matkę  
                        </Link>
                    : 
                        <Link  style={{textDecoration: 'none'}}
                        to={`/family/searchpersons/${data.mother._id}`}
                        title={data.mother.fullname}
                        >
                            <ListItemText 
                            primary={data.mother.fullname}
                            secondary=
                            {data.mother.age === '2' ? (
                                <> ur. {data.mother.birthyear} - {data.mother.birthyeartwo}, {data.mother.birthplace} ({data.mother.birthpar}) </>
                            ) : (
                                <> ur. 
                                {!data.mother.birthday ? '' : ` ${data.mother.birthday}.`}
                                {!data.mother.birthmonth ? '' : ` ${data.mother.birthmonth}.`}
                                {data.mother.birthyear}, {data.mother.birthplace} ({data.mother.birthpar})
                                </>
                            )}
                            
                            />
                        </Link>
                    }    
                    </ListItem>                    
               
                </List>
                <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
                key="married"
                >
                <ListItem divider key="m0">
                    <Typography variant="h6" gutterBottom>
                            Małżeństwo:
                        </Typography>
                    </ListItem>
                    <ListItem button divider key="m1">
                        <ListItemText primary="Zuzanna Zalewska" secondary="1823.12.02 Filipów" />
                    </ListItem>
                    <ListItem button divider key="m2">
                        <ListItemText primary="Katarzyna Gordejko" secondary="1823.12.02 Filipów" />
                    </ListItem>
                    <ListItem key="m99">
                    <Link style={{textDecoration: 'none', color: 'red'}}
                            to={`/`}
                            title="Dodaj małżeństwo"
                            >
                            <AddIcon sx={{fontSize:'small'}} /> Dodaj małżeństwo  
                            </Link>
                    </ListItem>
                </List>

                <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
                key="kids"
                >
                    <ListItem divider>
                        <Typography variant="h6" gutterBottom>
                         Dzieci:
                        </Typography>
                    </ListItem>

                    {( !data.kids ? '' 
                    : 
                    (Object.keys(data.kids).length) > 0 ?
                        <>
                        { data.kids.map((kid, index) => (
                            <ListItem button divider  key={kid.fullname}>
                                <Link style={{textDecoration: 'none'}}
                                to={`/family/searchpersons/${kid._id}`}
                                title={kid.fullname}
                                >
                                <ListItemText 
                                primary={kid.fullname} 
                                secondary=
                                
                                {kid.age === '2' ? (
                                    <> ur. {kid.birthyear} - {kid.birthyeartwo}, {kid.birthplace} ({kid.birthpar}) </>
                                ) : (
                                    <> ur. 
                                    {!kid.birthday ? '' : ` ${kid.birthday}.`}
                                    {!kid.birthmonth ? '' : ` ${kid.birthmonth}.`}
                                    {kid.birthyear}, {kid.birthplace} ({kid.birthpar})
                                    </>
                                )}
                                />
                                </Link>
                            </ListItem>
                        ))
                        }
                        </>
                        
                    :
                    ''
                    )} 
                    <ListItem button divider  key="k99">
                        <Link style={{textDecoration: 'none', color: 'red'}}
                        to={`/`}
                        title="Dodaj dziecko"
                        >
                        <AddIcon sx={{fontSize:'small'}} /> Dodaj dziecko   
                        </Link>
                    </ListItem>
                    
                </List>
                
                
                
            </Grid>
        </Grid>

        
        
        
    </Card>
  )
}

export default CardPerson