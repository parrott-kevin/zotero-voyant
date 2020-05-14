import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';

import viewModel from './viewModel';

interface Props {
  setOutput: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<Props> = ({ setOutput }) => {
  const [value, setValue] = useState('');

  const vm = new viewModel();

  const handleChange = (value: string): void => {
    setValue(value);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const corpus = await vm.process(value);
    // output multiple files
    setOutput(JSON.stringify({ data: corpus }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="input"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            value={value}
            onChange={(event): void => handleChange(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default Input;
