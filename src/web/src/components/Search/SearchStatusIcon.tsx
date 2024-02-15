import { FlaggedEnum } from '../../lib/flags';
import { ApiSoulseekSearchStates } from '../../lib/generated/types';
import { Icon, Popup } from 'semantic-ui-react';

// as of 4.5.2, states are:
// transient:
//   None, Requested, InProgress
// terminal:
//   good: Completed, [TimedOut | ResponseLimitReached | FileLimitReached]
//   bad: Completed, [Errored | Cancelled]

const getIcon = ({
  state,
  ...props
}: { state: ApiSoulseekSearchStates } & React.ComponentProps<typeof Icon>) => {
  const flags = new FlaggedEnum<ApiSoulseekSearchStates>(state);

  switch (true) {
    case flags.isExactly(ApiSoulseekSearchStates.None):
    case flags.isExactly(ApiSoulseekSearchStates.Requested):
      return (
        <Icon
          name="time"
          {...props}
        />
      );
    case flags.isExactly(ApiSoulseekSearchStates.InProgress):
      return (
        <Icon
          color="green"
          loading
          name="circle notch"
          {...props}
        />
      );
    case flags.isExactly([
      ApiSoulseekSearchStates.Completed,
      ApiSoulseekSearchStates.TimedOut,
    ]):
    case flags.isExactly([
      ApiSoulseekSearchStates.Completed,
      ApiSoulseekSearchStates.ResponseLimitReached,
    ]):
    case flags.isExactly([
      ApiSoulseekSearchStates.Completed,
      ApiSoulseekSearchStates.FileLimitReached,
    ]):
      return (
        <Icon
          color="green"
          name="check"
          {...props}
        />
      );
    case flags.isExactly([
      ApiSoulseekSearchStates.Completed,
      ApiSoulseekSearchStates.Cancelled,
    ]):
      return (
        <Icon
          color="green"
          name="stop circle"
          {...props}
        />
      );
    case flags.isExactly([
      ApiSoulseekSearchStates.Completed,
      ApiSoulseekSearchStates.Errored,
    ]):
      return (
        <Icon
          color="red"
          name="x"
          {...props}
        />
      );
    default:
      return (
        <Icon
          color="yellow"
          name="question circle"
          {...props}
        />
      );
  }
};

const SearchStatusIcon = ({
  state,
  ...props
}: { readonly state: ApiSoulseekSearchStates } & React.ComponentProps<
  typeof Icon
>) => (
  <Popup
    content={state}
    trigger={getIcon({ state, ...props })}
  />
);

export default SearchStatusIcon;
