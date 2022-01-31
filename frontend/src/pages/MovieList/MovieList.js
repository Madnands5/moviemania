import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios"
import Grid from '@mui/material/Grid';
import MovieCard from "../Card/MovieCard";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export function Header(props) {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        MovieMania
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => props.setquery(e.target.value)}
                            />
                        </Search>
                    </Box>
                    <Box md={{ flexGrow: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">G</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={props.genre}
                                label="Age"
                                onChange={(e) => props.setgenre(e.target.value)}
                            >
                                <MenuItem value={'action'}>Action</MenuItem>
                                <MenuItem value={'suspense'}>Suspense</MenuItem>
                                <MenuItem value={'superhero'}>Superhero</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Toolbar>
            </AppBar>

        </Box>
    );
}

export default function MovieList(props) {
    const [movieList, setmovieList] = useState([])
    const [query, setquery] = useState("");
    const [genre, setgenre] = useState(""); let interval;
    useEffect(() => {
        interval = setInterval(() => {
            getData()
        }, 3000);
        return () => clearInterval(interval);
    }, [])
    useEffect(() => {
        clearInterval(interval);
        getData();
    }, [query, genre])
    function getData() {

        if (query !== "") {
            axios.post("http://localhost:5000/api/movie/getMovieByQuery", {
                name: query, genre: genre
            }).then(response => {
                setmovieList(response.data.movies)
            }).catch(function (error) {
                // handle error
                console.log(error);
            })
        } else {
            axios.get("http://localhost:5000/api/movie/getall").then(response => {
                setmovieList(response.data.movies)
            }).catch(function (error) {
                // handle error
                console.log(error);
            })
        }
    }
    return (
        <div>
            <Header setquery={setquery} setgenre={setgenre} genre={genre}></Header>
            <Grid container spacing={2} style={{ marginTop: 20, }}>
                {movieList.map((movie, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <MovieCard movie={movie} url={"movie/" + movie._id}></MovieCard>
                    </Grid>
                ))}
            </Grid>
        </div>);
}
