import React, { createContext, useContext, useState } from 'react';
import { Tabs } from 'expo-router';
import { Play, Trophy, Settings } from 'lucide-react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';

// Create context for tab visibility
const TabVisibilityContext = createContext<{
  tabsVisible: boolean;
  setTabsVisible: (visible: boolean) => void;
}>({
  tabsVisible: true,
  setTabsVisible: () => {},
});

export const useTabVisibility = () => useContext(TabVisibilityContext);

export default function TabLayout() {
  const [tabsVisible, setTabsVisible] = useState(true);

  // Hide/show Android navigation bar based on tab visibility
  useEffect(() => {
    const updateNavigationBar = async () => {
      try {
        if (tabsVisible) {
          await NavigationBar.setVisibilityAsync('visible');
        } else {
          await NavigationBar.setVisibilityAsync('hidden');
        }
      } catch (error) {
        console.error('Error updating navigation bar:', error);
      }
    };
    
    updateNavigationBar();
  }, [tabsVisible]);
  return (
    <TabVisibilityContext.Provider value={{ tabsVisible, setTabsVisible }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#000',
            borderTopColor: '#333',
            display: tabsVisible ? 'flex' : 'none',
          },
          tabBarActiveTintColor: '#6200EE',
          tabBarInactiveTintColor: '#666',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Play',
            tabBarIcon: ({ size, color }) => (
              <Play size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="leaderboard"
          options={{
            title: 'Scores',
            tabBarIcon: ({ size, color }) => (
              <Trophy size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ size, color }) => (
              <Settings size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </TabVisibilityContext.Provider>
  );
}