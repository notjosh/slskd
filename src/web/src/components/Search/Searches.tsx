import './Search.css';
import {
  type ApiSlskdSearchSearch,
  type ApiSlskdServerState,
} from '../../lib/generated/types';
import { createSearchHubConnection } from '../../lib/hubFactory';
import * as library from '../../lib/searches';
import ErrorSegment from '../Shared/ErrorSegment';
import LoaderSegment from '../Shared/LoaderSegment';
import PlaceholderSegment from '../Shared/PlaceholderSegment';
import SearchDetail from './Detail/SearchDetail';
import SearchList from './List/SearchList';
import { isAxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Icon, Input, Segment } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';

type SearchMap = Record<string, ApiSlskdSearchSearch>;

type Props = {
  readonly server: ApiSlskdServerState;
};

const Searches: React.FC<Props> = ({ server }) => {
  const [connecting, setConnecting] = useState(true);
  const [error, setError] = useState<string>();
  const [searches, setSearches] = useState<SearchMap>({});

  const [removing, setRemoving] = useState(false);
  const [stopping, setStopping] = useState(false);
  const [creating, setCreating] = useState(false);

  const inputRef = useRef<Input>();

  const { id: searchId } = useParams<{ id: string }>();
  const history = useHistory();
  const match = useRouteMatch();

  const onConnecting = () => {
    setConnecting(true);
  };

  const onConnected = () => {
    setConnecting(false);
    setError(undefined);
  };

  const onConnectionError = (connectionError: string) => {
    setConnecting(false);
    setError(connectionError);
  };

  const onUpdate = (update: Parameters<typeof setSearches>[0]) => {
    setSearches(update);
    onConnected();
  };

  useEffect(() => {
    onConnecting();

    const searchHub = createSearchHubConnection();

    searchHub.on('list', (searchesEvent) => {
      onUpdate(
        searchesEvent.reduce<SearchMap>((accumulator, search) => {
          accumulator[search.id] = search;
          return accumulator;
        }, {}),
      );
      onConnected();
    });

    searchHub.on('update', (search) => {
      onUpdate((old) => ({ ...old, [search.id]: search }));
    });

    searchHub.on('delete', (search) => {
      onUpdate((old) => {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete old[search.id];
        return { ...old };
      });
    });

    searchHub.on('create', () => {});

    searchHub.onreconnecting((connectionError) =>
      onConnectionError(connectionError?.message ?? 'Disconnected'),
    );
    searchHub.onreconnected(() => onConnected());
    searchHub.onclose((connectionError) =>
      onConnectionError(connectionError?.message ?? 'Disconnected'),
    );

    const connect = async () => {
      try {
        onConnecting();
        await searchHub.start();
      } catch (connectionError) {
        if (!(connectionError instanceof Error)) {
          throw connectionError;
        }

        toast.error(connectionError?.message ?? 'Failed to connect');
        onConnectionError(connectionError?.message ?? 'Failed to connect');
      }
    };

    void connect();

    return () => {
      void searchHub.stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // create a new search, and optionally navigate to it to display the details
  // we do this if the user clicks the search icon, or repeats an existing search
  const create = async ({
    navigate = false,
    search,
  }: { navigate?: boolean; search?: string } = {}) => {
    const ref = inputRef.current?.inputRef?.current;
    const searchText = search ?? ref.value;
    const id = uuidv4();

    try {
      setCreating(true);
      await library.create({ id, searchText });

      try {
        ref.value = '';
        ref.focus();
      } catch {
        // we are probably repeating an existing search; the input isn't mounted.  no-op.
      }

      setCreating(false);

      if (navigate) {
        history.push(`${match.url.replace(`/${searchId}`, '')}/${id}`);
      }
    } catch (createError) {
      if (!(createError instanceof Error)) {
        throw createError;
      }

      console.error(createError);
      toast.error(
        (isAxiosError(createError) ? createError?.response?.data : undefined) ??
          createError?.message ??
          createError,
      );
      setCreating(false);
    }
  };

  // delete a search
  const remove = async (search: { id: string }) => {
    try {
      setRemoving(true);

      await library.remove({ id: search.id });
      setSearches((old) => {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete old[search.id];
        return { ...old };
      });

      setRemoving(false);
    } catch (removingError) {
      if (!(removingError instanceof Error)) {
        throw removingError;
      }

      console.error(removingError);
      toast.error(
        (isAxiosError(removingError)
          ? removingError?.response?.data
          : undefined) ??
          removingError?.message ??
          removingError,
      );
      setRemoving(false);
    }
  };

  // stop an in-progress search
  const stop = async (search: { id: string }) => {
    try {
      setStopping(true);
      await library.stop({ id: search.id });
      setStopping(false);
    } catch (stoppingError) {
      if (!(stoppingError instanceof Error)) {
        throw stoppingError;
      }

      console.error(stoppingError);
      toast.error(
        (isAxiosError(stoppingError)
          ? stoppingError?.response?.data
          : undefined) ??
          stoppingError?.message ??
          stoppingError,
      );
      setStopping(false);
    }
  };

  if (connecting) {
    return <LoaderSegment />;
  }

  if (error) {
    return <ErrorSegment caption={error} />;
  }

  // if searchId is not null, there's an id in the route.
  // display the details for the search, if there is one
  if (searchId) {
    const search = searches[searchId];
    if (search != null) {
      return (
        <SearchDetail
          creating={creating}
          disabled={!server?.isConnected}
          onCreate={create}
          onRemove={remove}
          onStop={stop}
          removing={removing}
          search={search}
          stopping={stopping}
        />
      );
    }

    // if the searchId doesn't match a search we know about, chop
    // the id off of the url and force navigation back to the list
    history.replace(match.url.replace(`/${searchId}`, ''));
  }

  inputRef?.current?.inputRef?.current.focus();

  return (
    <>
      <Segment
        className="search-segment"
        raised
      >
        <div className="search-segment-icon">
          <Icon
            name="search"
            size="big"
          />
        </div>
        <Input
          action={
            <>
              <Button
                disabled={creating || !server.isConnected}
                icon="plus"
                onClick={async () => await create()}
              />
              <Button
                disabled={creating || !server.isConnected}
                icon="search"
                onClick={async () => await create({ navigate: true })}
              />
            </>
          }
          className="search-input"
          disabled={creating || !server.isConnected}
          input={
            <input
              data-lpignore="true"
              placeholder={
                server.isConnected
                  ? 'Search phrase'
                  : 'Connect to server to perform a search'
              }
              type="search"
            />
          }
          loading={creating}
          onKeyUp={async (keyUpEvent: KeyboardEvent) =>
            keyUpEvent.key === 'Enter' ? await create() : ''
          }
          placeholder="Search phrase"
          ref={inputRef}
          size="big"
        />
      </Segment>
      {Object.keys(searches).length === 0 ? (
        <PlaceholderSegment
          caption="No searches to display"
          icon="search"
        />
      ) : (
        <SearchList
          connecting={connecting}
          error={error}
          onRemove={remove}
          onStop={stop}
          searches={searches ?? []}
        />
      )}
    </>
  );
};

export default Searches;
