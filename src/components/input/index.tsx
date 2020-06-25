import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import React, { useRef, useState } from 'react';

import viewModel, { Fields } from './viewModel';

const HiddenInput = styled('input')({
  display: 'none',
});

const Input: React.FC = () => {
  const [data, setData] = useState('');
  const inputEl = useRef<HTMLInputElement | null>(null);

  const vm = new viewModel();

  const defaultFields: Fields = {
    keywords: true,
    researchNotes: false,
    refType: false,
    workType: false,
  };

  const [fields, setFields] = useState({ ...defaultFields });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFields({ ...fields, [event.target.name]: event.target.checked });
  };

  const { keywords, researchNotes, refType, workType } = fields;

  const handleClick = (): void => {
    inputEl.current?.click();
  };

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.target.files) {
      const file = event.target.files[0];
      const result = await vm.handleUpload(file, fields);
      if (result) {
        setData(result);
      }
    }
  };

  const handleReset = (): void => {
    setData('');
    setFields({ ...defaultFields });
  };

  return (
    <Grid container direction="column" spacing={2}>
      {!data ? (
        <>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Fields to include</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={keywords}
                      onChange={handleChange}
                      name="keywords"
                    />
                  }
                  label="Keywords"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={researchNotes}
                      onChange={handleChange}
                      name="researchNotes"
                    />
                  }
                  label="Research Notes"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={refType}
                      onChange={handleChange}
                      name="refType"
                    />
                  }
                  label="Item Type"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={workType}
                      onChange={handleChange}
                      name="workType"
                    />
                  }
                  label="Website Type"
                />
              </FormGroup>
            </FormControl>
          </Grid>
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
        </>
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
