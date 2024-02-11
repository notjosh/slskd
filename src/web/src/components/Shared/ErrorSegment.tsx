import { Header, Icon, Segment, type SemanticICONS } from 'semantic-ui-react';

type Props = {
  readonly caption: string;
  readonly icon?: SemanticICONS;
  readonly suppressPrefix?: boolean;
};

const ErrorSegment: React.FC<Props> = ({
  caption,
  icon = 'x',
  suppressPrefix = false,
}) => (
  <Segment
    basic
    className="error-segment"
    placeholder
  >
    <Header icon>
      <Icon
        color="red"
        name={icon}
      />
      {!suppressPrefix && 'Error: '}
      {caption}
    </Header>
  </Segment>
);

export default ErrorSegment;
