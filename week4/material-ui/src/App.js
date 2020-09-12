import React from 'react';
import {CssBaseline, Button, IconButton, Icon, Container, Card, CardActions, Typography, CardContent, CardHeader, Avatar, CardMedia, makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
  media: {
    height:200
  },
  readMore:{
    marginLeft: "auto"
  },
  avatar: {
    backgroundColor: "orangered"
  },
  article: {
    margin: 15
  }
})

function ArticleCard(){
  const classes = useStyles();
  return (
    <Card className={classes.article}>
      <CardHeader 
        avatar={<Avatar className={classes.avatar}>JS</Avatar>}
        title="John Smis"
        subheader="Joined last week"
      />
      <CardMedia 
        className={classes.media}
        image="http://picsum.photos/id/1015/600/400"
      />
      <CardContent>
        <Typography variant="h6">Clickbait title!</Typography>
        <Typography variant="body2">Really interesting take on topic......</Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <Icon>favorite</Icon>
        </IconButton>
        <IconButton>
          <Icon>share</Icon>
        </IconButton>
        <Button 
          className={classes.readMore}
          variant="outlined" 
          color="primary"
          >Read more</Button>
      </CardActions>
    </Card>
  )
}

function App() {

  return (

    <div className="App">
      <CssBaseline>
        <Container>
           <ArticleCard />
           <ArticleCard />
        </Container>
      </CssBaseline>
    </div>
  );
}

export default App;
