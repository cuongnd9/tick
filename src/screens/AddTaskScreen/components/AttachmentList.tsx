import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { thinid } from 'thinid';
import AttachmentButton from './AttachmentButton';
import AttachmentItem from './AtttachmentItem';

const AttachmentList: React.FC = () => {
  const [images, setImages] = useState([]);
  return (
    <View style={styles.container}>
      <AttachmentButton onGetImages={image => setImages([...images, image])} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={images}
        renderItem={({ item }: { item: any }) => <AttachmentItem uri={item} />}
        keyExtractor={_ => thinid()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  }
});

export default AttachmentList;
