import { createStackNavigator,createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import StreamerListScreen from './screens/StreamerListScreen';
import MissionScreen from './screens/MissionScreen';
import CreateMissionScreen from './screens/CreateMissionScreen';
import MissionDetailScreen from './screens/MissionDetailScreen';
import NoMissionScreen from './screens/NoMissionScreen';
import AddToMissionScreen from './screens/AddToMissionScreen';

const AppStackNavigator = createStackNavigator({
    StreamerList:{
        screen: StreamerListScreen,
    },
    MissionList:{
        screen: MissionScreen,
    },
    CreateMission:{
        screen: CreateMissionScreen,
    },
    MissionDetail:{
        screen: MissionDetailScreen,
    },
    NoMission:{
        screen: NoMissionScreen,
    },
    AddToMission:{
        screen: AddToMissionScreen,
    }
  });
  
const AuthStackNavigator = createStackNavigator({
    Login:{
        screen:LoginScreen
    }
});
const AppContainer = createAppContainer(createSwitchNavigator({
    Auth:AuthStackNavigator,
    App:AppStackNavigator,
},{
    initialRouteNamne: 'Auth',
}));

export default AppContainer;