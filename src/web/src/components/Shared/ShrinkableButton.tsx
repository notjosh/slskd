import { type PropsWithChildren } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Button,
  type ButtonProps,
  Icon,
  Popup,
  type SemanticICONS,
} from 'semantic-ui-react';

export type Props = {
  icon: SemanticICONS;
  readonly mediaQuery: string;
} & Omit<ButtonProps, 'icon'>;

const ShrinkableButton: React.FC<PropsWithChildren<Props>> = ({
  children,
  icon,
  loading,
  mediaQuery,
  ...rest
}) => {
  const shouldShrink = useMediaQuery({ query: mediaQuery });

  if (!shouldShrink) {
    return (
      <Button {...rest}>
        <Icon
          loading={loading}
          name={icon}
        />
        {children}
      </Button>
    );
  }

  return (
    <Popup
      content={children}
      trigger={
        <Button
          icon
          {...rest}
        >
          <Icon
            loading={loading}
            name={icon}
          />
        </Button>
      }
    />
  );
};

export default ShrinkableButton;
