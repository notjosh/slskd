import './System.css';
import {
  type ApiSlskdOptions,
  type ApiSlskdState,
} from '../../lib/generated/types';
import { type CodeEditor, Switch } from '../Shared';
import Data from './Data';
import Files from './Files';
import Info from './Info';
import Logs from './Logs';
import Options from './Options';
import Shares from './Shares';
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import { Icon, Menu, Segment, Tab, TabPane } from 'semantic-ui-react';

type Props = {
  readonly options: ApiSlskdOptions;
  readonly state: ApiSlskdState;
  theme: React.ComponentProps<typeof CodeEditor>['theme'];
};

const System: React.FC<Props> = ({ options, state, theme }) => {
  const {
    params: { tab },
    ...route
  } = useRouteMatch();
  const history = useHistory();

  const panes = [
    {
      menuItem: (
        <Menu.Item key="info">
          <Switch
            pending={
              ((state?.pendingRestart ?? false) ||
                (state?.pendingReconnect ?? false)) && (
                <Icon
                  color="yellow"
                  name="exclamation circle"
                />
              )
            }
          >
            <Icon name="info circle" />
          </Switch>
          Info
        </Menu.Item>
      ),
      render: () => (
        <TabPane>
          <Info
            state={state}
            theme={theme}
          />
        </TabPane>
      ),
      route: 'info',
    },
    {
      menuItem: {
        content: 'Options',
        icon: 'options',
        key: 'options',
      },
      render: () => (
        <TabPane className="full-height">
          <Options
            options={options}
            theme={theme}
          />
        </TabPane>
      ),
      route: 'options',
    },
    {
      menuItem: (
        <Menu.Item key="shares">
          <Switch
            scanPending={
              (state?.shares?.scanPending ?? false) && (
                <Icon
                  color="yellow"
                  name="exclamation circle"
                />
              )
            }
          >
            <Icon name="external share" />
          </Switch>
          Shares
        </Menu.Item>
      ),
      render: () => (
        <TabPane>
          <Shares
            state={state.shares}
            {...(theme ? { theme } : {})}
          />
        </TabPane>
      ),
      route: 'shares',
    },
    {
      menuItem: {
        content: 'Files',
        icon: 'folder open',
        key: 'files',
      },
      render: () => (
        <TabPane className="full-height">
          <Files
            options={options}
            {...(theme ? { theme } : {})}
          />
        </TabPane>
      ),
      route: 'files',
    },
    {
      menuItem: {
        content: 'Data',
        icon: 'database',
        key: 'data',
      },
      render: () => (
        <TabPane className="full-height">
          <Data />
        </TabPane>
      ),
      route: 'data',
    },
    {
      menuItem: {
        content: 'Logs',
        icon: 'file outline',
        key: 'logs',
      },
      render: () => (
        <TabPane>
          <Logs />
        </TabPane>
      ),
      route: 'logs',
    },
  ];

  const activeIndex = panes.findIndex((pane) => pane.route === tab);

  const onTabChange: NonNullable<
    React.ComponentProps<typeof Tab>['onTabChange']
  > = (_event, { activeIndex: newActiveIndex }) => {
    if (typeof newActiveIndex !== 'number') {
      return;
    }

    const pane = panes[newActiveIndex];

    if (pane == null) {
      return;
    }

    history.push(pane.route);
  };

  if (tab === undefined) {
    const pane = panes[0];

    if (pane == null) {
      return null;
    }

    return <Redirect to={`${route.url}/${pane.route}`} />;
  }

  return (
    <div className="system">
      <Segment raised>
        <Tab
          activeIndex={activeIndex > -1 ? activeIndex : 0}
          onTabChange={onTabChange}
          panes={panes}
        />
      </Segment>
    </div>
  );
};

export default System;
