import './Files.css';
import Explorer from './Explorer';
import { Tab } from 'semantic-ui-react';

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
        <Tab.Pane>
          <Explorer
            remoteFileManagement={remoteFileManagement}
            root="downloads"
          />
        </Tab.Pane>
      ),
      route: 'downloads',
    },
    {
      menuItem: 'Incomplete',
      render: () => (
        <Tab.Pane>
          <Explorer
            remoteFileManagement={remoteFileManagement}
            root="incomplete"
          />
        </Tab.Pane>
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
