import './Rooms.css';
import * as rooms from '../../lib/rooms';
import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Dimmer,
  Header,
  Icon,
  Input,
  Loader,
  Modal,
  Table,
} from 'semantic-ui-react';

export type RoomModel = {
  readonly isModerated: boolean;
  readonly isOwned: boolean;
  readonly isPrivate: boolean;
  readonly name: string;
  readonly userCount: number;
};

type Props = {
  readonly joinRoom: (room: string) => Promise<void>;
} & React.ComponentProps<typeof Modal>;

const RoomJoinModal: React.FC<Props> = ({
  joinRoom: parentJoinRoom,
  ...modalOptions
}) => {
  const [open, setOpen] = useState(false);
  const [available, setAvailable] = useState<RoomModel[]>([]);
  const [selected, setSelected] = useState<string>();
  const [sortBy, setSortBy] =
    useState<keyof Pick<RoomModel, 'name' | 'userCount'>>('name');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAvailableRooms = async () => {
      setLoading(true);
      const availableResult = await rooms.getAvailable();
      setAvailable(availableResult ?? []);
      setLoading(false);
    };

    if (open) {
      getAvailableRooms();
    }
  }, [open]);

  const sortedAvailable = useMemo(() => {
    const sorted = [...available].filter((room) => room.name.includes(filter));

    sorted.sort((a, b) => {
      const av = a[sortBy];
      const bv = b[sortBy];

      if (sortOrder === 'asc') {
        if (typeof av === 'string' && typeof bv === 'string') {
          return bv.localeCompare(av);
        }

        if (typeof av === 'number' && typeof bv === 'number') {
          return av - bv;
        }

        return 0;
      }

      if (typeof av === 'string' && typeof bv === 'string') {
        return av.localeCompare(bv);
      }

      if (typeof av === 'number' && typeof bv === 'number') {
        return bv - av;
      }

      return 0;
    });

    return sorted;
  }, [available, filter, sortBy, sortOrder]);

  const close = () => {
    setAvailable([]);
    setSelected(undefined);
    setSortBy('name');
    setSortOrder('desc');
    setFilter('');
    setOpen(false);
  };

  const joinRoom = async () => {
    if (selected == null) {
      return;
    }

    await parentJoinRoom(selected);
    close();
  };

  const isSelected = (room: RoomModel) => selected === room.name;

  return (
    <Modal
      className="join-room-modal"
      onClose={() => close()}
      onOpen={() => setOpen(true)}
      open={open}
      {...modalOptions}
    >
      <Header>
        <Icon name="comments" />
        <Modal.Content>Join Room</Modal.Content>
      </Header>
      <Modal.Content scrolling>
        {loading ? (
          <Dimmer
            active
            inverted
          >
            <Loader
              content="Loading Room List"
              inverted
            />
          </Dimmer>
        ) : (
          <>
            <Input
              fluid
              icon="filter"
              onChange={(_, event) => setFilter(event.value)}
              placeholder="Room Filter"
            />
            <Table
              celled
              selectable
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell onClick={() => setSortBy('name')}>
                    Name
                    <Icon
                      link={sortBy === 'name'}
                      name={
                        sortBy === 'name' &&
                        (sortOrder === 'asc' ? 'chevron up' : 'chevron down')
                      }
                      onClick={() =>
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                      }
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell onClick={() => setSortBy('userCount')}>
                    Users
                    <Icon
                      link={sortBy === 'userCount'}
                      name={
                        sortBy === 'userCount' &&
                        (sortOrder === 'asc' ? 'chevron up' : 'chevron down')
                      }
                      onClick={() =>
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                      }
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {sortedAvailable.map((room) => (
                  <Table.Row
                    key={room.name}
                    onClick={() => setSelected(room.name)}
                    style={isSelected(room) ? { fontWeight: 'bold' } : {}}
                  >
                    <Table.Cell>
                      {isSelected(room) && (
                        <Icon
                          color="green"
                          name="check"
                        />
                      )}
                      {room.isPrivate && <Icon name="lock" />}
                      {room.isOwned && <Icon name="chess queen" />}
                      {room.isModerated && <Icon name="gavel" />}
                      {room.name}
                    </Table.Cell>
                    <Table.Cell>{room.userCount}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          disabled={!selected}
          onClick={async () => await joinRoom()}
          positive
        >
          Join
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default RoomJoinModal;
