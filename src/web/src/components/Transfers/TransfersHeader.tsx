import {
  type ApiSlskdServerState,
  type ApiSlskdTransfersAPIUserResponse,
  type ApiSlskdTransfersTransfer,
  ApiSoulseekTransferDirection,
  ApiSoulseekTransferStates,
} from '../../lib/generated/types';
import { isStateCancellable, isStateRetryable } from '../../lib/transfers';
import { Div, Nbsp } from '../Shared';
import ShrinkableDropdownButton from '../Shared/ShrinkableDropdownButton';
import { useMemo, useState } from 'react';
import { Icon, Segment } from 'semantic-ui-react';

enum ExtendedTransferTypes {
  All = 'All',
}

const TransferStatesWithAll = {
  ...ApiSoulseekTransferStates,
  ...ExtendedTransferTypes,
};
type TransferStatesWithAllType = keyof typeof TransferStatesWithAll;

const RetryOptions = [
  {
    key: 'errored',
    text: 'Errored',
    value: TransferStatesWithAll.Errored,
  },
  {
    key: 'cancelled',
    text: 'Cancelled',
    value: TransferStatesWithAll.Cancelled,
  },
  { key: 'all', text: 'All', value: TransferStatesWithAll.All },
];

const CancelOptions = [
  { key: 'all', text: 'All', value: TransferStatesWithAll.All },
  {
    key: 'queued',
    text: 'Queued',
    value: TransferStatesWithAll.Queued,
  },
  {
    key: 'inProgress',
    text: 'In Progress',
    value: TransferStatesWithAll.InProgress,
  },
];

const RemoveOptions = [
  {
    key: 'succeeded',
    text: 'Succeeded',
    value: TransferStatesWithAll.Succeeded,
  },
  {
    key: 'errored',
    text: 'Errored',
    value: TransferStatesWithAll.Errored,
  },
  {
    key: 'cancelled',
    text: 'Cancelled',
    value: TransferStatesWithAll.Cancelled,
  },
  {
    key: 'completed',
    text: 'Completed',
    value: TransferStatesWithAll.Completed,
  },
];

const getRetryableFiles = ({
  files,
  retryOption,
}: {
  files: ApiSlskdTransfersTransfer[];
  retryOption: TransferStatesWithAllType;
}) => {
  switch (retryOption) {
    case ApiSoulseekTransferStates.Errored:
      return files.filter((file) =>
        [
          'Completed, TimedOut',
          'Completed, Errored',
          'Completed, Rejected',
        ].includes(file.state),
      );
    case ApiSoulseekTransferStates.Cancelled:
      return files.filter((file) => file.state === 'Completed, Cancelled');
    case TransferStatesWithAll.All:
      return files.filter((file) => isStateRetryable(file.state));
    default:
      return [];
  }
};

const getCancellableFiles = ({
  cancelOption,
  files,
}: {
  cancelOption: TransferStatesWithAllType;
  files: ApiSlskdTransfersTransfer[];
}) => {
  switch (cancelOption) {
    case TransferStatesWithAll.All:
      return files.filter((file) => isStateCancellable(file.state));
    case ApiSoulseekTransferStates.Queued:
      return files.filter((file) =>
        ['Queued, Locally', 'Queued, Remotely'].includes(file.state),
      );
    case ApiSoulseekTransferStates.InProgress:
      return files.filter(
        (file) => file.state === ApiSoulseekTransferStates.InProgress,
      );
    default:
      return [];
  }
};

const getRemovableFiles = ({
  files,
  removeOption,
}: {
  files: ApiSlskdTransfersTransfer[];
  removeOption: TransferStatesWithAllType;
}) => {
  switch (removeOption) {
    case ApiSoulseekTransferStates.Succeeded:
      return files.filter((file) => file.state === 'Completed, Succeeded');
    case ApiSoulseekTransferStates.Errored:
      return files.filter((file) =>
        [
          'Completed, TimedOut',
          'Completed, Errored',
          'Completed, Rejected',
        ].includes(file.state),
      );
    case ApiSoulseekTransferStates.Cancelled:
      return files.filter((file) => file.state === 'Completed, Cancelled');
    case ApiSoulseekTransferStates.Completed:
      return files.filter((file) => file.state.includes('Completed'));
    default:
      return [];
  }
};

type Props = {
  cancelling?: boolean;
  direction: ApiSoulseekTransferDirection;
  onCancelAll: (files: ApiSlskdTransfersTransfer[]) => void;
  onRemoveAll: (files: ApiSlskdTransfersTransfer[]) => void;
  onRetryAll: (files: ApiSlskdTransfersTransfer[]) => void;
  removing?: boolean;
  retrying?: boolean;
  server: ApiSlskdServerState;
  transfers: ApiSlskdTransfersAPIUserResponse[];
};

const TransfersHeader: React.FC<Props> = ({
  cancelling = false,
  direction,
  onCancelAll,
  onRemoveAll,
  onRetryAll,
  removing = false,
  retrying = false,
  server,
  transfers,
}) => {
  const [removeOption, setRemoveOption] = useState<TransferStatesWithAllType>(
    TransferStatesWithAll.Succeeded,
  );
  const [cancelOption, setCancelOption] = useState<TransferStatesWithAllType>(
    TransferStatesWithAll.All,
  );
  const [retryOption, setRetryOption] = useState<TransferStatesWithAllType>(
    TransferStatesWithAll.Errored,
  );

  const files = useMemo(() => {
    return transfers
      .reduce<ApiSlskdTransfersTransfer[]>((accumulator, username) => {
        const allUserFiles = username.directories.reduce<
          ApiSlskdTransfersTransfer[]
        >((directoryAccumulator, directory) => {
          return directoryAccumulator.concat(directory.files);
        }, []);

        return accumulator.concat(allUserFiles);
      }, [])
      .filter((file) => file.direction.toLowerCase() === direction);
  }, [direction, transfers]);

  const empty = files.length === 0;
  const working = retrying || cancelling || removing;

  return (
    <Segment
      className="transfers-header-segment"
      raised
    >
      <div className="transfers-segment-icon">
        <Icon
          name={
            direction === ApiSoulseekTransferDirection.Download
              ? 'download'
              : 'upload'
          }
          size="big"
        />
      </div>
      <Div
        className="transfers-header-buttons"
        hidden={empty}
      >
        <ShrinkableDropdownButton
          color="green"
          disabled={working || empty || !server.isConnected}
          hidden={direction === ApiSoulseekTransferDirection.Upload}
          icon="redo"
          loading={retrying}
          mediaQuery="(max-width: 715px)"
          onChange={(_, data) =>
            setRetryOption(data.value as TransferStatesWithAllType)
          }
          onClick={() => onRetryAll(getRetryableFiles({ files, retryOption }))}
          options={RetryOptions}
        >
          {`Retry ${retryOption === TransferStatesWithAll.All ? retryOption : `All ${retryOption}`}`}
        </ShrinkableDropdownButton>
        <Nbsp />
        <ShrinkableDropdownButton
          color="red"
          disabled={working || empty}
          icon="x"
          loading={cancelling}
          mediaQuery="(max-width: 715px)"
          onChange={(_, data) =>
            setCancelOption(data.value as TransferStatesWithAllType)
          }
          onClick={() =>
            onCancelAll(getCancellableFiles({ cancelOption, files }))
          }
          options={CancelOptions}
        >
          {`Cancel ${cancelOption === TransferStatesWithAll.All ? cancelOption : `All ${cancelOption}`}`}
        </ShrinkableDropdownButton>
        <Nbsp />
        <ShrinkableDropdownButton
          disabled={working || empty}
          icon="trash alternate"
          loading={removing}
          mediaQuery="(max-width: 715px)"
          onChange={(_, data) =>
            setRemoveOption(data.value as TransferStatesWithAllType)
          }
          onClick={() =>
            onRemoveAll(getRemovableFiles({ files, removeOption }))
          }
          options={RemoveOptions}
        >
          {`Remove All ${removeOption}`}
        </ShrinkableDropdownButton>
      </Div>
    </Segment>
  );
};

export default TransfersHeader;
