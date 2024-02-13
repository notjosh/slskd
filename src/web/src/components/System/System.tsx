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
import { Icon, Menu, Segment, Tab } from 'semantic-ui-react';

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
        <Tab.Pane>
          <Info
            state={state}
            theme={theme}
          />
        </Tab.Pane>
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
        <Tab.Pane className="full-height">
          <Options
            options={options}
            theme={theme}
          />
        </Tab.Pane>
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
        <Tab.Pane>
          <Shares
            state={state.shares}
            {...(theme ? { theme } : {})}
          />
        </Tab.Pane>
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
        <Tab.Pane className="full-height">
          <Files
            options={options}
            {...(theme ? { theme } : {})}
          />
        </Tab.Pane>
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
        <Tab.Pane className="full-height">
          <Data />
        </Tab.Pane>
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
        <Tab.Pane>
          <Logs />
        </Tab.Pane>
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
