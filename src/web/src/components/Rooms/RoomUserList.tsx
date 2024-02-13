import './Rooms.css';
import { type ApiSlskdMessagingAPIUserDataResponse } from '../../lib/generated/types';
import { useMemo } from 'react';
import { Flag, Icon, List, Popup } from 'semantic-ui-react';

const getDetails = (user: ApiSlskdMessagingAPIUserDataResponse) => {
  return user.countryCode ?? '?';
};

type Props = {
  readonly users: ApiSlskdMessagingAPIUserDataResponse[];
};

const RoomUserList: React.FC<Props> = ({ users }) => {
  const getFlag = (user: ApiSlskdMessagingAPIUserDataResponse) => {
    if (user.countryCode == null)
      return (
        <Icon
          className="unknown-user-flag"
          name="question"
        />
      );

    return <Flag name={user.countryCode.toLowerCase()} />;
  };

  const sortedUsers = useMemo(() => {
    const filtered = [...users]
      .sort((a, b) => a.username.localeCompare(b.username))
      .reduce<{
        offline: ApiSlskdMessagingAPIUserDataResponse[];
        online: ApiSlskdMessagingAPIUserDataResponse[];
      }>(
        (accumulator, user) => {
          (user.status === 'Online'
            ? accumulator.online
            : accumulator.offline
          ).push(user);
          return accumulator;
        },
        {
          offline: [],
          online: [],
        },
      );

    return [...filtered.online, ...filtered.offline];
  }, [users]);

  return (
    <List>
      {sortedUsers.map((user) => (
        <List.Item
          className={user.self ? 'room-user-self' : ''}
          key={user.username}
        >
          <List.Content style={{ opacity: user.status === 'Online' ? 1 : 0.5 }}>
            <Popup
              content={getDetails(user)}
              trigger={getFlag(user)}
            />
            {user.username}
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default RoomUserList;
