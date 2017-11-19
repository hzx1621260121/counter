/**
 * Created by Administrator on 2017/11/19 0019.
 */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions
  } from 'react-native';

export default class Item extends Component {
  render() {
    let itemStyles = this.props.styles ? [styles.item, this.props.styles] : styles.item;
    return (
      <View style={itemStyles}>
        <Text style={styles.text}>{this.props.num}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').width / 6,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});