import { type ApiSoulseekFile } from '../../lib/generated/types';
import * as transfers from '../../lib/transfers';
import { formatBytes } from '../../lib/util';
import FileList from '../Shared/FileList';
import { Component } from 'react';
import { Button, Card, Icon, Label } from 'semantic-ui-react';

export type ApiFileWithSelected = ApiSoulseekFile & {
  selected: boolean;
};

const initialState = {
  downloadError: '',
  downloadRequest: undefined,
};

type Props = {
  readonly files: ApiSoulseekFile[];
  readonly locked: boolean;
  readonly marginTop?: number;
  readonly name: string;
  readonly onClose: () => void;
  readonly username: string;
};

type State = {
  downloadError: string;
  downloadRequest: string | undefined;
  files: ApiFileWithSelected[];
};

class Directory extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      ...initialState,
      files: this.props.files.map((f) => ({ selected: false, ...f })),
    };
  }

  public override componentDidUpdate(previousProps: Props) {
    if (this.props.name !== previousProps.name) {
      this.setState({
        files: this.props.files.map((f) => ({ selected: false, ...f })),
      });
    }
  }

  protected handleFileSelectionChange = (
    file: ApiFileWithSelected,
    state: boolean,
  ) => {
    file.selected = state;
    this.setState((previousState) => ({
      ...previousState,
      downloadError: '',
      downloadRequest: undefined,
    }));
  };

  protected download = (username: string, files: ApiFileWithSelected[]) => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.setState({ downloadRequest: 'inProgress' }, async () => {
      try {
        const requests = files.map(({ filename, size }) => ({
          filename,
          size,
        }));
        await transfers.download({ files: requests, username });

        this.setState({ downloadRequest: 'complete' });
      } catch (error) {
        this.setState({
          downloadError: error.response,
          downloadRequest: 'error',
        });
      }
    });
  };

  public override render() {
    const { locked, marginTop, name, onClose, username } = this.props;
    const { downloadError, downloadRequest, files } = this.state;

    const selectedFiles = files.filter((f) => f.selected);

    const selectedSize = formatBytes(
      selectedFiles.reduce((total, f) => total + f.size, 0),
    );

    return (
      <Card
        className="result-card"
        raised
      >
        <Card.Content>
          <div style={{ marginTop: marginTop ?? 0 }}>
            <FileList
              directoryName={name}
              disabled={downloadRequest === 'inProgress'}
              files={files}
              locked={locked}
              onClose={onClose}
              onSelectionChange={this.handleFileSelectionChange}
            />
          </div>
        </Card.Content>
        {selectedFiles.length > 0 && (
          <Card.Content extra>
            <span>
              <Button
                color="green"
                content="Download"
                disabled={downloadRequest === 'inProgress'}
                icon="download"
                label={{
                  as: 'a',
                  basic: false,
                  content: `${selectedFiles.length} file${selectedFiles.length === 1 ? '' : 's'}, ${selectedSize}`,
                }}
                labelPosition="right"
                onClick={() => this.download(username, selectedFiles)}
              />
              {downloadRequest === 'inProgress' && (
                <Icon
                  loading
                  name="circle notch"
                  size="large"
                />
              )}
              {downloadRequest === 'complete' && (
                <Icon
                  color="green"
                  name="checkmark"
                  size="large"
                />
              )}
              {downloadRequest === 'error' && (
                <span>
                  <Icon
                    color="red"
                    name="x"
                    size="large"
                  />
                  <Label>
                    {downloadError.data +
                      ` (HTTP ${downloadError.status} ${downloadError.statusText})`}
                  </Label>
                </span>
              )}
            </span>
          </Card.Content>
        )}
      </Card>
    );
  }
}

export default Directory;
