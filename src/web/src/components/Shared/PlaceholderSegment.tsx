import { Header, Icon, Segment, type SemanticICONS } from 'semantic-ui-react';

type Props = {
  readonly caption: string;
  readonly icon: SemanticICONS;
  readonly size?: 'small';
};

const PlaceholderSegment: React.FC<Props> = ({
  caption,
  icon,
  size,
  ...rest
}) => {
  const className =
    size === 'small' ? 'placeholder-segment-small' : 'placeholder-segment';

  return (
    <Segment
      basic
      className={className}
      placeholder
      {...rest}
    >
      <Header icon>
        <Icon name={icon} />
        {caption}
      </Header>
    </Segment>
  );
};

export default PlaceholderSegment;
