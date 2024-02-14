import { deleteDirectory, deleteFile, list } from '../../../lib/files';
import { formatBytes, formatDate } from '../../../lib/util';
import { LoaderSegment } from '../../Shared';
import { useEffect, useState } from 'react';
import { Header, Icon, Modal, Table } from 'semantic-ui-react';

type FileRowProps = {
  fetch: () => Promise<void>;
  fullName: string;
  length: number;
  modifiedAt: string;
  name: string;
  remoteFileManagement: boolean;
  root: 'downloads' | 'incomplete';
  subdirectory: string[];
};

const FileRow: React.FC<FileRowProps> = ({
  fetch,
  fullName,
  length,
  modifiedAt,
  name,
  remoteFileManagement,
  root,
  subdirectory,
}) => (
  <Table.Row key={fullName}>
    <Table.Cell>
      <Icon name="file outline" />
      {name}
    </Table.Cell>
    <Table.Cell>{modifiedAt ? formatDate(modifiedAt) : ''}</Table.Cell>
    <Table.Cell>{length ? formatBytes(length) : ''}</Table.Cell>
    <Table.Cell>
      {remoteFileManagement ? (
        <Modal
          actions={[
            'Cancel',
            {
              content: 'Delete',
              key: 'done',
              negative: true,
              onClick: async () => {
                await deleteFile({
                  path: `${subdirectory.join('/')}/${fullName}`,
                  root,
                });
                await fetch();
              },
            },
          ]}
          centered
          content={`Are you sure you want to delete file '${fullName}'?`}
          header={
            <Header
              content="Confirm File Delete"
              icon="trash alternate"
            />
          }
          size="small"
          trigger={
            <Icon
              color="red"
              name="trash alternate"
              style={{ cursor: 'pointer' }}
            />
          }
        />
      ) : null}
    </Table.Cell>
  </Table.Row>
);

type DirectoryRowProps = {
  deletable?: boolean;
  fetch: () => Promise<void>;
  fullName: string;
  modifiedAt?: string;
  name: string;
  onClick: () => void;
  remoteFileManagement: boolean;
  root: 'downloads' | 'incomplete';
  subdirectory: string[];
};

const DirectoryRow: React.FC<DirectoryRowProps> = ({
  deletable = true,
  fetch,
  fullName,
  modifiedAt,
  name,
  onClick = () => {},
  remoteFileManagement,
  root,
  subdirectory,
}) => (
  <Table.Row key={name}>
    <Table.Cell
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <Icon name="folder" />
      {name}
    </Table.Cell>
    <Table.Cell>{modifiedAt ? formatDate(modifiedAt) : ''}</Table.Cell>
    <Table.Cell />
    <Table.Cell>
      {remoteFileManagement && deletable ? (
        <Modal
          actions={[
            'Cancel',
            {
              content: 'Delete',
              key: 'done',
              negative: true,
              onClick: async () => {
                await deleteDirectory({
                  path: `${subdirectory.join('/')}/${fullName}`,
                  root,
                });
                await fetch();
              },
            },
          ]}
          centered
          content={`Are you sure you want to delete directory '${fullName}'?`}
          header={
            <Header
              content="Confirm Directory Delete"
              icon="trash alternate"
            />
          }
          size="small"
          trigger={
            <Icon
              color="red"
              name="trash alternate"
              style={{ cursor: 'pointer' }}
            />
          }
        />
      ) : (
        ''
      )}
    </Table.Cell>
  </Table.Row>
);

type ExplorerProps = {
  remoteFileManagement: boolean;
  root: 'downloads' | 'incomplete';
};

const Explorer: React.FC<ExplorerProps> = ({ remoteFileManagement, root }) => {
  const [directory, setDirectory] = useState<{
    directories: Awaited<ReturnType<typeof list>>['directories'];
    files: Awaited<ReturnType<typeof list>>['files'];
  }>({ directories: [], files: [] });
  const [subdirectory, setSubdirectory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    const directoryResult = await list({
      root,
      subdirectory: subdirectory.join('/'),
    });
    setDirectory(directoryResult);
    setLoading(false);
  };

  useEffect(() => {
    void fetch();
  }, [subdirectory]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSubdirectory([]);
  }, [root]);

  const select = ({ path }: { path: string }) => {
    setSubdirectory([...subdirectory, path]);
  };

  const upOneSubdirectory = () => {
    const copy = [...subdirectory];
    copy.pop();
    setSubdirectory(copy);
  };

  if (loading) {
    return <LoaderSegment />;
  }

  const total =
    (directory?.directories?.length ?? 0) + (directory?.files?.length ?? 0);

  return (
    <>
      <Header
        className="explorer-working-directory"
        size="small"
      >
        <Icon name="folder open" />
        {'/' + root + '/' + subdirectory.join('/')}
      </Header>
      <Table
        className="unstackable"
        size="large"
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="explorer-list-name">
              Name
            </Table.HeaderCell>
            <Table.HeaderCell className="explorer-list-date">
              Date Modified
            </Table.HeaderCell>
            <Table.HeaderCell className="explorer-list-size">
              Size
            </Table.HeaderCell>
            <Table.HeaderCell className="explorer-list-action" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {total === 0 ? (
            <Table.Row>
              <Table.Cell
                colSpan={99}
                style={{
                  opacity: 0.5,
                  padding: '10px !important',
                  textAlign: 'center',
                }}
              >
                No files or directories
              </Table.Cell>
            </Table.Row>
          ) : (
            <>
              {subdirectory.length > 0 && (
                <DirectoryRow
                  deletable={false}
                  fetch={fetch}
                  fullName=".."
                  name=".."
                  onClick={upOneSubdirectory}
                  remoteFileManagement={remoteFileManagement}
                  root={root}
                  subdirectory={subdirectory}
                />
              )}
              {directory?.directories?.map((d) => (
                <DirectoryRow
                  fetch={fetch}
                  key={d.name}
                  onClick={() => select({ path: d.name })}
                  remoteFileManagement={remoteFileManagement}
                  root={root}
                  subdirectory={subdirectory}
                  {...d}
                />
              ))}
              {directory?.files?.map((f) => (
                <FileRow
                  fetch={fetch}
                  key={f.name}
                  remoteFileManagement={remoteFileManagement}
                  root={root}
                  subdirectory={subdirectory}
                  {...f}
                />
              ))}
            </>
          )}
        </Table.Body>
      </Table>
    </>
  );
};

export default Explorer;
