import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import {
  Container,
  View,
  Text,
  Header,
  Body,
  Content,
  Form,
  Item,
  Input,
  Label,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {getData} from '../redux/action/user';

const {height, width} = Dimensions.get('window');

const DataDiri = props => {
  const dataa = useSelector(state => state.user.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const urlImg = dataa.img;
  const nik = dataa.nik;
  const nama = dataa.nama;
  const noTlp = dataa.noTlp;
  const email = dataa.email;

  const goChat = () => {
    props.navigation.navigate('Chat');
  };
  return (
    <Container>
      <Header style={styles.header} androidStatusBarColor="#373737">
        <Body style={{alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 19}}>Data Diri</Text>
        </Body>
      </Header>
      <Content style={styles.content}>
        <View style={styles.container}>
          <View style={styles.boxImg}>
            <Image
              source={{
                uri: urlImg,
              }}
              style={styles.img}
            />
          </View>
          <View style={{flex: 1, width: width}}>
            <Form>
              <Item stackedLabel>
                <Label style={styles.text}>NIK</Label>
                <Input
                  style={styles.text}
                  keyboardType="number-pad"
                  defaultValue={nik}
                  disabled
                />
              </Item>
              <Item stackedLabel>
                <Label style={styles.text}>Nama</Label>
                <Input
                  style={styles.text}
                  textContentType="name"
                  defaultValue={nama}
                  disabled
                />
              </Item>
              <Item stackedLabel>
                <Label style={styles.text}>No Telfon</Label>
                <Input
                  style={styles.text}
                  textContentType="telephoneNumber"
                  keyboardType="number-pad"
                  defaultValue={noTlp}
                  disabled
                />
              </Item>
              <Item stackedLabel>
                <Label style={styles.text}>Email</Label>
                <Input
                  style={styles.text}
                  textContentType="emailAddress"
                  defaultValue={email}
                  disabled
                />
              </Item>
            </Form>
          </View>
          <TouchableOpacity
            onPress={() => goChat()}
            style={{alignItems: 'center'}}>
            <View style={styles.btnBox}>
              <Text style={styles.btn}>Chat</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Content>
    </Container>
  );
};

export default DataDiri;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#373737',
  },
  content: {
    marginTop: 30,
    backgroundColor: '#232323',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: width / 3,
    height: width / 3,
    borderRadius: 100,
  },
  boxImg: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  text: {
    color: '#e5e5e5e5',
  },
  btnBox: {
    borderColor: '#3355ff',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: width / 2,
  },
  btn: {
    color: '#3355ff',
  },
});
