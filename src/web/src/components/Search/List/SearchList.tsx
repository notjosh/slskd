import ErrorSegment from '../../Shared/ErrorSegment';
import Switch from '../../Shared/Switch';
import SearchListRow, { type SearchModel } from './SearchListRow';
import { Card, Icon, Loader, Table } from 'semantic-ui-react';

type Props = {
  readonly connecting: boolean;
  readonly error: string | undefined;
  readonly onRemove: (search: SearchModel) => Promise<void>;
  readonly onStop: (search: SearchModel) => Promise<void>;
  readonly searches: Record<string, SearchModel>;
};

const SearchList: React.FC<Props> = ({
  connecting = false,
  error = undefined,
  onRemove,
  onStop,
  searches,
}) => {
  return (
    <Card
      className="search-list-card"
      raised
    >
      <Card.Content>
        <div className="search-list-wrapper">
          <Switch
            connecting={
              connecting && (
                <Loader
                  active
                  inline="centered"
                  size="small"
                />
              )
            }
            error={error != null && <ErrorSegment caption={error} />}
          >
            <Table
              className="unstackable"
              size="large"
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell className="search-list-action">
                    <Icon name="info circle" />
                  </Table.HeaderCell>
                  <Table.HeaderCell className="search-list-phrase">
                    Search
                  </Table.HeaderCell>
                  <Table.HeaderCell className="search-list-files">
                    Files
                  </Table.HeaderCell>
                  <Table.HeaderCell className="search-list-locked">
                    Locked
                  </Table.HeaderCell>
                  <Table.HeaderCell className="search-list-responses">
                    Responses
                  </Table.HeaderCell>
                  <Table.HeaderCell className="search-list-started">
                    Ended
                  </Table.HeaderCell>
                  <Table.HeaderCell className="search-list-action" />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {Object.values(searches)
                  .sort(
                    (a, b) =>
                      new Date(b.startedAt).getTime() -
                      new Date(a.startedAt).getTime(),
                  )
                  .map((search) => (
                    <SearchListRow
                      key={search.id}
                      onRemove={onRemove}
                      onStop={onStop}
                      search={search}
                    />
                  ))}
              </Table.Body>
            </Table>
          </Switch>
        </div>
      </Card.Content>
    </Card>
  );
};

export default SearchList;
