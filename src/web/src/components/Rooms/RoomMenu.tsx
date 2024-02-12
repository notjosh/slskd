import './Rooms.css';
import RoomJoinModal from './RoomJoinModal';
import { Button, Icon, Menu } from 'semantic-ui-react';

type Props = {
  readonly active: string;
  readonly joined: string[];
  readonly onRoomChange: (room: string) => void;
} & React.ComponentProps<typeof RoomJoinModal>;

const RoomMenu: React.FC<Props> = ({
  active,
  joined,
  onRoomChange,
  ...rest
}) => {
  const names = [...joined];
  const isActive = (name: string) => active === name;

  return (
    <Menu
      className="room-menu"
      size="large"
    >
      {names.map((name) => (
        <Menu.Item
          active={isActive(name)}
          className={`menu-item ${isActive(name) ? 'menu-active' : ''}`}
          key={name}
          name={name}
          onClick={() => onRoomChange(name)}
        >
          <Icon
            color="green"
            name="circle"
            size="tiny"
          />
          {name}
        </Menu.Item>
      ))}
      <Menu.Menu position="right">
        <RoomJoinModal
          centered
          size="small"
          trigger={
            <Button
              className="add-button"
              icon
            >
              <Icon name="plus" />
            </Button>
          }
          {...rest}
        />
      </Menu.Menu>
    </Menu>
  );
};

export default RoomMenu;
