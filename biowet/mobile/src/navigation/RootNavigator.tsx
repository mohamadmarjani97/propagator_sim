import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { colors } from "../theme/theme";
import { AdminDashboardScreen } from "../screens/admin/AdminDashboardScreen";
import { ExploreScreen } from "../screens/explore/ExploreScreen";
import { HomeScreen } from "../screens/home/HomeScreen";
import { MapScreen } from "../screens/map/MapScreen";
import { OnboardingScreen } from "../screens/onboarding/OnboardingScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { ReportScreen } from "../screens/report/ReportScreen";

type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
  AdminDashboard: undefined;
};

type TabParamList = {
  Home: undefined;
  Map: undefined;
  Report: undefined;
  Explore: undefined;
  Profile: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs({
  onOpenAdmin,
}: {
  onOpenAdmin: () => void;
}): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: "#FFFFFF",
          height: 62,
          paddingBottom: 6,
        },
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
            Home: "home-outline",
            Map: "map-outline",
            Report: "camera-outline",
            Explore: "leaf-outline",
            Profile: "person-outline",
          };
          return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Report" component={ReportScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Profile">
        {() => <ProfileScreen onOpenAdmin={onOpenAdmin} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export function RootNavigator(): JSX.Element {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!hasCompletedOnboarding ? (
        <RootStack.Screen name="Onboarding">
          {() => (
            <OnboardingScreen
              onComplete={() => {
                setHasCompletedOnboarding(true);
              }}
            />
          )}
        </RootStack.Screen>
      ) : null}
      <RootStack.Screen name="MainTabs">
        {({ navigation }) => (
          <MainTabs onOpenAdmin={() => navigation.navigate("AdminDashboard")} />
        )}
      </RootStack.Screen>
      <RootStack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{ headerShown: true, title: "Admin Dashboard" }}
      />
    </RootStack.Navigator>
  );
}
