import { Switch } from '../../Shared';
import { Icon, Table } from 'semantic-ui-react';

type Props = {
  exclusions: Array<{
    localPath: string;
  }>;
};

const ExclusionTable: React.FC<Props> = ({ exclusions = [] }) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Excluded Paths</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Switch
          empty={
            exclusions.length === 0 && (
              <Table.Row>
                <Table.Cell
                  style={{
                    opacity: 0.5,
                    padding: '10px !important',
                    textAlign: 'center',
                  }}
                >
                  No exclusions configured
                </Table.Cell>
              </Table.Row>
            )
          }
        >
          {exclusions.map((share) => (
            <Table.Row key={share.localPath}>
              <Table.Cell>
                <Icon
                  color="red"
                  name="x"
                />
                {share.localPath}
              </Table.Cell>
            </Table.Row>
          ))}
        </Switch>
      </Table.Body>
    </Table>
  );
};

export default ExclusionTable;
