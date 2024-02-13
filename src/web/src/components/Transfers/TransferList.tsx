import {
  type ApiSlskdTransfersTransfer,
  type ApiSoulseekTransferDirection,
  type ApiSoulseekTransferStates,
} from '../../lib/generated/types';
import {
  type ByteUnits,
  formatBytes,
  formatBytesAsUnit,
  getFileName,
} from '../../lib/util';
import { Component } from 'react';
import {
  Button,
  Checkbox,
  Header,
  Icon,
  List,
  Progress,
  type SemanticCOLORS,
  Table,
} from 'semantic-ui-react';

const getColor = (
  state: ApiSoulseekTransferStates,
): { color?: SemanticCOLORS } => {
  switch (state) {
    case 'InProgress':
      return { color: 'blue' };
    case 'Completed, Succeeded':
      return { color: 'green' };
    case 'Requested':
    case 'Queued, Locally':
    case 'Queued, Remotely':
    case 'Queued':
      return {};
    case 'Initializing':
      return { color: 'teal' };
    default:
      return { color: 'red' };
  }
};

const isRetryableState = (state: ApiSoulseekTransferStates) =>
  getColor(state).color === 'red';
const isQueuedState = (state: ApiSoulseekTransferStates) =>
  state.includes('Queued');

const formatBytesTransferred = ({
  bytesTransferred,
  size,
}: ApiSlskdTransfersTransfer) => {
  const [s, sExtension] = formatBytes(size, 1).split(' ');

  if (s == null || sExtension == null) {
    return `${bytesTransferred}/${size} B`;
  }

  const t = formatBytesAsUnit(
    bytesTransferred,
    sExtension as (typeof ByteUnits)[number],
    1,
  );

  return `${t}/${s} ${sExtension}`;
};

type TransferListItem = ApiSlskdTransfersTransfer & {
  readonly selected: boolean;
};

type Props = {
  readonly direction: ApiSoulseekTransferDirection;
  readonly directoryName: string;
  readonly files: TransferListItem[];
  readonly onPlaceInQueueRequested: (file: TransferListItem) => void;
  readonly onRetryRequested: (file: TransferListItem) => void;
  readonly onSelectionChange: (
    directoryName: string,
    file: TransferListItem,
    selected: boolean,
  ) => void;
  readonly username: string;
};

type State = {
  isFolded: boolean;
};

class TransferList extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      isFolded: false,
    };
  }

  protected handleClick = (file: TransferListItem) => {
    const { direction, state } = file;

    if (direction === 'Download') {
      if (isRetryableState(state)) {
        this.props.onRetryRequested(file);
        return;
      }

      if (isQueuedState(state)) {
        this.props.onPlaceInQueueRequested(file);
      }
    }
  };

  protected toggleFolded = () => {
    this.setState((previousState) => ({ isFolded: !previousState.isFolded }));
  };

  public override render() {
    const { directoryName, files, onSelectionChange } = this.props;
    const { isFolded } = this.state;

    return (
      <div>
        <Header
          className="filelist-header"
          size="small"
        >
          <Icon
            link
            name={isFolded ? 'folder' : 'folder open'}
            onClick={() => this.toggleFolded()}
          />
          {directoryName}
        </Header>
        {isFolded === false ? (
          <List>
            <List.Item>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell className="transferlist-selector">
                      <Checkbox
                        checked={files.filter((f) => !f.selected).length === 0}
                        fitted
                        onChange={(event, data) =>
                          files.map((file) =>
                            onSelectionChange(
                              directoryName,
                              file,
                              data.checked ?? false,
                            ),
                          )
                        }
                      />
                    </Table.HeaderCell>
                    <Table.HeaderCell className="transferlist-filename">
                      File
                    </Table.HeaderCell>
                    <Table.HeaderCell className="transferlist-progress">
                      Progress
                    </Table.HeaderCell>
                    <Table.HeaderCell className="transferlist-size">
                      Size
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {files
                    .sort((a, b) =>
                      getFileName(a.filename).localeCompare(
                        getFileName(b.filename),
                      ),
                    )
                    .map((f) => (
                      <Table.Row key={f.filename}>
                        <Table.Cell className="transferlist-selector">
                          <Checkbox
                            checked={f.selected}
                            fitted
                            onChange={(event, data) =>
                              onSelectionChange(
                                directoryName,
                                f,
                                data.checked ?? false,
                              )
                            }
                          />
                        </Table.Cell>
                        <Table.Cell className="transferlist-filename">
                          {getFileName(f.filename)}
                        </Table.Cell>
                        <Table.Cell className="transferlist-progress">
                          {f.state === 'InProgress' ? (
                            <Progress
                              {...getColor(f.state)}
                              percent={Math.round(f.percentComplete)}
                              progress
                              style={{ margin: 0 }}
                            />
                          ) : (
                            <Button
                              fluid
                              size="mini"
                              style={{
                                cursor: f.direction === 'Upload' ? 'unset' : '',
                                margin: 0,
                                padding: 7,
                              }}
                              {...getColor(f.state)}
                              active={f.direction === 'Upload'}
                              onClick={() => this.handleClick(f)}
                            >
                              {f.direction === 'Download' &&
                                isQueuedState(f.state) && (
                                  <Icon name="refresh" />
                                )}
                              {f.direction === 'Download' &&
                                isRetryableState(f.state) && (
                                  <Icon name="redo" />
                                )}
                              {f.state}
                              {f.placeInQueue ? ` (#${f.placeInQueue})` : ''}
                            </Button>
                          )}
                        </Table.Cell>
                        <Table.Cell className="transferlist-size">
                          {formatBytesTransferred(f)}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
            </List.Item>
          </List>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default TransferList;
