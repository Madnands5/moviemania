import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import history from '../../Utils/Routing/history';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));




export default function MovieCard(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    function upvote() {
        axios.post("http://localhost:5000/api/movie/upVoteMovie", {
            id: props.movie._id,
            upvotes: props.movie.upvotes
        }).then(response => {

        }).catch(function (error) {

            console.log(error);
        })
    };
    function downvote() {
        axios.post("http://localhost:5000/api/movie/downVoteMovie", {
            id: props.movie._id,
            downvotes: props.movie.downvotes
        }).then(response => {
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }
    return (
        <Card style={{ width: '100%', height: props.height ? props.height : '400px' }} >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {props.movie?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                }
                onClick={() => history.goBack()}
                title={props.movie?.name?.toUpperCase()}

            />
            <CardMedia
                component="img"
                height={props.height ? ' 500px' : "194"}
                image={props.movie.pic}
                alt="Paella dish"
                onClick={() => history.push(props.url)}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.movie.details}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => upvote()}>
                    <ThumbUpIcon />{props.movie.upvotes}
                </IconButton>
                <IconButton aria-label="share" onClick={() => downvote()}>
                    <ThumbDownIcon />{props.movie.downvotes}
                </IconButton>

            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        {props.movie.details}
                    </Typography>


                </CardContent>
            </Collapse>
        </Card>);
}
