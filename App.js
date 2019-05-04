import React from 'react';
import {StyleSheet,Text,View} from 'react-native';
import AppContainer from './src/routes';
import {AppLoading,Asset,Font,Icon} from 'expo'
import {createStore,compose,applyMiddleware} from 'redux'
import rootReducer from './src/reducers/rootReducer'
import thunk from 'redux-thunk'
import {getFirestore,reduxFirestore} from 'redux-firestore'
import {getFirebase,reactReduxFirebase} from 'react-redux-firebase'
import fbConfig from './src/config/fbConfig'
import {Provider} from 'react-redux'

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({
      getFirebase,
      getFirestore
    })),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig),
  )
);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return ( <AppLoading 
        startAsync = {this._loadResourcesAsync}
        onError = {this._handleLoadingError}
        onFinish = {this._handleFinishLoading}
        />
      );
    } else {return <Provider store = {store}>< AppContainer /></Provider>;}
  }
  
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/bouncing_twitch_white.gif'),
      ]),
      Font.loadAsync({
        // This is the font that we are using
        ...Icon.Ionicons.font,
        'hanna': require('./assets/font/NanumSquareRoundB.ttf'),
        'noto': require('./assets/font/NotoSans-Regular.ttf'),
        'noto-bold': require('./assets/font/NotoSans-Bold.ttf'),
        'nunito': require('./assets/font/Nunito-Regular.ttf'),
        'nunito-light': require('./assets/font/Nunito-Light.ttf'),
        'nunito-semibold': require('./assets/font/Nunito-SemiBold.ttf'),
        'nunito-bold': require('./assets/font/Nunito-Bold.ttf'),

      }),
    ]);
  };
  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({
      isLoadingComplete: true
    })
  };
}