import React, {useRef, useState, useEffect, Fragment} from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {View, Icon} from 'native-base';
import RNFetchBlob from 'rn-fetch-blob';
import {RNCamera} from 'react-native-camera';
import ImageResizer from 'react-native-image-resizer';
import {useDispatch} from 'react-redux';
import {saveImg} from '../redux/action/user';

const {height, width} = Dimensions.get('window');

const Foto = props => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const [tmp, setTmp] = useState('');
  const [flash, setFlash] = useState('off');
  const [autoFocus, setAutoFocus] = useState('on');
  const [onCamera, setOnCamera] = useState(true);
  const [type, setType] = useState('back');
  const [permission, setPermission] = useState('undetermined');
  const cameraRef = useRef(null);

  const goDataDiri = () => {
    props.navigation.navigate('DataDiri');
    dispatch(saveImg(tmp.uri));
  };

  useEffect(() => {
    PermissionsAndroid.check('android.permission.CAMERA').then(response => {
      setPermission(response);
    });
  }, []);

  console.log(width / 3);
  

  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);

      const path = `${RNFetchBlob.fs.dirs.CacheDir}/test.png`;

      setUrl(data.uri);
      ImageResizer.createResizedImage(
        data.uri,
        150,
        150,
        'JPEG',
        100,
      )
        .then(uri => {
          setTmp(uri);
        })
        .catch(err => console.log(err));

      try {
        RNFetchBlob.fs.writeFile(path, data.base64, 'base64');
      } catch (err) {
        console.log(err.message);
      }
      setOnCamera(false);
    }
  };
  return (
    <View style={styles.container}>
      {onCamera ? (
        <RNCamera
          ref={cameraRef}
          type={type}
          flashMode={flash}
          autoFocus={autoFocus}
          style={{flex: 1}}
        />
      ) : (
        <Image source={{uri: url}} style={{flex: 1}} />
      )}

      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          justifyContent: onCamera ? 'space-around' : 'center',
        }}>
        {onCamera ? (
          <Fragment>
            <TouchableOpacity
              onPress={() => setFlash(flash == 'off' ? 'on' : 'off')}
              style={styles.flash}
              style={{
                borderRadius: 50,
                flex: 0,
                padding: 20,
                alignSelf: 'center',
                margin: 15,
                backgroundColor: flash == 'off' ? '#fff' : '#ffeb38',
              }}>
              <Icon
                type="Entypo"
                name="flashlight"
                style={{color: 'black', fontSize: 20}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={takePicture} style={styles.capture}>
              <Icon
                type="Entypo"
                name="camera"
                style={{color: 'black', fontSize: 20}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setType(type == 'back'? 'front':'back' )} style={styles.capture}>
              <Icon
                type="AntDesign"
                name="sync"
                style={{color: 'black', fontSize: 20}}
              />
            </TouchableOpacity>
          </Fragment>
        ) : (
          <Fragment>
            <TouchableOpacity
              onPress={() => setOnCamera(true)}
              style={styles.check}>
              <Icon
                type="AntDesign"
                name="close"
                style={{color: 'black', fontSize: 20}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goDataDiri()} style={styles.check}>
              <Icon
                type="AntDesign"
                name="check"
                style={{color: 'black', fontSize: 20}}
              />
            </TouchableOpacity>
          </Fragment>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  capture: {
    borderRadius: 50,
    flex: 0,
    backgroundColor: '#fff',
    padding: 20,
    alignSelf: 'center',
   
  },
  flash: {
    borderRadius: 50,
    flex: 0,

    padding: 20,
    alignSelf: 'center',
    margin: 15,
  },
  check: {
    borderRadius: 50,
    flex: 0,
    backgroundColor: '#fff',
    padding: 20,
    alignSelf: 'center',

    margin: 15,
  },
});

export default Foto;
