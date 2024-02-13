import './Users.css';
import { activeUserInfoKey } from '../../config';
import * as users from '../../lib/users';
import PlaceholderSegment from '../Shared/PlaceholderSegment';
import User from './User';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Icon, Input, Item, Loader, Segment } from 'semantic-ui-react';

const Users: React.FC = () => {
  const inputRef = useRef<Input>(null);
  const [user, setUser] = useState<
    Awaited<ReturnType<typeof users.getInfo>>['data'] &
      Awaited<ReturnType<typeof users.getStatus>>['data'] &
      Awaited<ReturnType<typeof users.getEndpoint>>['data'] & {
        username: string;
      }
  >();
  const [usernameInput, setUsernameInput] = useState<string>();
  const [selectedUsername, setSelectedUsername] = useState<string>();
  // eslint-disable-next-line react/hook-use-state
  const [{ error, fetching }, setStatus] = useState<{
    error: Error | undefined;
    fetching: boolean;
  }>({
    error: undefined,
    fetching: false,
  });

  const setInputText = (text: string) => {
    inputRef.current?.inputRef.current.value = text;
  };

  const setInputFocus = () => {
    inputRef.current?.focus();
  };

  const clear = () => {
    localStorage.removeItem(activeUserInfoKey);
    setSelectedUsername(undefined);
    setUser(undefined);
    setInputText('');
    setInputFocus();
  };

  const keyUp = (event: KeyboardEvent) =>
    event.key === 'Escape' ? clear() : '';

  useLayoutEffect(() => {
    document.removeEventListener('keyup', keyUp, false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.addEventListener('keyup', keyUp, false);

    const storedUsername = localStorage.getItem(activeUserInfoKey);

    if (storedUsername != null) {
      setSelectedUsername(storedUsername);
      setInputText(storedUsername);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchUser = async () => {
      if (!selectedUsername) {
        return;
      }

      setStatus({ error: undefined, fetching: true });

      try {
        const [info, status, endpoint] = await Promise.all([
          users.getInfo({ username: selectedUsername }),
          users.getStatus({ username: selectedUsername }),
          users.getEndpoint({ username: selectedUsername }),
        ]);

        localStorage.setItem(activeUserInfoKey, selectedUsername);
        setUser({
          ...info.data,
          ...status.data,
          ...endpoint.data,
          username: selectedUsername,
        });
        setStatus({ error: undefined, fetching: false });
      } catch (fetchError) {
        if (!(fetchError instanceof Error)) {
          throw fetchError;
        }

        setStatus({ error: fetchError, fetching: false });
      }
    };

    void fetchUser();
  }, [selectedUsername]);

  return (
    <div className="users-container">
      <Segment
        className="users-segment"
        raised
      >
        <div className="users-segment-icon">
          <Icon
            name="users"
            size="big"
          />
        </div>
        <Input
          action={
            !fetching &&
            (user == null
              ? {
                  icon: 'search',
                  onClick: () => setSelectedUsername(usernameInput),
                }
              : { color: 'red', icon: 'x', onClick: clear })
          }
          className="users-input"
          disabled={fetching}
          input={
            <input
              data-lpignore="true"
              disabled={Boolean(user) || fetching}
              placeholder="Username"
              type="search"
            />
          }
          loading={fetching}
          onChange={(event) => setUsernameInput(event.target.value)}
          onKeyUp={(event: React.KeyboardEvent<Input>) =>
            event.key === 'Enter' ? setSelectedUsername(usernameInput) : ''
          }
          placeholder="Username"
          ref={inputRef}
          size="big"
        />
      </Segment>
      {fetching ? (
        <Loader
          active
          className="search-loader"
          inline="centered"
          size="big"
        />
      ) : (
        <div>
          {error ? (
            <span>Failed to retrieve information for {selectedUsername}</span>
          ) : user == null ? (
            <PlaceholderSegment
              caption="No user info to display"
              icon="users"
            />
          ) : (
            <Segment
              className="users-user"
              raised
            >
              <Item.Group>
                <User {...user} />
              </Item.Group>
            </Segment>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
