import './Rooms.css';
import { useMemo } from 'react';
import { Flag, Icon, List, Popup } from 'semantic-ui-react';

enum UserStatus {
  Offline = 'Offline',
  Online = 'Online',
}

type UserModel = {
  readonly countryCode: string | undefined;
  readonly self: boolean;
  readonly status: UserStatus;
  readonly username: string;
};

const getDetails = (user: UserModel) => {
  return user.countryCode ?? '?';
};

type Props = {
  readonly users: UserModel[];
};

const RoomUserList: React.FC<Props> = ({ users }) => {
  const getFlag = (user: UserModel) => {
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
      .reduce(
        (accumulator, user) => {
          (user.status === 'Online'
            ? accumulator.online
            : accumulator.offline
          ).push(user);
          return accumulator;
        },
        { offline: [] as UserModel[], online: [] as UserModel[] },
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
