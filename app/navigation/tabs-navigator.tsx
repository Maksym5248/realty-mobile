import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useLocale } from '~/hooks';
import { colors, elements } from '~/styles';
import { Icon, Text } from '~/components';
import { device } from '~/utils';
import { SCREENS } from '~/constants';
import * as screens from '~/screens';

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
    minHeight: elements.tabBarHeight,
  },
};

const getTabOptions = (label: string, icon: string) => ({
  tabBarIcon: ({ color }: { color: string }) => <Icon name={icon} color={color} size={26} />,
  tabBarLabel: ({ color }: { color: string }) => <Text text={label} size={10} color={color} />,
});

const Tabs = createBottomTabNavigator();

export const TabsNavigator = () => {
  const { t } = useLocale();

  return (
    <Tabs.Navigator tabBarOptions={tabBarOptions}>
      <Tabs.Screen
        name={SCREENS.MAIN}
        component={screens.Main}
        options={getTabOptions(t('main.title'), 'home-outline')}
      />
      <Tabs.Screen
        name="stub1"
        options={getTabOptions('stub1', 'square-outline')}
        component={screens.Stub}
      />
      <Tabs.Screen
        name="stub2"
        component={screens.Stub}
        options={getTabOptions('stub2', 'square-outline')}
      />
      <Tabs.Screen
        name={SCREENS.SETTINGS}
        component={screens.Settings}
        options={getTabOptions(t('settings.title'), 'settings')}
      />
    </Tabs.Navigator>
  );
};
