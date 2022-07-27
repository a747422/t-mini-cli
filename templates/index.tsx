import React,{FC} from 'react';
import {  View } from '@ray-js/components';
import styles from './index.module.less';
import { Props } from './index.type';

const <%= name.split('-').map(item => item.charAt(0).toUpperCase() + item.substr(1, item.length)).join('') %>: FC<Props> = props => {

  return (
      <View className={styles.container}></View>
  );
};

export default <%= name.split('-').map(item => item.charAt(0).toUpperCase() + item.substr(1, item.length)).join('') %>;
