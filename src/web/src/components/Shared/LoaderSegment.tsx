import { type PropsWithChildren } from 'react';
import { Loader, Segment, type StrictLoaderProps } from 'semantic-ui-react';

type Props = StrictLoaderProps;

const LoaderSegment: React.FC<PropsWithChildren<Props>> = ({
  children,
  size = 'big',
  ...props
}) => (
  <Segment
    basic
    className="loader-segment"
    placeholder
  >
    <Loader
      active
      size={size}
      {...props}
    >
      {children}
    </Loader>
  </Segment>
);

export default LoaderSegment;
