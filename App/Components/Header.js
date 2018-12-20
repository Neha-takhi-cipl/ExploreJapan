import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/HeaderStyle'

const Header = ({children, style}) => <View style={styles.header}>{children}</View>;
export default Header
