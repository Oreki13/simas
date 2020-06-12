import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {GiftedChat, Bubble, Send, InputToolbar} from 'react-native-gifted-chat';
import {Container, Header, Icon, Body, Title, Left, Right} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {sendMessage, getMessage} from '../redux/action/user';

const {height, width} = Dimensions.get('window');

const Chat = props => {
  const pesan = useSelector(state => state.user.chat);
  const user = useSelector(state => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessage());
  }, []);

  const onSend = messages => {
    const news = GiftedChat.append(pesan, messages);
    dispatch(sendMessage(news));
  };

  return (
    <Container>
      <Header style={styles.header} androidStatusBarColor="#373737">
        <Left>
          <TouchableOpacity
            style={styles.backAr}
            onPress={() => {
              props.navigation.navigate('DataDiri');
            }}>
            <Icon
              type="AntDesign"
              name="arrowleft"
              style={{color: 'white', fontSize: 20}}
            />
          </TouchableOpacity>
        </Left>
        <Body>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  marginRight: 10,
                }}
                source={{uri: user.img}}
              />
              <Title style={styles.title}>{user.nama}</Title>
            </View>
          </TouchableOpacity>
        </Body>
        <Right />
      </Header>

      <View style={{flex: 1, backgroundColor: '#232323'}}>
        <GiftedChat
          messages={pesan}
          onSend={mes => onSend(mes)}
          showAvatarForEveryMessage={true}
          alwaysShowSend={true}
          user={{
            _id: 1,
          }}
          renderBubble={pod => {
            return (
              <Bubble
                {...pod}
                textStyle={{
                  right: {
                    color: '#e5e5e5',
                  },
                  left: {
                    color: 'white',
                  },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: 'black',
                  },
                  right: {
                    backgroundColor: 'black',
                  },
                }}
              />
            );
          }}
          renderInputToolbar={tur => {
            return (
              <InputToolbar
                {...tur}
                containerStyle={{
                  backgroundColor: '#000',
                  color: '#fff',
                  borderTopWidth: 0,
                }}
                textInputStyle={{
                  color: 'white',
                }}
              />
            );
          }}
          renderSend={run => {
            return (
              <Send {...run}>
                <View style={{marginRight: 15, marginBottom: 15}}>
                  <Icon
                    type="Entypo"
                    name="direction"
                    style={{color: '#e5e5e5', fontSize: 20}}
                  />
                </View>
              </Send>
            );
          }}
          onInputTextChanged={() => {}}
        />
      </View>
    </Container>
  );
};

export default Chat;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#373737',
  },
  backAr: {
    paddingLeft: 10,
  },
});
