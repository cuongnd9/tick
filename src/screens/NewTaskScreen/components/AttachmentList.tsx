import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { thinid } from 'thinid';
import AttachmentButton from './AttachmentButton';
import AttachmentItem from './AtttachmentItem';

interface Props {
  onGetAttachments?: Function
}

const AttachmentList: React.FC<Props> = ({ onGetAttachments }) => {
  const [images, setImages] = useState([]);
  return (
    <View style={styles.container}>
      <AttachmentButton onGetImages={image => {
        setImages([...images, image]);
        onGetAttachments([...images, image]);
      }} />
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

AttachmentList.defaultProps = {
  onGetAttachments: () => {}
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  }
});

export default AttachmentList;
