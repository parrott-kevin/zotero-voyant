import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TransformIcon from '@material-ui/icons/Transform';
import React from 'react';

import Input from './components/input';

const App: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box mr={1}>
            <TransformIcon />
          </Box>
          <Typography variant="h6">ZoVo</Typography>
        </Toolbar>
      </AppBar>
      <Box mt={1}>
        <Container>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Create Corpus</Typography>
              <Typography variant="body1" component="span">
                <ol>
                  <li>Click Upload XML File</li>
                  <li>Select XML File from Computer</li>
                  <li>Click Download JSON corpus</li>
                </ol>
              </Typography>
              <Typography variant="h6">
                Uploading JSON corpus to Voyant
              </Typography>
              <Typography variant="body1" component="span">
                <ol>
                  <li>Click the Options slide</li>
                  <li>Click JSON to open relevant fields</li>
                  <li>
                    Fill in fields with following information
                    <ul>
                      <li>Content: /content</li>
                      <li>Title: /title</li>
                      <li>Author: leave blank</li>
                      <li>Documents: /data</li>
                    </ul>
                  </li>
                  <li>Click Upload</li>
                  <li>Select JSON corpus saved from ZoVo</li>
                </ol>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default App;
