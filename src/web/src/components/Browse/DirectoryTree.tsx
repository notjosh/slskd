import { type BrowseDirectory } from './Browse';
import { List } from 'semantic-ui-react';

const subtree = (
  root: Props['tree'],
  selectedDirectoryName: Props['selectedDirectoryName'],
  onSelect: Props['onSelect'],
) => {
  return (
    <>
      {(root ?? []).map((d) => {
        const selected = d.name === selectedDirectoryName;
        // const dimIfLocked = { opacity: d.locked ? 0.5 : 1 };

        return (
          <List
            className="browse-folderlist-list"
            key={d.name}
          >
            <List.Item>
              <List.Icon
                className={
                  'browse-folderlist-icon' +
                  (selected ? ' selected' : '') +
                  (d.isLocked ? ' locked' : '')
                }
                name={
                  d.isLocked === true
                    ? 'lock'
                    : selected
                      ? 'folder open'
                      : 'folder'
                }
              />
              <List.Content>
                <List.Header
                  className={
                    'browse-folderlist-header' +
                    (selected ? ' selected' : '') +
                    (d.isLocked ? ' locked' : '')
                  }
                  onClick={(event: React.MouseEvent<typeof List.Header>) =>
                    onSelect(event, d)
                  }
                >
                  {d.name?.split('\\').pop()?.split('/').pop()}
                </List.Header>
                <List.List>
                  {subtree(d.children, selectedDirectoryName, onSelect)}
                </List.List>
              </List.Content>
            </List.Item>
          </List>
        );
      })}
    </>
  );
};

type Props = {
  readonly onSelect: (
    event: React.MouseEvent<typeof List.Header>,
    value: BrowseDirectory,
  ) => void;
  readonly selectedDirectoryName: string | null | undefined;
  readonly tree: BrowseDirectory[];
};

const DirectoryTree: React.FC<Props> = ({
  onSelect,
  selectedDirectoryName,
  tree,
}) => subtree(tree, selectedDirectoryName, onSelect);

export default DirectoryTree;
