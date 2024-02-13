import { type ApiSlskdSharesShare } from '../../../lib/generated/types';
import * as sharesLibrary from '../../../lib/shares';
import { LoaderSegment, ShrinkableButton, Switch } from '../../Shared';
import ContentsModal from './ContentsModal';
import ExclusionTable from './ExclusionTable';
import ShareTable from './ShareTable';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Divider } from 'semantic-ui-react';

type ScanButtonProps = {
  readonly rescan: () => void;
  readonly scanPending: boolean;
  readonly working: boolean;
};

const ScanButton: React.FC<ScanButtonProps> = ({
  rescan,
  scanPending,
  working,
}) => (
  <ShrinkableButton
    color={scanPending ? 'yellow' : undefined}
    disabled={working}
    icon="refresh"
    loading={working}
    mediaQuery="(max-width: 516px)"
    onClick={() => rescan()}
    primary={!scanPending}
  >
    Rescan Shares
  </ShrinkableButton>
);

type CancelButtonProps = {
  readonly cancel: () => void;
  readonly working: boolean;
};

const CancelButton: React.FC<CancelButtonProps> = ({ cancel, working }) => (
  <ShrinkableButton
    color="red"
    disabled={working}
    icon="x"
    mediaQuery="(max-width: 516px)"
    onClick={() => cancel()}
  >
    Cancel Scan
  </ShrinkableButton>
);

type Props = {
  readonly state: {
    readonly directories: number;
    readonly files: number;
    readonly scanPending: boolean;
    readonly scanProgress: number;
    readonly scanning: boolean;
  };
};

export type ShareWithHost = ApiSlskdSharesShare & {
  host: string;
};

const Shares: React.FC<Props> = ({ state }) => {
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [shares, setShares] = useState<ShareWithHost[]>([]);
  const [modal, setModal] = useState<false | ShareWithHost>(false);

  const { directories, files, scanPending, scanProgress, scanning } = state;

  const getAll = async (quiet = false) => {
    try {
      if (!quiet) {
        setLoading(true);
      }

      const sharesByHost = await sharesLibrary.getAll();
      const flattened = Object.entries(sharesByHost).reduce<ShareWithHost[]>(
        (accumulator, [host, sharesForHost]) => {
          return accumulator.concat(
            sharesForHost.map((share) => ({ host, ...share })),
          );
        },
        [],
      );

      setShares(flattened);
    } catch (error) {
      console.error(error);

      if (!(error instanceof Error)) {
        throw error;
      }

      toast.error(
        (isAxiosError(error) ? error?.response?.data : null) ??
          error?.message ??
          error,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void getAll();
  }, []);

  useEffect(() => {
    void getAll(true);

    let interval: NodeJS.Timeout;

    if (!scanning) {
      // the state change out of scanning can fire before
      // shares are updated, which leaves them stale. wait a second
      // and fetch again.
      interval = setTimeout(async () => await getAll(true), 1_000);
    }

    return () => clearInterval(interval);
  }, [scanPending, scanning]);

  const rescan = async () => {
    try {
      setWorking(true);
      await sharesLibrary.rescan();
    } catch (error) {
      console.error(error);

      if (!(error instanceof Error)) {
        throw error;
      }

      toast.error(
        (isAxiosError(error) ? error?.response?.data : null) ??
          error?.message ??
          error,
      );
    } finally {
      setWorking(false);
    }
  };

  const cancel = async () => {
    try {
      setWorking(true);
      await sharesLibrary.cancel();
    } catch (error) {
      console.error(error);

      if (!(error instanceof Error)) {
        throw error;
      }

      toast.error(
        (isAxiosError(error) ? error?.response?.data : null) ??
          error?.message ??
          error ??
          'Failed to cancel the scan',
      );
    } finally {
      setWorking(false);
    }
  };

  const shared = shares.filter((share) => !share.isExcluded);
  const excluded = shares.filter((share) => share.isExcluded);

  return (
    <Switch loading={loading && <LoaderSegment />}>
      <div className="header-buttons">
        <Switch
          scanning={
            scanning && (
              <CancelButton
                cancel={cancel}
                working={working}
              />
            )
          }
        >
          <ScanButton
            rescan={rescan}
            scanPending={scanPending}
            working={working}
          />
        </Switch>
      </div>
      <Divider />
      <Switch
        filling={
          scanning && (
            <LoaderSegment>
              <div>
                <div>{Math.round(scanProgress * 100)}%</div>
                <div className="share-scan-detail">
                  Found {files} files in {directories} directories
                </div>
              </div>
            </LoaderSegment>
          )
        }
      >
        <ShareTable
          onClick={setModal}
          shares={shared}
        />
        <ExclusionTable exclusions={excluded} />
      </Switch>
      <ContentsModal
        onClose={() => setModal(false)}
        share={modal}
      />
    </Switch>
  );
};

export default Shares;
