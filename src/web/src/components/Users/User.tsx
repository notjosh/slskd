import { Icon, Item } from 'semantic-ui-react';

enum PresenceState {
  Away = 'Away',
  Online = 'Online',
}

const ImagePlaceholder = () => (
  <div className="users-picture-placeholder ui small image">
    <Icon
      name="camera"
      size="big"
    />
  </div>
);

const Presence = ({ presence }: { readonly presence: PresenceState }) => {
  const colors = {
    Away: 'yellow',
    Online: 'green',
  } as const;

  return (
    <Icon
      color={colors[presence] ?? 'grey'}
      name="circle"
    />
  );
};

const FreeUploadSlot = ({
  hasFreeUploadSlot,
}: {
  readonly hasFreeUploadSlot: boolean;
}) => (
  <Icon
    color={hasFreeUploadSlot ? 'green' : 'red'}
    name={hasFreeUploadSlot ? 'check' : 'close'}
  />
);

type Props = {
  readonly address: string;
  readonly description: string;
  readonly hasPicture: boolean;
  readonly picture: string;
  readonly port: number;
  readonly presence: PresenceState;
  readonly queueLength: number;
  readonly uploadSlots: number;
  readonly username: string;
};

const User: React.FC<Props> = ({
  address,
  description,
  hasPicture,
  picture,
  port,
  presence,
  queueLength,
  uploadSlots,
  username,
}) => (
  <Item>
    {hasPicture ? (
      <Item.Image
        size="small"
        src={`data:image;base64,${picture}`}
      />
    ) : (
      <ImagePlaceholder />
    )}

    <Item.Content>
      <Item.Header as="a">
        <Presence presence={presence} />
        {username}
      </Item.Header>
      <Item.Meta>
        Free Upload Slot: <FreeUploadSlot hasFreeUploadSlot />, Total Upload
        Slots: {uploadSlots}, Queue Length: {queueLength}, IP Address: {address}
        , Port: {port}
      </Item.Meta>
      <Item.Description>{description || 'No user info.'}</Item.Description>
    </Item.Content>
  </Item>
);

export default User;
