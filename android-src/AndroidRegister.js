import React, { Component } from 'react';
import AndroidAppStyles from './AndroidAppStyles';
import AndroidRegisterForm from './AndroidRegisterForm';

const androidAppStyles = new AndroidAppStyles();

export default class AndroidRegister extends Component {

  constructor(props) {
    super(props);

    this.state = {
        form: {
            login: '',
            password: ''
        },
        styles: androidAppStyles.notifications()
    };
  };

  onLayout(){
    this.setState({ styles: androidAppStyles.notifications() });
  }

  render() {
    return (<AndroidRegisterForm navigation={this.props.navigation}/>);
  }
}

// const styles = androidAppStyles.notifications();