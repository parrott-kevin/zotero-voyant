import TextField from '@material-ui/core/TextField';
import React from 'react';
interface Props {
  value: string;
}
const Output: React.FC<Props> = ({ value }) => {
  return (
    <TextField
      label="output"
      multiline
      rows={10}
      variant="outlined"
      fullWidth
      value={value}
    />
  );
};

export default Output;
