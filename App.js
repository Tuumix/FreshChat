/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Freshchat, FreshchatConfig} from 'react-native-freshchat-sdk';
import {FreshchatUser} from 'react-native-freshchat-sdk';
//import {Button, ThemeProvider} from 'react-native-elements';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

function App() {
  const [str, altera] = useState('teste');
  var freshchatConfig = new FreshchatConfig(
    'b6fd52a0-b34a-4455-8cb5-64273db96faa',
    '7f554b93-72db-4d49-8e68-59c50ba2abd6',
  );

  var freshchatUser = new FreshchatUser();
  freshchatUser.firstName = 'Wellington';
  freshchatUser.lastName = 'Doe';
  freshchatUser.email = 'tumi_cross@msn.com';
  freshchatUser.phoneCountryCode = '+55';
  freshchatUser.phone = '18996221772';

  Freshchat.setUser(freshchatUser, error => {
    console.log(error);
  });

  Freshchat.identifyUser('amor@hotmail.com', null, error => {
    console.log(error);
  });

  Freshchat.addEventListener(Freshchat.EVENT_USER_RESTORE_ID_GENERATED, () => {
    console.log('onRestoreIdUpdated triggered');
    Freshchat.getUser(user => {
      var restoreId = user.restoreId;
      var externalId = user.externalId;
    });
  });

  function abrir_chat() {
    Freshchat.init(freshchatConfig);
    Freshchat.showConversations();
  }

  function abrir_FAQ() {
    Freshchat.showFAQs();
  }

  function load() {
    var restoreId, externalId;
    Freshchat.getUser(user => {
      restoreId = user.restoreId;
      externalId = user.externalId;
    });
    Freshchat.identifyUser(externalId, restoreId, error => {
      console.log(error);
    });
    Freshchat.showConversations();
  }

  function reset() {
    Freshchat.resetUser();
  }

  return (
    <View style={styles.Main}>
      <View style={styles.Botoes_Container}>
        <TouchableOpacity style={styles.button} onPress={abrir_FAQ}>
          <Text style={styles.text_button}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={abrir_chat}>
          <Text style={styles.text_button}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: '#f26641',
    width: '100%',
    height: 600,
  },
  Botoes_Container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30,
    justifyContent: 'space-evenly',
    paddingBottom: 30,
    height: 100,
    width: '100%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '50%',
    height: 50,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 6, width: 3}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  text_button: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
