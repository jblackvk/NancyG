/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  StatusBar,
  Dimensions
} from 'react-native';

import {Provider} from 'react-redux';
import store from './redux/store/index';
import AppContainer from './Src/Navigation/StackNavigation';

import FlashMessage from 'react-native-flash-message';

class RootApp extends React.Component{

  render(){
    return(
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          <StatusBar backgroundColor="#FFDB58"
                     barStyle="light-content"/>
          <AppContainer/>
        </View>
        <FlashMessage position={'top'}
                      canRegisterAsDefault={true}
                      floating={true}
                      style={{
                        flex: 1,
                        position: 'absolute',
                        opacity: 1,
                        width: Dimensions.get("screen").width - 25
                      }}
                      animated={true} />
      </View>
      // <StoryDisplay/>

      // <TestVideoPicker/>
      // <VideoPlayer/>
      /*<View style={{flex:1, backgroundColor: null}}>
          <TestFlashMessage/>
          <FlashMessage position={'top'}
                        canRegisterAsDefault={true}
                        floating={true}
                        style={{
                            flex: 1,
                            width: Dimensions.get("screen").width - 25
                        }}
                        animated={true} />
      </View>*/
      // <SimulPublication/>

    );
  }
}

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  );
};



export default App;
