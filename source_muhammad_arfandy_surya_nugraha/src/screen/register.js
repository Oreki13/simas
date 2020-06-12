import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  View,
  Body,
  Icon,
} from 'native-base';
import {useDispatch} from 'react-redux';
import {saveUser} from '../redux/action/user';

const Register = props => {
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [noTlp, setNoTlp] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const dispatch = useDispatch();
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;

  const goFoto = () => {
    const checkEmail = email.match(regexEmail);
    if (nik.length == 0) {
      ToastAndroid.show(
        'Nik Harus di Isi',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (nama.length == 0) {
      ToastAndroid.show(
        'Nama Harus di Isi',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (noTlp.length == 0) {
      ToastAndroid.show(
        'No Telfon Harus di Isi',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (email.length == 0) {
      ToastAndroid.show(
        'Email Harus di Isi',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (checkEmail == null) {
      ToastAndroid.show(
        'Format Email Tidak Valid',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (pass.length == 0) {
      ToastAndroid.show(
        'Password Harus di Isi',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else if (pass !== rePass) {
      ToastAndroid.show(
        'Password Tidak Sama',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } else {
      const data = {
        nik: nik,
        nama: nama,
        noTlp: noTlp,
        email: email,
        pass: pass,
        rePass: rePass,
      };
      dispatch(saveUser(data));
      props.navigation.navigate('Foto');
    }
  };
  return (
    <Container>
      <Header style={styles.header} androidStatusBarColor="#373737">
        <Body style={{alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 19}}>Registrasi</Text>
        </Body>
      </Header>
      <Content style={styles.content}>
        <Form>
          <Item stackedLabel>
            <Label style={styles.text}>NIK</Label>
            <Input
              style={styles.text}
              onChangeText={r => setNik(r)}
              keyboardType="number-pad"
            />
          </Item>
          <Item stackedLabel>
            <Label style={styles.text}>Nama</Label>
            <Input
              onChangeText={r => setNama(r)}
              style={styles.text}
              textContentType="name"
            />
          </Item>
          <Item stackedLabel>
            <Label style={styles.text}>No Telfon</Label>
            <Input
              onChangeText={r => setNoTlp(r)}
              style={styles.text}
              textContentType="telephoneNumber"
              keyboardType="number-pad"
            />
          </Item>
          <Item stackedLabel>
            <Label style={styles.text}>Email</Label>
            <Input
              onChangeText={r => setEmail(r)}
              style={styles.text}
              textContentType="emailAddress"
              autoCapitalize="none"
            />
          </Item>
          <Item stackedLabel>
            <Label style={styles.text}>Password</Label>
            <Input
              onChangeText={r => setPass(r)}
              style={styles.text}
              textContentType="password"
              secureTextEntry
            />
          </Item>
          <Item stackedLabel>
            <Label style={styles.text}>Re-password</Label>
            <Input
              onChangeText={r => setRePass(r)}
              style={styles.text}
              textContentType="password"
              secureTextEntry
            />
          </Item>
        </Form>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => goFoto()}>
            <View style={styles.btnBox}>
              <Text style={styles.btn}>Registrasi</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#373737',
  },
  content: {
    backgroundColor: '#232323',
    paddingRight: 10,
    marginTop: 10,
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
  },
  btn: {
    color: '#3355ff',
  },
  errorT: {
    color: 'red',
    marginBottom: 10,
    paddingLeft: 10,
  },
});
export default Register;
