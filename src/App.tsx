import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { parseStringPromise } from 'xml2js';

interface Record {
  titles: Title[];
  keywords?: Keyword[];
  'research-notes'?: string[];
}

interface Title {
  title: string[];
}

interface Keyword {
  keyword: string[];
}

// https://voyant-tools.org/docs/#!/guide/corpuscreator-section-json
interface Corpus {
  title: string;
  content: string;
  author?: string;
  publicationDate?: string;
  publisher?: string;
  location?: string;
  // keywords?: string;
  collection?: string;
}

const App: React.FC = () => {
  const [value, setValue] = useState('');
  const [output, setOutput] = useState('');

  const handleChange = (value: string): void => {
    setValue(value);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const xmlParsed = await parseStringPromise(value);
    const result = JSON.parse(JSON.stringify(xmlParsed));

    const corpus: Corpus[] = [];
    result.xml.records[0].record.forEach((record: Record) => {
      const title = record.titles.reduce((result: string, item) => {
        return result.concat(item.title.join(' '), ' ');
      }, '');

      const content = [];
      if (record.keywords) {
        const words = record.keywords.reduce((result: string, item) => {
          return result.concat(item.keyword.join(' '), ' ');
        }, '');
        content.push(words);
      }

      if (record['research-notes']) {
        //@ts-ignore
        const notes = record['research-notes'].reduce(
          (result: string, item: any) => {
            if (typeof item === 'string') {
              const sanitized = item.replace(/\r?\n|\r/g, ' ');
              return result.concat(sanitized, ' ');
            } else {
              // const sanitized = item.style['_'].replace(/\r?\n|\r/g, ' ');
              const styleContents = item.style.reduce(
                (result: string, item: any) => {
                  if (item._) {
                    const sanitized = item._.replace(/\r?\n|\r/g, ' ');
                    return result.concat(sanitized, ' ');
                  } else {
                    return result;
                  }
                },
                ''
              );
              return result.concat(styleContents, ' ');
            }
          },
          ''
        );
        content.push(notes);
      }

      corpus.push({
        title,
        content: content.join(' '),
      });
    });

    // output multiple files
    setOutput(JSON.stringify({ data: corpus }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="input"
                multiline
                rows={4}
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
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="output"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={output}
        />
      </Grid>
    </Grid>
  );
};

export default App;
