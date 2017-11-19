import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Alert,
  } from 'react-native';

import Item from './Item';
import ShowCounter from './ShowCounter';

export default class Main extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      numArr: [
        '1', '2', '3', 'clear',
        '4', '5', '6', 'delete',
        '7', '8', '9', '+',
        '.', '%', '0', '-',
        'x', '÷', '='
      ],
      showCounter: [
        {key: 'num', content: '0'}
      ]
    };

    this.buildBtn = this.buildBtn.bind(this);
    this.showResult = this.showResult.bind(this);
    this.touchBtn = this.touchBtn.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  /*运算的点击事件*/
  touchBtn(value) {
    let showCounter = this.state.showCounter;
    let prevOne = showCounter[showCounter.length - 1];

    if (value == 'clear') {
      this.setState({
        showCounter: [
          {key: 'num', content: '0'}
        ]
      });
    } else if (value == 'delete') {
      if (prevOne.key == 'num') {
        this.setState({
          showCounter: [
            ...showCounter.slice(0, showCounter.length - 1),
            {key: 'num', content: prevOne.content.slice(0, prevOne.content.length - 1) || '0'}
          ]
        });
      } else if (prevOne.key == 'result') {
        return;
      } else {
        this.setState({
          showCounter: [
            ...showCounter.slice(0, showCounter.length - 1)
          ]
        });
      }
    } else if (value == '+' || value == '-' || value == 'x' || value == '÷' || value == '%') {
      if (prevOne.key == 'num' || prevOne.key == 'result') {
        this.setState({
          showCounter: [
            ...showCounter,
            {key: '+', content: value}
          ]
        });
      } else {
        this.setState({
          showCounter: [
            ...showCounter.slice(0, showCounter.length - 1),
            {key: '+', content: value}
          ]
        });
      }
    } else if (value == '=') {

    } else {
      if (prevOne.key == 'num') {
        let content = '';
        if (value == '.') {
          content = prevOne.content + value;
        } else {
          content = Number.parseFloat(prevOne.content + value) + '';
        }

        this.setState({
          showCounter: [
            ...showCounter.slice(0, showCounter.length - 1),
            {key: 'num', content: content}
          ]
        });
      } else if (prevOne.key == '+') {
        let prevTwo = showCounter[showCounter.length - 2].content;
        let result = Number.parseFloat(prevTwo) + Number.parseFloat(value);
        this.setState({
          showCounter: [
            ...showCounter,
            {key: 'num', content: value + ''},
            {key: 'result', content: result + ''}
          ]
        });
      }else if(prevOne.key == '÷'){
        
      }

    }
  }

  /*创建按钮*/
  buildBtn() {
    return this.state.numArr.map((value, index)=> {
      if (value == '=') {
        let style = {
          width: Dimensions.get('window').width / 2,
          backgroundColor: '#ff8c00'
        };
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.6}
            onPress={this.touchBtn.bind(this,value)}
            >
            <Item num={value} styles={style}/>
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.6}
            onPress={this.touchBtn.bind(this,value)}
            >
            <Item num={value}/>
          </TouchableOpacity>
        )
      }
    });
  }

  /*显示运算经过*/
  showResult() {
    return this.state.showCounter.map((item, index)=> {
      return (
        <ShowCounter
          item={item}
          index={index}
          key={index}
          ></ShowCounter>
      )
    });
  }

  componentDidMount() {
    //this.scrollView.scrollToEnd();
  }

  componentDidUpdate() {
    //this.scrollView.scrollToEnd();
  }

  render() {
    return (
      <View style={styles.app}>
        <ScrollView
          style={styles.show}
          ref={(node)=>{this.scrollView=node}}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={()=>{this.scrollView.scrollToEnd({animated:false})}}
          >
          {this.showResult()}
        </ScrollView>
        <View style={styles.body}>
          {this.buildBtn()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff'

  },
  show: {
    flex: 1
  },
  body: {
    backgroundColor: '#ddd',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});