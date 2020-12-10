import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { diana } from 'diana-js';
import AttachmentButton from './AttachmentButton';
import AttachmentItem from './AtttachmentItem';

interface Props {
  onGetAttachments?: Function;
  reset?: boolean;
}

const AttachmentList: React.FC<Props> = ({ onGetAttachments, reset }) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    onGetAttachments(images.map(image => image.uri));
  }, [images]);
  useEffect(() => {
    setImages([]);
  }, [reset]);
  const handleRemoveItem = (id: string) => {
    setImages(images.filter(image => image.id !== id));
  };
  return (
    <View style={styles.container}>
      <AttachmentButton
        onGetImages={image => {
          setImages([...images, { id: diana(), uri: image }]);
        }}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={images}
        renderItem={({ item }: { item: any }) => (
          <AttachmentItem
            uri={item.uri}
            id={item.id}
            onRemove={handleRemoveItem}
          />
        )}
        keyExtractor={_ => diana()}
      />
    </View>
  );
};

AttachmentList.defaultProps = {
  onGetAttachments: () => {},
  reset: false
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  }
});

export default AttachmentList;
