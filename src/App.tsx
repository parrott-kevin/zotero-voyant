import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';

import Input from './components/input';
import Output from './components/output';

const App: React.FC = () => {
  const [output, setOutput] = useState('');

  const corpus = [
    {
      key: 'Content',
      def: '/content',
    },
    {
      key: 'Title',
      def: '/title',
    },
    {
      key: 'Author',
      def: 'N/A',
    },
    {
      key: 'Documents',
      def: '/data',
    },
  ];

  return (
    <>
      <Box pb={2}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5">JSON Pointers</Typography>
            {corpus.map((item, index) => {
              return (
                <Typography key={index} variant="body1">
                  <strong>{item.key}: </strong> {item.def}
                </Typography>
              );
            })}
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Input setOutput={setOutput} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Output value={output} />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
