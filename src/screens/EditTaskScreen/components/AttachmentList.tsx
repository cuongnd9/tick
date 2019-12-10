import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { thinid } from 'thinid';
import AttachmentButton from './AttachmentButton';
import AttachmentItem from './AtttachmentItem';

interface Props {
  onGetAttachments?: Function;
  reset?: boolean;
  initialValue: any;
}

const AttachmentList: React.FC<Props> = ({
  initialValue,
  onGetAttachments,
  reset
}) => {
  const [images, setImages] = useState(initialValue.map(item => item.image));
  useEffect(() => {
    onGetAttachments(images.map(image => image.url));
  }, [images]);
  useEffect(() => {
    setImages(initialValue.map(item => item.image));
  }, [reset]);
  const handleRemoveItem = (id: string) => {
    setImages(images.filter(image => image.id !== id));
  };
  return (
    <View style={styles.container}>
      <AttachmentButton
        onGetImages={image => {
          setImages([...images, { id: thinid(), url: image }]);
        }}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={images}
        renderItem={({ item }: { item: any }) => (
          <AttachmentItem
            uri={item.url}
            id={item.id}
            onRemove={handleRemoveItem}
          />
        )}
        keyExtractor={_ => thinid()}
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
