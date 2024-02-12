import './Chat.css';
import { activeChatKey } from '../../config';
import * as chat from '../../lib/chat';
import PlaceholderSegment from '../Shared/PlaceholderSegment';
import ChatMenu from './ChatMenu';
import React, { Component, createRef } from 'react';
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
  conversations: {},
  interval: undefined,
  loading: false,
};

type Props = {
  readonly state: {
    user: {
      username: string;
    };
  };
};

type State = {
  active: string;
  conversations: Record<
    string,
    {
      hasUnAcknowledgedMessages: boolean;
      messages: Array<{
        direction: 'In' | 'Out';
        message: string;
        timestamp: number;
        username: string;
      }>;
    }
  >;
  interval: number | undefined;
  loading: boolean;
};

class Chat extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = initialState;
  }

  public override componentDidMount() {
    this.setState(
      {
        active: sessionStorage.getItem(activeChatKey) ?? '',
        interval: window.setInterval(this.fetchConversations, 5_000),
      },
      async () => {
        await this.fetchConversations();
        this.selectConversation(
          this.state.active || this.getFirstConversation(),
        );
      },
    );
  }

  public override componentWillUnmount() {
    clearInterval(this.state.interval);
    this.setState({ interval: undefined });
  }

  protected listRef = createRef<typeof List>();

  protected messageRef = undefined;

  protected getFirstConversation = () => {
    const names = Object.keys(this.state.conversations);
    return names[0] ?? '';
  };

  protected fetchConversations = async () => {
    // fetch all of the active conversations (but no messages)
    let conversations = await chat.getAll();

    // turn into a map, keyed by username
    // if there are no active conversations, set to an empty map
    if (conversations.length === 0) {
      conversations = {};
    } else {
      conversations = conversations.reduce((map, current) => {
        map[current.username] = current;
        return map;
      }, {});
    }

    const { active } = this.state;
    const activeConversation = conversations[active];

    // check to see if the active chat is still active
    // this will happen whenever a chat is closed/removed
    if (activeConversation) {
      console.log('active?', activeConversation);
      // *before* fetching messages, ack any unacked messages
      // for the active chat
      if (activeConversation.hasUnAcknowledgedMessages === true) {
        await this.acknowledgeMessages(active);
      }

      conversations = {
        ...conversations,
        [active]: await chat.get({ username: active }),
      };
    }

    this.setState({ conversations }, () => {
      // if a chat isn't active or the active chat is closed,
      // select the first conversation, if there is one
      if (!this.state.conversations[this.state.active]) {
        this.selectConversation(this.getFirstConversation());
      }
    });
  };

  protected acknowledgeMessages = async (username: string) => {
    if (!username || username === '') return;
    await chat.acknowledge({ username });
  };

  protected sendMessage = async (username: string, message: string) => {
    if (!username || !message || username === '') return;
    await chat.send({ message, username });
  };

  protected sendReply = async () => {
    const { active } = this.state;
    const message = this.messageRef.current.value;

    if (!this.validInput()) {
      return;
    }

    await this.sendMessage(active, message);
    this.messageRef.current.value = '';

    // force a refresh to append the message
    // we could probably do this in the browser but we can be lazy
    this.fetchConversations();
  };

  protected validInput = () =>
    (this.state.active || '').length > 0 &&
    (this.messageRef?.current?.value || '').length > 0;

  protected focusInput = () => {
    this.messageRef?.current.focus();
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

  protected selectConversation = (username: string) => {
    this.setState(
      {
        active: username,
        loading: true,
      },
      async () => {
        const { active, conversations } = this.state;

        sessionStorage.setItem(activeChatKey, active);

        this.setState(
          {
            conversations:
              active === ''
                ? conversations
                : {
                    ...conversations,
                    [active]: await chat.get({ username: active }),
                  },
            loading: false,
          },
          () => {
            try {
              this.listRef.current.lastChild.scrollIntoView();
            } catch {
              // no-op
            }
          },
        );
      },
    );
  };

  protected initiateConversation = async (
    username: string,
    message: string,
  ) => {
    await this.sendMessage(username, message);
    await this.fetchConversations();
    this.selectConversation(username);
  };

  protected deleteConversation = async (username: string) => {
    await chat.remove({ username });
    await this.fetchConversations();
    this.selectConversation(this.getFirstConversation());
  };

  public override render() {
    const { active, conversations, loading } = this.state;
    const messages = conversations[active]?.messages ?? [];
    const { user } = this.props.state;

    return (
      <div className="chats">
        <Segment
          className="chat-segment"
          raised
        >
          <div className="chat-segment-icon">
            <Icon
              name="comment"
              size="big"
            />
          </div>
          <ChatMenu
            active={active}
            conversations={conversations}
            initiateConversation={this.initiateConversation}
            onConversationChange={(name) => this.selectConversation(name)}
          />
        </Segment>
        {Boolean(active) === false ? (
          <PlaceholderSegment
            caption="No chats to display"
            icon="comment"
          />
        ) : (
          <Card
            className="chat-active-card"
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
                  onClick={async () => await this.deleteConversation(active)}
                />
              </Card.Header>
              <div className="chat">
                {loading ? (
                  <Dimmer
                    active
                    inverted
                  >
                    <Loader inverted />
                  </Dimmer>
                ) : (
                  <Segment.Group>
                    <Segment className="chat-history">
                      <Ref innerRef={this.listRef}>
                        <List>
                          {messages.map((message) => (
                            <List.Content
                              className={`chat-message ${message.direction === 'Out' ? 'chat-message-self' : ''}`}
                              key={`${message.timestamp}+${message.message}`}
                            >
                              <span className="chat-message-time">
                                {this.formatTimestamp(message.timestamp)}
                              </span>
                              <span className="chat-message-name">
                                {message.direction === 'Out'
                                  ? user.username
                                  : message.username}
                                :{' '}
                              </span>
                              <span className="chat-message-message">
                                {message.message}
                              </span>
                            </List.Content>
                          ))}
                          <List.Content id="chat-history-scroll-anchor" />
                        </List>
                      </Ref>
                    </Segment>
                    <Segment className="chat-input">
                      <Input
                        action={{
                          className: 'chat-message-button',
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
                            id="chat-message-input"
                            type="text"
                          />
                        }
                        onKeyUp={async (event) =>
                          event.key === 'Enter' ? await this.sendReply() : ''
                        }
                        ref={(input) => (this.messageRef = input?.inputRef)}
                        transparent
                      />
                    </Segment>
                  </Segment.Group>
                )}
              </div>
            </Card.Content>
          </Card>
        )}
      </div>
    );
  }
}

export default Chat;
