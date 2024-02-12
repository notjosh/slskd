import { type SearchState } from '../../../lib/searches';
import SearchStatusIcon from '../SearchStatusIcon';
import SearchActionIcon from './SearchActionIcon';
import { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Icon, Table } from 'semantic-ui-react';

export type SearchModel = {
  endedAt: string;
  fileCount: number;
  id: string;
  isComplete: boolean;
  lockedFileCount: number;
  responseCount: number;
  searchText: string;
  startedAt: string;
  state: SearchState;
};

type Props = {
  readonly onRemove: (search: SearchModel) => Promise<void>;
  readonly onStop: (search: SearchModel) => Promise<void>;
  readonly search: SearchModel;
};

const SearchListRow: React.FC<Props> = ({ onRemove, onStop, search }) => {
  const [working, setWorking] = useState(false);
  const match = useRouteMatch();

  const invoke = async (function_: () => Promise<void>) => {
    setWorking(true);

    try {
      await function_();
    } catch (error) {
      console.error(error);
    } finally {
      setWorking(false);
    }
  };

  return (
    <Table.Row
      disabled={working}
      style={{ cursor: working ? 'wait' : undefined }}
    >
      <Table.Cell>
        <SearchStatusIcon state={search.state} />
      </Table.Cell>
      <Table.Cell>
        <Link to={`${match.url}/${search.id}`}>{search.searchText}</Link>
      </Table.Cell>
      <Table.Cell>{search.fileCount}</Table.Cell>
      <Table.Cell>
        <Icon
          color="yellow"
          name="lock"
          size="small"
        />
        {search.lockedFileCount}
      </Table.Cell>
      <Table.Cell>{search.responseCount}</Table.Cell>
      <Table.Cell>
        {search.endedAt ? new Date(search.endedAt).toLocaleTimeString() : '-'}
      </Table.Cell>
      <Table.Cell>
        <SearchActionIcon
          loading={working}
          onRemove={async () =>
            await invoke(async () => await onRemove(search))
          }
          onStop={async () => await invoke(async () => await onStop(search))}
          search={search}
          style={{ cursor: 'pointer' }}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default SearchListRow;
