import './Files.css';
import Explorer from './Explorer';
import { Tab, TabPane } from 'semantic-ui-react';

type Props = {
  options: {
    remoteFileManagement: boolean;
  };
};

const Files: React.FC<Props> = ({ options }) => {
  const { remoteFileManagement } = options;

  const panes = [
    {
      menuItem: 'Downloads',
      render: () => (
        <TabPane>
          <Explorer
            remoteFileManagement={remoteFileManagement}
            root="downloads"
          />
        </TabPane>
      ),
      route: 'downloads',
    },
    {
      menuItem: 'Incomplete',
      render: () => (
        <TabPane>
          <Explorer
            remoteFileManagement={remoteFileManagement}
            root="incomplete"
          />
        </TabPane>
      ),
      route: 'incomplete',
    },
  ];

  return (
    <div>
      <Tab panes={panes} />
    </div>
  );
};

export default Files;
