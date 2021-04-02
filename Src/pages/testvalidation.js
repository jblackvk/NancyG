import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {TextInput} from 'react-native-paper';

export default class InputText extends React.Component {
  state = {
    isValid: null,
  };

  render() {
    const { isValid } = this.state;
    console.log('isValid', isValid);

    return (
      <View style={styles.container}>
        <Text>TextInput validation using RegEx rules</Text>
        <TextInput
          label="Password"
          mode={'outlined'}
          style={styles.input}
          pattern={[
            '^.{8,}$', // min 8 chars
            '(?=.*\\d)', // number required
            '(?=.*[A-Z])', // uppercase letter
          ]}
          onValidation={isValid => this.setState({ isValid })}
        />
        <View>
          <Text style={{ color: isValid && isValid[0] ? 'green' : 'red' }}>
            Rule 1: min 8 chars
          </Text>
          <Text style={{ color: isValid && isValid[1] ? 'green' : 'red' }}>
            Rule 2: number required
          </Text>
          <Text style={{ color: isValid && isValid[2] ? 'green' : 'red' }}>
            Rule 3: uppercase letter
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  input: {
    height: 48,
    width: '80%',
    padding: 8,
    margin: 16,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
  },
});
