import React, { useState } from 'react';
import { Image, View } from 'react-native';
import AttachmentButton from './AttachmentButton';

const AttachmentList: React.FC = () => {
  const [images, setImages] = useState([]);
  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      <AttachmentButton onGetImages={image => setImages([...images, image])} />
      {images.length > 0 &&
        images.map(image => {
          console.log(image, 'this is image');
          return (
            <Image
              key={new Date().getTime()}
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          );
        })}
    </View>
  );
};

export default AttachmentList;
