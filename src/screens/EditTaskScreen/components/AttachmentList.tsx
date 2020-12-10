import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { diana } from 'diana-js';
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
    const newImages = [];
    const deleteImages = [];
    images.forEach(image => {
      if (!image.publicId) {
        newImages.push(image);
      }
    });
    const imageWithIds: string[] = images.map(image => image.id);
    initialValue
      .map(item => ({ id: item.id, image: item.image }))
      .forEach(item => {
        if (imageWithIds.indexOf(item.image.id) === -1) {
          deleteImages.push(item.id);
        }
      });
    onGetAttachments({
      newImages,
      deleteImages
    });
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
          setImages([...images, { id: diana(), url: image }]);
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
