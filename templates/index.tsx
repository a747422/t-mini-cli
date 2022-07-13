import React from 'react';
import {  View } from '@ray-js/components';
import styles from './index.module.less';
import { Props } from './index.type';

const <%= name %>: React.FC<Props> = props => {

  return (
      <View className={styles.container}></View>
  );
};

export default <%= name %>;
