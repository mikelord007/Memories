import React from 'react';
import {Grid, CircularProgress} from '@material-ui/core';
import {useSelector} from 'react-redux';

import Post from './Post/post.js';
import useStyles from './styles.js';


const Posts = ({setCurrentId}) =>{
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    console.log('posts are',posts);

    return(
        !posts.length? <CircularProgress/> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid item key={posts.id} xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}

export default Posts;