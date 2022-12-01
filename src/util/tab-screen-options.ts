import Icon from "react-native-vector-icons/AntDesign";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import React from "react";

type TabOptions = Pick<
    BottomTabNavigationOptions,
    "tabBarLabel" | "tabBarIcon" | "tabBarLabelStyle"
>;

type TabRequiredArgs = {
    labelName: string;
    iconName: string;
};

export const customOptions = ({
    iconName,
    labelName,
}: TabRequiredArgs): TabOptions => {
    return {
        tabBarLabel: labelName,
        tabBarIcon: ({ size, color }) =>
            React.createElement(Icon, {
                name: iconName,
                size: size,
                color: color,
                style: { marginTop: 5.8 },
            }),
        tabBarLabelStyle: {
            marginBottom: 6,
        },
    };
};
