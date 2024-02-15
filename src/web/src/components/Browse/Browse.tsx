/* eslint-disable promise/prefer-await-to-then */
import './Browse.css';
import { type ApiSoulseekDirectory } from '../../lib/generated/types';
import * as users from '../../lib/users';
import PlaceholderSegment from '../Shared/PlaceholderSegment';
import Directory from './Directory';
import DirectoryTree from './DirectoryTree';
import * as lzString from 'lz-string';
import { Component, createRef } from 'react';
import { Card, Icon, Input, Loader, Segment } from 'semantic-ui-react';

const initialState = {
  browseError: undefined,
  browseState: 'idle' as const,
  browseStatus: 0,
  info: {
    directories: 0,
    files: 0,
    lockedDirectories: 0,
    lockedFiles: 0,
  },
  interval: undefined,
  selectedDirectory: undefined,
  selectedFiles: [],
  separator: '\\',
  tree: [],
  username: '',
};

export type BrowseDirectory = ApiSoulseekDirectory & {
  children: BrowseDirectory[];
  isLocked: boolean;
};

type Props = {};

type State = {
  browseError: Error | undefined;
  browseState: 'idle' | 'pending' | 'complete' | 'error';
  browseStatus: number;
  info: {
    directories: number;
    files: number;
    lockedDirectories: number;
    lockedFiles: number;
  };
  interval: number | undefined;
  selectedDirectory: BrowseDirectory | undefined;
  selectedFiles: Array<{
    filename: string;
    size: number;
  }>;
  separator: string;
  tree: BrowseDirectory[];
  username: string;
};

class Browse extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = initialState;
  }

  public override componentDidMount() {
    this.fetchStatus();
    this.loadState();
    this.setState(
      {
        interval: window.setInterval(this.fetchStatus, 500),
      },
      () => this.saveState(),
    );

    document.addEventListener('keyup', this.keyUp, false);
  }

  public override componentWillUnmount() {
    clearInterval(this.state.interval);
    this.setState({ interval: undefined });
    document.removeEventListener('keyup', this.keyUp, false);
  }

  protected inputtext = createRef<HTMLInputElement>();

  protected browse = () => {
    if (this.inputtext.current == null) {
      // this should never happen
      return;
    }

    const username = this.inputtext.current.value;

    this.setState(
      { browseError: undefined, browseState: 'pending', username },
      () => {
        users
          .browse({ username })
          .then((response) => {
            let directories =
              response.directories?.map((d) => ({
                ...d,
                children: [],
                isLocked: false,
              })) ?? [];
            const lockedDirectories = response.lockedDirectories ?? [];

            // we need to know the directory separator. use a placeholder to start.
            let separator = '-';

            const directoryCount = directories.length;
            const fileCount = directories.reduce((accumulator, directory) => {
              // examine each directory as we process it to see if it contains \ or /, and set separator accordingly
              if (separator === '-') {
                if (directory.name?.includes('\\')) separator = '\\';
                else if (directory.name?.includes('/')) separator = '/';
              }

              return accumulator + directory.fileCount;
            }, 0);

            const lockedDirectoryCount = lockedDirectories.length;
            const lockedFileCount = lockedDirectories.reduce(
              (accumulator, directory) => accumulator + directory.fileCount,
              0,
            );

            directories = directories.concat(
              lockedDirectories.map((d) => ({
                ...d,
                children: [],
                isLocked: true,
              })),
            );

            this.setState({
              info: {
                directories: directoryCount,
                files: fileCount,
                lockedDirectories: lockedDirectoryCount,
                lockedFiles: lockedFileCount,
              },
              separator,
              tree: this.getDirectoryTree({ directories, separator }) ?? [],
            });
          })
          .then(() =>
            this.setState(
              { browseError: undefined, browseState: 'complete' },
              () => {
                this.saveState();
              },
            ),
          )
          .catch((error) =>
            this.setState({ browseError: error, browseState: 'error' }),
          );
      },
    );
  };

  protected clear = () => {
    this.setState(initialState, () => {
      this.saveState();
      this.inputtext.current?.focus();
    });
  };

  protected keyUp = (event: KeyboardEvent) =>
    event.key === 'Escape' ? this.clear() : '';

  protected storeToLocalStorage = () => {
    try {
      localStorage.setItem(
        'soulseek-example-browse-state',
        lzString.compress(JSON.stringify(this.state)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  protected saveState = () => {
    if (this.inputtext.current == null) {
      // should never happen?
      return;
    }

    this.inputtext.current.value = this.state.username;
    this.inputtext.current.disabled = this.state.browseState !== 'idle';

    // Shifting the compression and safe out of the current render loop to speed up responsiveness
    // requestIdleCallback is not supported in Safari hence we push to next tick using Promise.resolve
    if (window.requestIdleCallback) {
      window.requestIdleCallback(this.storeToLocalStorage);
    } else {
      void Promise.resolve().then(this.storeToLocalStorage);
    }
  };

  protected loadState = () => {
    this.setState(
      JSON.parse(
        lzString.decompress(
          localStorage.getItem('soulseek-example-browse-state') ?? '',
        ),
      ) || initialState,
    );
  };

  protected fetchStatus = () => {
    const { browseState, username } = this.state;
    if (browseState === 'pending') {
      void users.getBrowseStatus({ username }).then((response) =>
        this.setState({
          browseStatus: response.data,
        }),
      );
    }
  };

  protected getDirectoryTree = ({
    directories,
    separator,
  }: {
    directories: BrowseDirectory[];
    separator: string;
  }) => {
    if (directories.length === 0 || directories[0]?.name == null) {
      return [];
    }

    // Optimise this process so we only:
    // - loop through all directories once
    // - do the split once
    // - future look ups are done from the Map
    const depthMap = new Map<number, BrowseDirectory[]>();
    for (const d of directories) {
      const directoryDepth = d.name?.split(separator).length ?? 0;
      if (!depthMap.has(directoryDepth)) {
        depthMap.set(directoryDepth, []);
      }

      depthMap.get(directoryDepth)?.push(d);
    }

    const depth = Math.min(...Array.from(depthMap.keys()));

    return depthMap
      .get(depth)
      ?.map((directory) =>
        this.getChildDirectories(depthMap, directory, separator, depth + 1),
      );
  };

  protected getChildDirectories = (
    depthMap: Map<number, BrowseDirectory[]>,
    root: BrowseDirectory,
    separator: string,
    depth: number,
  ): BrowseDirectory => {
    const rootName = root.name;

    if (!depthMap.has(depth) || rootName == null) {
      return { ...root, children: [] };
    }

    const children =
      depthMap.get(depth)?.filter((d) => d.name?.startsWith(rootName)) ?? [];

    return {
      ...root,
      children:
        children?.map((c) =>
          this.getChildDirectories(depthMap, c, separator, depth + 1),
        ) ?? [],
    };
  };

  protected selectDirectory = (directory: BrowseDirectory) => {
    this.setState({ selectedDirectory: { ...directory, children: [] } }, () =>
      this.saveState(),
    );
  };

  protected handleDeselectDirectory = () => {
    this.setState({ selectedDirectory: initialState.selectedDirectory }, () =>
      this.saveState(),
    );
  };

  public override render() {
    const {
      browseError,
      browseState,
      browseStatus,
      info,
      selectedDirectory,
      separator,
      tree,
      username,
    } = this.state;
    const { isLocked = false, name = undefined } = selectedDirectory ?? {};
    const pending = browseState === 'pending';

    const emptyTree = !(tree && tree.length > 0);

    const files = (selectedDirectory?.files ?? []).map((f) => ({
      ...f,
      filename: `${name}${separator}${f.filename}`,
    }));

    return (
      <div className="search-container">
        <Segment
          className="browse-segment"
          raised
        >
          <div className="browse-segment-icon">
            <Icon
              name="folder open"
              size="big"
            />
          </div>
          <Input
            action={
              !pending &&
              (browseState === 'idle'
                ? { icon: 'search', onClick: this.browse }
                : { color: 'red', icon: 'x', onClick: this.clear })
            }
            className="search-input"
            disabled={pending}
            input={
              <input
                data-lpignore="true"
                placeholder="Username"
                type="search"
              />
            }
            loading={pending}
            onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) =>
              event.key === 'Enter' ? this.browse() : ''
            }
            placeholder="Username"
            ref={this.inputtext}
            size="big"
          />
        </Segment>
        {pending ? (
          <Loader
            active
            className="search-loader"
            inline="centered"
            size="big"
          >
            Downloaded {Math.round(browseStatus ?? 0)}% of Response
          </Loader>
        ) : (
          <div>
            {browseError ? (
              <span className="browse-error">Failed to browse {username}</span>
            ) : (
              <div className="browse-container">
                {emptyTree ? (
                  <PlaceholderSegment
                    caption="No user share to display"
                    icon="folder open"
                  />
                ) : (
                  <Card
                    className="browse-tree-card"
                    raised
                  >
                    <Card.Content>
                      <Card.Header>
                        <Icon
                          color="green"
                          name="circle"
                        />
                        {username}
                      </Card.Header>
                      <Card.Meta className="browse-meta">
                        <span>
                          {`${info.files + info.lockedFiles} files in ${info.directories + info.lockedDirectories} directories (including ${info.lockedFiles} files in ${info.lockedDirectories} locked directories)`}{' '}
                          {/* eslint-disable-line max-len */}
                        </span>
                      </Card.Meta>
                      <Segment className="browse-folderlist">
                        <DirectoryTree
                          onSelect={(_, value) => this.selectDirectory(value)}
                          selectedDirectoryName={name}
                          tree={tree}
                        />
                      </Segment>
                    </Card.Content>
                  </Card>
                )}
                {name && (
                  <Directory
                    files={files}
                    locked={isLocked}
                    marginTop={-20}
                    name={name}
                    onClose={this.handleDeselectDirectory}
                    username={username}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Browse;
