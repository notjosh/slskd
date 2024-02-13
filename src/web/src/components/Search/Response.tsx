import {
  type ApiSlskdSearchFile,
  type ApiSlskdSearchResponse,
  type ApiSlskdTransfersAPIQueueDownloadRequest,
} from '../../lib/generated/types';
import * as transfers from '../../lib/transfers';
import { getDirectoryContents } from '../../lib/users';
import { formatBytes, getDirectoryName } from '../../lib/util';
import FileList from '../Shared/FileList';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { Button, Card, Icon, Label } from 'semantic-ui-react';

const buildTree = (response: ApiSlskdSearchResponse) => {
  let { files = [] } = response;
  const { lockedFiles = [] } = response;
  files = files.concat(lockedFiles.map((file) => ({ ...file, locked: true })));

  return files.reduce<Record<string, ApiSlskdSearchFile[]>>((dict, file) => {
    const directory = getDirectoryName(file.filename);
    const selectable = { selected: false, ...file };

    const existing = dict[directory];
    dict[directory] =
      existing === undefined ? [selectable] : existing.concat(selectable);

    return dict;
  }, {});
};

type Props = {
  readonly disabled: boolean;
  readonly isInitiallyFolded: boolean;
  readonly onHide: () => void;
  readonly response: ApiSlskdSearchResponse;
};

type State = {
  downloadError: string;
  downloadRequest: ApiSlskdTransfersAPIQueueDownloadRequest | undefined;
  fetchingDirectoryContents: boolean;
  isFolded: boolean;
  tree: Record<string, ApiSlskdSearchFile[]>;
};

class Response extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      downloadError: '',
      downloadRequest: undefined,
      fetchingDirectoryContents: false,
      isFolded: this.props.isInitiallyFolded,
      tree: buildTree(this.props.response),
    };
  }

  public override componentDidUpdate(previousProps: Props) {
    if (
      JSON.stringify(this.props.response) !==
      JSON.stringify(previousProps.response)
    ) {
      this.setState({ tree: buildTree(this.props.response) });
    }

    if (this.props.isInitiallyFolded !== previousProps.isInitiallyFolded) {
      this.setState({ isFolded: this.props.isInitiallyFolded });
    }
  }

  protected handleFileSelectionChange = (file: ApiSlskdSearchFile, state) => {
    file.selected = state;
    this.setState((previousState) => ({
      downloadError: '',
      downloadRequest: undefined,
      tree: previousState.tree,
    }));
  };

  protected download = (username: string, files: ApiSlskdSearchFile[]) => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.setState({ downloadRequest: 'inProgress' }, async () => {
      try {
        const requests = (files || []).map(({ filename, size }) => ({
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

  protected getFullDirectory = async (username: string, directory: string) => {
    this.setState({ fetchingDirectoryContents: true });

    try {
      const oldTree = { ...this.state.tree };
      const oldFiles = oldTree[directory];

      const { files, name } = await getDirectoryContents({
        directory,
        username,
      });

      // the api returns file names only, so we need to prepend the directory
      // to make it look like a search result.  we also need to preserve
      // any file selections, so check the old files and assign accordingly
      const fixedFiles = (files ?? []).map((file) => ({
        ...file,
        filename: `${directory}\\${file.filename}`,
        selected:
          oldFiles?.find((f) => f.filename === `${directory}\\${file.filename}`)
            ?.selected ?? false,
      }));

      oldTree[name] = fixedFiles;
      this.setState({ tree: { ...oldTree } });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data ?? error?.message ?? error);
    } finally {
      this.setState({ fetchingDirectoryContents: false });
    }
  };

  protected handleToggleFolded = () => {
    this.setState((previousState) => ({ isFolded: !previousState.isFolded }));
  };

  public override render() {
    const { response } = this.props;
    const free = response.hasFreeUploadSlot;

    const {
      downloadError,
      downloadRequest,
      fetchingDirectoryContents,
      isFolded,
      tree,
    } = this.state;

    const selectedFiles = Object.keys(tree)
      .reduce<ApiSlskdSearchFile[]>((list, dict) => list.concat(tree[dict]), [])
      .filter((f) => f.selected);

    const selectedSize = formatBytes(
      selectedFiles.reduce((total, f) => total + f.size, 0),
    );

    return (
      <Card
        className="result-card"
        raised
      >
        <Card.Content>
          <Card.Header>
            <Icon
              link
              name={isFolded ? 'chevron right' : 'chevron down'}
              onClick={this.handleToggleFolded}
            />
            <Icon
              color={free ? 'green' : 'yellow'}
              name="circle"
            />
            {response.username}
            <Icon
              className="close-button"
              color="red"
              link
              name="close"
              onClick={() => this.props.onHide()}
            />
          </Card.Header>
          <Card.Meta className="result-meta">
            <span>
              Upload Speed: {formatBytes(response.uploadSpeed)}/s, Free Upload
              Slot: {free ? 'YES' : 'NO'}, Queue Length: {response.queueLength}
            </span>
          </Card.Meta>
          {((!isFolded && Object.keys(tree)) || []).map((directory) => (
            <FileList
              directoryName={directory}
              disabled={downloadRequest === 'inProgress'}
              files={tree[directory]}
              footer={
                <button
                  disabled={fetchingDirectoryContents}
                  onClick={async () =>
                    await this.getFullDirectory(response.username, directory)
                  }
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100%',
                  }}
                  type="button"
                >
                  <Icon
                    loading={fetchingDirectoryContents}
                    name={fetchingDirectoryContents ? 'circle notch' : 'folder'}
                  />
                  Get Full Directory Contents
                </button>
              }
              key={directory}
              locked={tree[directory].find((file) => file.locked)}
              onSelectionChange={this.handleFileSelectionChange}
            />
          ))}
        </Card.Content>
        {selectedFiles.length > 0 && (
          <Card.Content extra>
            <span>
              <Button
                color="green"
                content="Download"
                disabled={
                  this.props.disabled || downloadRequest === 'inProgress'
                }
                icon="download"
                label={{
                  as: 'a',
                  basic: false,
                  content: `${selectedFiles.length} file${selectedFiles.length === 1 ? '' : 's'}, ${selectedSize}`,
                }}
                labelPosition="right"
                onClick={() => this.download(response.username, selectedFiles)}
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

export default Response;
