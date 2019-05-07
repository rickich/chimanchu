import { createStackNavigator,createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import StreamerListScreen from './screens/StreamerListScreen';
import MissionScreen from './screens/MissionScreen';
import CreateMissionScreen from './screens/CreateMissionScreen';
import MissionDetailScreen from './screens/MissionDetailScreen';
import AddToMissionScreen from './screens/AddToMissionScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';

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
    AddToMission:{
        screen: AddToMissionScreen,
    },

  },
  {
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#645393',
        },
        headerLeftContainerStyle:{
            paddingLeft:10,
        },
        headerRightContainerStyle:{
            paddingRight:10,
        },
        headerBackTitle:null,
        headerTintColor: '#fff',        
    },
});
  
const AuthStackNavigator = createStackNavigator({
    Login:{
        screen:LoginScreen
    }
});

const AppContainer = createAppContainer(createSwitchNavigator({
    AuthLoading:AuthLoadingScreen,
    Auth:AuthStackNavigator,
    App:AppStackNavigator,
},{
    initialRouteName: 'AuthLoading',
    
}));

export default AppContainer;