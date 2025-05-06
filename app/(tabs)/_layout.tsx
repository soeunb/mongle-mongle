import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                tabBarStyle: Platform.select({
                    ios: { position: 'absolute' },
                    default: {},
                }),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="History"
                options={{
                    title: '감정 히스토리',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="clock.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="skins"
                options={{
                    title: '스킨',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="sparkles" color={color} />,
                }}
            />
        </Tabs>
    );
}