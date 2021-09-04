import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useLocalization } from '~/localization';
import { colors } from '~/styles';
import { Icon, Text } from '~/components';
import { device } from '~/utils';
import { screens } from '~/constants';
import * as components from '~/screens';

const tabBarOptions = {
  activeTintColor: colors.primary,
  inactiveTintColor: colors.placeholder,
  allowFontScaling: false,
  safeAreaInsets: {
    bottom: device.insetBottom,
  },
  style: {
    paddingLeft: 15,
    paddingRight: 20,
    paddingBottom: device.isIphoneX ? device.insetBottom - 6 : 10,
    paddingTop: 10,
    minHeight: device.tabBarHeight,
  },
};

const getTabOptions = (label, icon) => ({
  tabBarIcon: ({ color }) => <Icon name={icon} color={color} size={26} />,
  tabBarLabel: ({ color }) => <Text text={label} size={10} color={color} />,
});

const Tabs = createBottomTabNavigator();

export const TabsNavigator = () => {
  const { t } = useLocalization();

  return (
    <Tabs.Navigator lazy={false} tabBarOptions={tabBarOptions}>
      <Tabs.Screen
        name={screens.Main}
        component={components.Main}
        options={getTabOptions(t('main.title'), 'home-outline')}
      />
      <Tabs.Screen
        name="stub1"
        options={getTabOptions('stub1', 'square-outline')}
        component={components.Stub}
      />
      <Tabs.Screen
        name="stub2"
        component={components.Stub}
        options={getTabOptions('stub2', 'square-outline')}
      />
      <Tabs.Screen
        name={screens.Settings}
        component={components.Settings}
        options={getTabOptions(t('settings.title'), 'settings')}
      />
    </Tabs.Navigator>
  );
};
