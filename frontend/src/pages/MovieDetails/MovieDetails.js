import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import MovieCard from "../Card/MovieCard"
export default function MovieDetails(props) {
    const [movie, setmovie] = useState({})
    useEffect(() => {
        setInterval(
            () => {
                axios.post("http://localhost:5000/api/movie/getMovieById", {
                    id: props.match.params.id
                }).then(response => {
                    setmovie(response.data.movies)
                }).catch(function (error) {
                    // handle error
                    console.log(error);
                })
            },
            3000
        );
    }, [])
    return <div>

        <Grid container spacing={2} style={{ marginTop: 20, }}>

            <Grid item xs={12} md={12} >
                <MovieCard movie={movie} height="800px" url={"/"}></MovieCard>
            </Grid>

        </Grid>
    </div>;
}
