import * as transfers from '../../lib/transfers';
import TransferList from './TransferList';
import { Component } from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';

export type FileModel = {
  readonly direction: transfers.TransferDirection;
  readonly filename: string;
  readonly id: string;
  readonly size: number;
  readonly state: transfers.TransferState;
  readonly username: string;
};

type Props = {
  readonly direction: transfers.TransferDirection;
  readonly user: {
    directories: Array<{
      directory: string;
      files: FileModel[];
    }>;
    username: string;
  };
};

type State = {
  isFolded: boolean;
  selections: Set<string>;
};

class TransferGroup extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      isFolded: false,
      selections: new Set(),
    };
  }

  protected handleSelectionChange = (
    directoryName: string,
    file: { filename: string },
    selected: boolean,
  ) => {
    const { selections } = this.state;
    const object = JSON.stringify({
      directory: directoryName,
      filename: file.filename,
    });

    if (selected) {
      selections.add(object);
    } else {
      selections.delete(object);
    }

    this.setState({ selections });
  };

  protected isSelected = (directoryName: string, file: FileModel) =>
    this.state.selections.has(
      JSON.stringify({ directory: directoryName, filename: file.filename }),
    );

  protected getSelectedFiles = () => {
    const { user } = this.props;

    return Array.from(this.state.selections)
      .map((s) => JSON.parse(s))
      .map((s) =>
        user.directories
          .find((d) => d.directory === s.directory)
          ?.files.find((f) => f.filename === s.filename),
      )
      .filter((s): s is FileModel => s !== undefined);
  };

  protected removeFileSelection = (file: FileModel) => {
    const { selections } = this.state;

    const match = Array.from(selections)
      .map((s) => JSON.parse(s))
      .find((s) => s.filename === file.filename);

    if (match) {
      selections.delete(JSON.stringify(match));
      this.setState({ selections });
    }
  };

  protected retryAll = async (selected: FileModel[]) => {
    await Promise.all(
      selected.map(async (file) => await this.handleRetry(file)),
    );
  };

  protected cancelAll = async (
    direction: transfers.TransferDirection,
    username: string,
    selected: FileModel[],
  ) => {
    await Promise.all(
      selected.map(
        async (file) =>
          await transfers.cancel({ direction, id: file.id, username }),
      ),
    );
  };

  protected removeAll = async (
    direction: transfers.TransferDirection,
    username: string,
    selected: FileModel[],
  ) => {
    await Promise.all(
      selected.map(
        async (file) =>
          await transfers
            .cancel({ direction, id: file.id, remove: true, username })
            .then(() => this.removeFileSelection(file)),
      ),
    );
  };

  protected handleRetry = async (file: FileModel) => {
    const { filename, size, username } = file;

    try {
      await transfers.download({ files: [{ filename, size }], username });
    } catch (error) {
      console.error(error);
    }
  };

  protected handleFetchPlaceInQueue = async (file: FileModel) => {
    const { id, username } = file;

    try {
      await transfers.getPlaceInQueue({ id, username });
    } catch (error) {
      console.error(error);
    }
  };

  protected toggleFolded = () => {
    this.setState((previousState) => ({ isFolded: !previousState.isFolded }));
  };

  public override render() {
    const { direction, user } = this.props;
    const { isFolded } = this.state;

    const selected = this.getSelectedFiles();
    const all = selected.length > 1 ? ' Selected' : '';

    const allRetryable =
      selected.filter((f) => transfers.isStateRetryable(f.state)).length ===
      selected.length;
    const anyCancellable = selected.some((f) =>
      transfers.isStateCancellable(f.state),
    );
    const allRemovable =
      selected.filter((f) => transfers.isStateRemovable(f.state)).length ===
      selected.length;

    return (
      <Card
        className="transfer-card"
        key={user.username}
        raised
      >
        <Card.Content>
          <Card.Header>
            <Icon
              link
              name={isFolded ? 'chevron right' : 'chevron down'}
              onClick={() => this.toggleFolded()}
            />
            {user.username}
          </Card.Header>
          {user.directories &&
            !isFolded &&
            user.directories.map((directory) => (
              <TransferList
                direction={this.props.direction}
                directoryName={directory.directory}
                files={(directory.files || []).map((f) => ({
                  ...f,
                  selected: this.isSelected(directory.directory, f),
                }))}
                key={directory.directory}
                onPlaceInQueueRequested={this.handleFetchPlaceInQueue}
                onRetryRequested={this.handleRetry}
                onSelectionChange={this.handleSelectionChange}
                username={user.username}
              />
            ))}
        </Card.Content>
        {selected && selected.length > 0 && (
          <Card.Content extra>
            <Button.Group>
              {allRetryable && (
                <Button
                  color="green"
                  content={`Retry${all}`}
                  icon="redo"
                  onClick={async () => await this.retryAll(selected)}
                />
              )}
              {allRetryable && anyCancellable && <Button.Or />}
              {anyCancellable && (
                <Button
                  color="red"
                  content={`Cancel${all}`}
                  icon="x"
                  onClick={async () =>
                    await this.cancelAll(direction, user.username, selected)
                  }
                />
              )}
              {(allRetryable || anyCancellable) && allRemovable && (
                <Button.Or />
              )}
              {allRemovable && (
                <Button
                  content={`Remove${all}`}
                  icon="trash alternate"
                  onClick={async () =>
                    await this.removeAll(direction, user.username, selected)
                  }
                />
              )}
            </Button.Group>
          </Card.Content>
        )}
      </Card>
    );
  }
}

export default TransferGroup;
