import './Transfers.css';
import {
  type ApiSlskdServerState,
  type ApiSlskdTransfersAPIUserResponse,
  type ApiSlskdTransfersTransfer,
  ApiSoulseekTransferDirection,
} from '../../lib/generated/types';
import * as transfersLibrary from '../../lib/transfers';
import { LoaderSegment, PlaceholderSegment } from '../Shared';
import TransferGroup from './TransferGroup';
import TransfersHeader from './TransfersHeader';
import { isAxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  direction: ApiSoulseekTransferDirection;
  server: ApiSlskdServerState;
};

const Transfers: React.FC<Props> = ({ direction, server }) => {
  const [connecting, setConnecting] = useState(true);
  const [transfers, setTransfers] = useState<
    ApiSlskdTransfersAPIUserResponse[]
  >([]);

  const [retrying, setRetrying] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [removing, setRemoving] = useState(false);

  const fetch = async () => {
    try {
      const response = await transfersLibrary.getAll({ direction });
      setTransfers(response);
    } catch (error) {
      console.error(error);
      if (!(error instanceof Error)) {
        throw error;
      }

      toast.error(
        (isAxiosError(error) ? error?.response?.data : undefined) ??
          error?.message ??
          error,
      );
    }
  };

  useEffect(() => {
    setConnecting(true);

    const init = async () => {
      await fetch();
      setConnecting(false);
    };

    void init();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const interval = window.setInterval(fetch, 1_000);

    return () => {
      clearInterval(interval);
    };
  }, [direction]); // eslint-disable-line react-hooks/exhaustive-deps

  useMemo(() => {
    // this is used to prevent weird update issues if switching
    // between uploads and downloads.  useEffect fires _after_ the
    // prop 'direction' updates, meaning there's a flash where the
    // screen contents switch to the new direction for a brief moment
    // before the connecting animation shows.  this memo fires the instant
    // the direction prop changes, preventing this flash.
    setConnecting(true);
  }, [direction]); // eslint-disable-line react-hooks/exhaustive-deps

  const retry = async ({
    file,
    suppressStateChange = false,
  }: {
    file: ApiSlskdTransfersTransfer;
    suppressStateChange: boolean;
  }) => {
    const { filename, size, username } = file;

    try {
      if (!suppressStateChange) setRetrying(true);
      await transfersLibrary.download({
        files: [{ filename, size }],
        username,
      });
      if (!suppressStateChange) setRetrying(false);
    } catch (error) {
      console.error(error);
      if (!(error instanceof Error)) {
        throw error;
      }

      toast.error(
        (isAxiosError(error) ? error?.response?.data : undefined) ??
          error?.message ??
          error,
      );
      if (!suppressStateChange) setRetrying(false);
    }
  };

  const retryAll = async (transfersToRetry: ApiSlskdTransfersTransfer[]) => {
    setRetrying(true);
    await Promise.all(
      transfersToRetry.map(
        async (file) => await retry({ file, suppressStateChange: true }),
      ),
    );
    setRetrying(false);
  };

  const cancel = async ({
    file,
    suppressStateChange = false,
  }: {
    file: ApiSlskdTransfersTransfer;
    suppressStateChange: boolean;
  }) => {
    const { id, username } = file;

    try {
      if (!suppressStateChange) setCancelling(true);
      await transfersLibrary.cancel({ direction, id, username });
      if (!suppressStateChange) setCancelling(false);
    } catch (error) {
      console.error(error);
      if (!(error instanceof Error)) {
        throw error;
      }

      toast.error(
        (isAxiosError(error) ? error?.response?.data : undefined) ??
          error?.message ??
          error,
      );
      if (!suppressStateChange) setCancelling(false);
    }
  };

  const cancelAll = async (transfersToCancel: ApiSlskdTransfersTransfer[]) => {
    setCancelling(true);
    await Promise.all(
      transfersToCancel.map(
        async (file) => await cancel({ file, suppressStateChange: true }),
      ),
    );
    setCancelling(false);
  };

  const remove = async ({
    file,
    suppressStateChange = false,
  }: {
    file: ApiSlskdTransfersTransfer;
    suppressStateChange: boolean;
  }) => {
    const { id, username } = file;

    try {
      if (!suppressStateChange) setRemoving(true);
      await transfersLibrary.cancel({ direction, id, remove: true, username });
      if (!suppressStateChange) setRemoving(false);
    } catch (error) {
      console.error(error);
      if (!(error instanceof Error)) {
        throw error;
      }

      toast.error(
        (isAxiosError(error) ? error?.response?.data : undefined) ??
          error?.message ??
          error,
      );
      if (!suppressStateChange) setRemoving(false);
    }
  };

  const removeAll = async (transfersToRemove: ApiSlskdTransfersTransfer[]) => {
    setRemoving(true);
    await Promise.all(
      transfersToRemove.map(
        async (file) => await remove({ file, suppressStateChange: true }),
      ),
    );
    setRemoving(false);
  };

  if (connecting) {
    return <LoaderSegment />;
  }

  return (
    <>
      <TransfersHeader
        cancelling={cancelling}
        direction={direction}
        onCancelAll={cancelAll}
        onRemoveAll={removeAll}
        onRetryAll={retryAll}
        removing={removing}
        retrying={retrying}
        server={server}
        transfers={transfers}
      />
      {transfers.length === 0 ? (
        <PlaceholderSegment
          caption={`No ${direction}s to display`}
          icon={
            direction === ApiSoulseekTransferDirection.Download
              ? 'download'
              : 'upload'
          }
        />
      ) : (
        transfers.map((user) => (
          <TransferGroup
            direction={direction}
            key={user.username}
            user={user}
          />
        ))
      )}
    </>
  );
};

export default Transfers;
