import {
  getYaml,
  getYamlLocation,
  updateYaml,
  validateYaml,
} from '../../../lib/options';
import { Div, PlaceholderSegment, Switch } from '../../Shared';
import CodeEditor from '../../Shared/CodeEditor';
import { useEffect, useState } from 'react';
import { Button, Icon, Message, Modal } from 'semantic-ui-react';

type Props = {
  onClose: () => void;
  open: boolean;
  theme: React.ComponentProps<typeof CodeEditor>['theme'];
};

const EditModal: React.FC<Props> = ({ onClose, open, theme }) => {
  // eslint-disable-next-line react/hook-use-state
  const [{ error, loading }, setLoading] = useState<{
    error: false | string;
    loading: boolean;
  }>({
    error: false,
    loading: true,
  });
  // eslint-disable-next-line react/hook-use-state
  const [{ isDirty, location, yaml }, setYaml] = useState<{
    isDirty: boolean;
    location: string | undefined;
    yaml: string | undefined;
  }>({
    isDirty: false,
    location: undefined,
    yaml: undefined,
  });
  const [yamlError, setYamlError] = useState();
  const [updateError, setUpdateError] = useState();

  const get = async () => {
    setLoading({ error: false, loading: true });

    try {
      const [locationResult, yamlResult] = await Promise.all([
        getYamlLocation(),
        getYaml(),
      ]);

      setYaml({ isDirty: false, location: locationResult, yaml: yamlResult });
      setLoading({ error: false, loading: false });
    } catch (getError) {
      if (!(getError instanceof Error)) {
        throw getError;
      }

      setLoading({ error: getError.message, loading: false });
    }
  };

  const validate = async (newYaml: string) => {
    const response = await validateYaml({ yaml: newYaml });
    setYamlError(response);
  };

  const update = async (newYaml: string) => {
    setYaml({ isDirty: true, location, yaml: newYaml });
    await validate(newYaml);
  };

  const save = async (newYaml: string | undefined) => {
    if (newYaml == null) {
      return;
    }

    await validate(newYaml);

    if (!yamlError) {
      try {
        await updateYaml({ yaml: newYaml });
        onClose();
      } catch (nextUpdateError) {
        setUpdateError(nextUpdateError.response.data);
      }
    }
  };

  useEffect(() => {
    if (open) {
      void get();
    }
  }, [open]);

  return (
    <Modal
      onClose={onClose}
      open={open}
      size="large"
    >
      <Modal.Header>
        <Icon name="edit" />
        Edit Options
        <Div hidden={loading}>
          <Message
            className="no-grow edit-code-header"
            warning
          >
            <Icon name="warning sign" />
            Editing {location}
          </Message>
        </Div>
      </Modal.Header>
      <Modal.Content
        className="edit-code-content"
        scrolling
      >
        <Switch
          error={
            error !== false && (
              <PlaceholderSegment
                caption={error}
                icon="close"
              />
            )
          }
          loading={
            loading && (
              <PlaceholderSegment
                caption="Loading..."
                icon="spinner"
                loading
              />
            )
          }
        >
          <div
            {...{
              className:
                yamlError || updateError
                  ? 'edit-code-container-error'
                  : 'edit-code-container',
            }}
          >
            {yaml != null && (
              <CodeEditor
                onChange={async (value) => await update(value)}
                style={{ minHeight: 500 }}
                value={yaml}
                {...(theme ? { theme } : {})}
              />
            )}
          </div>
        </Switch>
      </Modal.Content>
      <Modal.Actions>
        {(yamlError || updateError) && (
          <Message
            className="no-grow left-align"
            negative
          >
            <Icon name="x" />
            {(yamlError ?? '') + (updateError ?? '')}
          </Message>
        )}
        <Button
          disabled={!isDirty}
          onClick={async () => await save(yaml)}
          primary
        >
          <Icon name="save" />
          Save
        </Button>
        <Button
          negative
          onClick={onClose}
        >
          <Icon name="close" />
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditModal;
