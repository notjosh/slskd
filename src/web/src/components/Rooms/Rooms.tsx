import { activeRoomKey } from '../../config';
import { type ApiSlskdMessagingAPIRoomResponse } from '../../lib/generated/types';
import * as rooms from '../../lib/rooms';
import PlaceholderSegment from '../Shared/PlaceholderSegment';
import RoomMenu from './RoomMenu';
import RoomUserList from './RoomUserList';
import { Component, createRef } from 'react';
import {
  Card,
  Dimmer,
  Icon,
  Input,
  List,
  Loader,
  Ref,
  Segment,
} from 'semantic-ui-react';

const initialState = {
  active: '',
  intervals: {
    messages: undefined,
    rooms: undefined,
  },
  joined: [],
  loading: false,
  room: {
    messages: [],
    users: [],
  },
};

type Props = {};

type State = {
  active: string;
  intervals: {
    messages: number | undefined;
    rooms: number | undefined;
  };
  joined: string[];
  loading: boolean;
  room: Pick<ApiSlskdMessagingAPIRoomResponse, 'messages' | 'users'>;
};

class Rooms extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = initialState;
  }

  public override componentDidMount() {
    this.setState(
      {
        active: sessionStorage.getItem(activeRoomKey) ?? '',
        intervals: {
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          messages: window.setInterval(this.fetchActiveRoom, 1_000),
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          rooms: window.setInterval(this.fetchJoinedRooms, 500),
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async () => {
        await this.fetchJoinedRooms();
        await this.selectRoom(this.state.active || this.getFirstRoom());
      },
    );
  }

  public override componentWillUnmount() {
    const { messages: messagesInterval, rooms: roomsInterval } =
      this.state.intervals;

    clearInterval(roomsInterval);
    clearInterval(messagesInterval);

    this.setState({ intervals: initialState.intervals });
  }

  protected listRef = createRef();

  protected messageRef = undefined;

  protected getFirstRoom = () => {
    const joined = this.state.joined[0];
    return joined ?? '';
  };

  protected fetchJoinedRooms = async () => {
    const joined = await rooms.getJoined();
    this.setState(
      {
        joined,
      },
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async () => {
        if (!this.state.joined.includes(this.state.active)) {
          await this.selectRoom(this.getFirstRoom());
        }
      },
    );
  };

  protected fetchActiveRoom = async () => {
    const { active } = this.state;

    if (active.length === 0) return;

    const messages = await rooms.getMessages({ roomName: active });
    const users = await rooms.getUsers({ roomName: active });

    this.setState({
      room: {
        messages,
        users,
      },
    });
  };

  protected selectRoom = async (roomName: string) => {
    this.setState(
      {
        active: roomName,
        loading: true,
        room: initialState.room,
      },
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async () => {
        const { active } = this.state;

        sessionStorage.setItem(activeRoomKey, active);

        await this.fetchActiveRoom();
        this.setState({ loading: false }, () => {
          try {
            this.listRef.current?.lastChild.scrollIntoView();
          } catch {
            // no-op
          }
        });
      },
    );
  };

  protected joinRoom = async (roomName: string) => {
    await rooms.join({ roomName });
    await this.fetchJoinedRooms();
    await this.selectRoom(roomName);
  };

  protected leaveRoom = async (roomName: string) => {
    await rooms.leave({ roomName });
    await this.fetchJoinedRooms();
    await this.selectRoom(this.getFirstRoom());
  };

  protected validInput = () =>
    (this.state.active || '').length > 0 &&
    (this.messageRef?.current?.value || '').length > 0;

  protected focusInput = () => {
    this.messageRef.current.focus();
  };

  protected formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const dtfUS = new Intl.DateTimeFormat('en', {
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      month: 'numeric',
    });

    return dtfUS.format(date);
  };

  protected sendMessage = async () => {
    const { active } = this.state;
    const message = this.messageRef?.current.value;

    if (!this.validInput()) {
      return;
    }

    await rooms.sendMessage({ message, roomName: active });
    this.messageRef.current.value = '';
  };

  public override render() {
    const { active, joined, loading, room } = this.state;

    return (
      <div className="rooms">
        <Segment
          className="rooms-segment"
          raised
        >
          <div className="rooms-segment-icon">
            <Icon
              name="comments"
              size="big"
            />
          </div>
          <RoomMenu
            active={active}
            joinRoom={this.joinRoom}
            joined={joined}
            onRoomChange={async (name) => await this.selectRoom(name)}
          />
        </Segment>
        {active == null ? (
          <PlaceholderSegment
            caption="No rooms to display"
            icon="comments"
          />
        ) : (
          <Card
            className="room-active-card"
            raised
          >
            <Card.Content onClick={() => this.focusInput()}>
              <Card.Header>
                <Icon
                  color="green"
                  name="circle"
                />
                {active}
                <Icon
                  className="close-button"
                  color="red"
                  link
                  name="close"
                  onClick={async () => await this.leaveRoom(active)}
                />
              </Card.Header>
              <div className="room">
                {loading ? (
                  <Dimmer
                    active
                    inverted
                  >
                    <Loader inverted />
                  </Dimmer>
                ) : (
                  <>
                    <Segment.Group>
                      <Segment className="room-history">
                        <Ref innerRef={this.listRef}>
                          <List>
                            {room.messages.map((message) => (
                              <List.Content
                                className={`room-message ${message.self ? 'room-message-self' : ''}`}
                                key={`${message.timestamp}+${message.message}`}
                              >
                                <span className="room-message-time">
                                  {this.formatTimestamp(message.timestamp)}
                                </span>
                                <span className="room-message-name">
                                  {message.username}:{' '}
                                </span>
                                <span className="room-message-message">
                                  {message.message}
                                </span>
                              </List.Content>
                            ))}
                            <List.Content id="room-history-scroll-anchor" />
                          </List>
                        </Ref>
                      </Segment>
                      <Segment className="room-input">
                        <Input
                          action={{
                            className: 'room-message-button',
                            disabled: !this.validInput(),
                            icon: (
                              <Icon
                                color="green"
                                name="send"
                              />
                            ),
                            onClick: this.sendMessage,
                          }}
                          fluid
                          input={
                            <input
                              autoComplete="off"
                              data-lpignore="true"
                              id="room-message-input"
                              type="text"
                            />
                          }
                          onKeyUp={async (event: KeyboardEvent) =>
                            event.key === 'Enter'
                              ? await this.sendMessage()
                              : ''
                          }
                          ref={(input) => (this.messageRef = input?.inputRef)}
                          transparent
                        />
                      </Segment>
                    </Segment.Group>
                    <Segment className="room-users">
                      <RoomUserList users={room.users} />
                    </Segment>
                  </>
                )}
              </div>
            </Card.Content>
          </Card>
        )}
      </div>
    );
  }
}

export default Rooms;
