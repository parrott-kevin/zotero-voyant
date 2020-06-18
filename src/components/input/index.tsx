import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import React, { useRef, useState } from 'react';

import viewModel from './viewModel';

const HiddenInput = styled('input')({
  display: 'none',
});

const Input: React.FC = () => {
  const [data, setData] = useState('');
  const inputEl = useRef<HTMLInputElement | null>(null);

  const vm = new viewModel();

  const handleClick = (): void => {
    inputEl.current?.click();
  };

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.target.files) {
      const file = event.target.files[0];
      const result = await vm.handleUpload(file);
      if (result) {
        setData(result);
      }
    }
  };

  const handleReset = (): void => {
    setData('');
  };

  return (
    <Grid container direction="column" spacing={2}>
      {!data ? (
        <Grid item xs={12} sm={6}>
          <HiddenInput
            ref={inputEl}
            type="file"
            id="upload"
            onChange={(e): void => {
              handleUpload(e);
            }}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClick}
            fullWidth
          >
            Upload XML file
          </Button>
        </Grid>
      ) : (
        <>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              href={data}
              download="data.json"
              fullWidth
            >
              Download
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              color="secondary"
              type="button"
              onClick={handleReset}
              fullWidth
            >
              Reset
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};
export default Input;
