/**
 * Created by Administrator on 2017/11/19 0019.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
  } from 'react-native';

export default class ShowCounter extends Component {
  render() {
    return (
      <View style={this.props.item.key === 'result' ?[styles.item,{backgroundColor: '#e0ffff'}]:styles.item}>
        <Text style={styles.text1}>step : {this.props.index}</Text>
        <Text style={styles.text2}>
          {this.props.item.key === 'result' ?' = ':''}
          {this.props.item.content}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    borderStyle: 'dotted',
    alignSelf:'flex-end'
  },
  text1: {
    width: 100,
    paddingLeft: 10
  },
  text2: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 20,
    fontSize:30
  }
});