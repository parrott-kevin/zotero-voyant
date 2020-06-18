import { parseStringPromise } from 'xml2js';

interface Record {
  titles: Title[];
  keywords?: Keyword[];
  'research-notes'?: (string | Style)[];
}

interface Title {
  title: string[];
}

interface Keyword {
  keyword: string[];
}

interface Style {
  style: { _: string }[];
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

export default class InputViewModel {
  async handleUpload(file: File): Promise<string | undefined> {
    try {
      const fileContents = await this.readUploadedFileAsText(file);
      if (typeof fileContents === 'string') {
        const processed = await this.process(fileContents);
        const encoded = encodeURIComponent(JSON.stringify({ data: processed }));
        const result = `data:application/json;charset=utf-8,${encoded}`;
        return result;
      } else {
        throw new Error('Problem parsing input file');
      }
    } catch (err) {
      console.error(err.message);
      return;
    }
  }

  async readUploadedFileAsText(
    inputFile: Blob
  ): Promise<string | ArrayBuffer | null> {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = (): void => {
        reader.abort();
        reject(new DOMException('Problem parsing input file'));
      };

      reader.onload = (): void => {
        resolve(reader.result);
      };
      reader.readAsText(inputFile, 'UTF-8');
    });
  }

  async process(value: string): Promise<Corpus[]> {
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
        const sanitize = (item: string): string =>
          item.replace(/\r?\n|\r/g, ' ');

        const notes = record['research-notes'].reduce(
          (result: string, item) => {
            if (typeof item === 'string') {
              const sanitized = sanitize(item);
              return result.concat(sanitized, ' ');
            } else if (item.style) {
              const styleContents = item.style.reduce((result: string, i) => {
                if (i._) {
                  const sanitized = sanitize(i._);
                  return result.concat(sanitized, ' ');
                } else {
                  return result;
                }
              }, '');
              return result.concat(styleContents, ' ');
            } else {
              return result;
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

    return corpus;
  }
}
