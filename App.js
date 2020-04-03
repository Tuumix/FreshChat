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

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
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
      alert('gerado!');
    });
  });

  function abrir_chat() {
    var restoreId;
    Freshchat.init(freshchatConfig);
    //Freshchat.showFAQs();
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
      alert('testando:' + restoreId);
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
      <View style={styles.Head}>
        <Text>teste</Text>
      </View>
      <View style={styles.Footer}>
        <Button onPress={abrir_FAQ} title="Email" />
        <Button onPress={abrir_chat} title="Chat" />
        <Button onPress={load} title="Load" />
        <Button onPress={reset} title="Reset" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: '#333',
    flexDirection: 'column',
    width: '100%',
    height: 600,
  },
  Head: {
    backgroundColor: 'pink',
    height: 650,
    width: '100%',
  },
  Footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
