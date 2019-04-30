import React, { Component } from 'react';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DeviceInfo from 'react-native-device-info';
import {
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator,
  Text,
  View,
  Alert,
  Switch,
  Picker,
  ScrollView,
  NetInfo,
  Keyboard
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { api } from '../config/api';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .label('Nome')
    .required('Campo obrigatório')
    .matches(/^[a-zA-Z]/, 'Apenas letras')
    .max(25, 'O primeiro nome apenas, no máximo de 25 letras'),
  lastName: yup
    .string()
    .label('Iniciais do sobrenome')
    .required('Campo obrigatório')
    .matches(/^[a-zA-Z]/, 'Apenas letras')
    .max(25, 'A primeira letra de cada sobrenome apenas, no máximo de 25 letras'),
  cpf: yup
    .string()
    .label('CPF')
    .required('Campo obrigatório')
    .matches(/^[0-9]{11}/, 'Informe apenas os dígitos')
    .min(11, 'O cpf deve conter exatamente 11 dígitos')
    .max(11, 'O cpf deve conter exatamente 11 dígitos'),
  birthdate: yup
    .string()
    .required()
    .label('Nascimento')
    .matches(/^[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}$/, 'A data deve seguir o formato ex.: 01/01/2010')
    .min(10, 'A data deve seguir o formato ex.: 01/01/2010')
    .max(10, 'A data deve seguir o formato ex.: 01/01/2010'),
  otherGender: yup
    .string()
    .label('Qual gênero?')
    .required('Campo obrigatório')
    .matches(/^[a-zA-Z]/, 'Apenas letras')
    .min(3, 'No mínimo 3 letras')
    .max(50, 'No máximo 50 letras'),
  otherContry: yup
    .string()
    .label('Qual país?')
    .required('Campo obrigatório')
    .matches(/^[a-zA-Z]/, 'Apenas letras')
    .min(3, 'No mínimo 3 letras')
    .max(50, 'No máximo 50 letras'),
  otherLiving: yup
    .string()
    .label('Mora com quem?')
    .required('Campo obrigatório')
    .matches(/^[a-zA-Z0-9]/, 'Apenas letras e números')
    .min(3, 'No mínimo 3 letras')
    .max(50, 'No máximo 50 letras'),
  email: yup
    .string()
    .label('Email')
    .email('E-mail incorreto')
    .required('Campo obrigatório'),
  password: yup
    .string()
    .label('Senha')
    .required('Campo obrigatório')
    .min(6, 'Sua senha deve ter no mínimo 6 dígitos')
    .max(50, 'Sua senha deve ter no máximo 50 dígitos'),
  confirmPassword: yup
    .string()
    .required('Campo obrigatório')
    .label('Confirmar Senha')
    .test('passwords-match', 'As senhas devem ser iguais', function (value) {
      return this.parent.password === value;
    }),
  agreeToTerms: yup
    .boolean()
    .label('Aceite os termos')
    .test(
      'is-true',
      'Aceite os termos para continuar',
      value => value === true
    ),
});

export default class AndroidRegisterForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sex: 'masculino',
      gender: 'masculino',
      civilState: 'solteiro',
      contry: 'brasil',
      familyIncome: '998',
      schooling: 'sem_escolaridade',
      ocupation: 'autonomo',
      imLiving: 'sozinho',
      isDateTimePickerVisible: false,
      showOtherGender: false,
      showOtherContry: false,
      showOtherLiving: false,
      birthdate: '',
      apiLevel: DeviceInfo.getAPILevel(),
      appName: DeviceInfo.getApplicationName(),
      phoneBrand: DeviceInfo.getBrand(),
      phoneCarrier: DeviceInfo.getCarrier(),
      phoneModel: DeviceInfo.getModel(),
      phoneNumber: DeviceInfo.getPhoneNumber(),
      phoneManufacturer: DeviceInfo.getManufacturer(),
      systemName: DeviceInfo.getSystemName(),
      systemVersion: DeviceInfo.getSystemVersion(),
      timezone: DeviceInfo.getTimezone(),
      batteryLevel: 0,
      ip: '255.255.255.255',
      userAgent: DeviceInfo.getUserAgent(),
      isEmulator: DeviceInfo.isEmulator(),
      isTablet: DeviceInfo.isTablet(),
      deviceType: DeviceInfo.getDeviceType(),
      full_metal_app_token: 'NãoTemComoAdivinharEsseToken',
      connectionInfo: {
        type: '',
        effectiveType: ''
      }
    }
    DeviceInfo.getIPAddress().then(ip => {
      this.setState({ ip });
    });
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      this.setState({ connectionInfo });
    });

    console.log('api', api);
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
    Keyboard.dismiss();
  };

  _handleDatePicked = (date, formikProps) => {
    const birthdate = moment(date).format('DD/MM/YYYY')
    this.setState({ birthdate: date });
    formikProps.setFieldValue('birthdate', birthdate);
    this._hideDateTimePicker();
  };

  changeSelect = (type, value) => {
    switch (type) {
      case 'sex':
        this.setState({ sex: value })
        break;
      case 'gender':
        value !== 'outro' ? this.setState({ showOtherGender: false }) : this.setState({ showOtherGender: true });
        this.setState({ gender: value })
        break;
      case 'civilState':
        this.setState({ civilState: value })
        break;
      case 'contry':
        value !== 'outro' ? this.setState({ showOtherContry: false }) : this.setState({ showOtherContry: true });
        this.setState({ contry: value })
        break;
      case 'familyIncome':
        this.setState({ familyIncome: value })
        break;
      case 'schooling':
        this.setState({ schooling: value })
        break;
      case 'ocupation':
        this.setState({ ocupation: value })
        break;
      case 'imLiving':
        value !== 'outro' ? this.setState({ showOtherLiving: false }) : this.setState({ showOtherLiving: true });
        this.setState({ imLiving: value })
        break;
    }
  }

   userRegister = async (registerData) => {
    return fetch('http://10.0.3.2:8765/users/register-api-app.json', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: registerData
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (!responseJson.ok) {
        console.log(this.state.birthdate);
        Alert.alert(responseJson.message);
      }
    })
    .catch((error) => {
      alert(error);
    });
  }

  render() {
    const { birthdate } = this.state;
    return (
      <ScrollView style={{ marginTop: 20, flex: 1, width: '100%' }}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', width: '100%', paddingLeft: '5%', paddingRight: '5%' }}>
          <Formik
            initialValues={{
              email: 'teste@teste.com',
              password: 'testee',
              confirmPassword: 'testee',
              name: 'teste',
              lastName: 'teste',
              cpf: '05055573120',
              birthdate: '',
              city: 'teste',
              state: 'teste',
              zipCode: '79052070',
              otherGender: 'vazio',
              otherContry: 'vazio',
              otherLiving: 'vazio',
              agreeToTerms: false,
            }}
            onSubmit={(values, actions) => {
              signUp({ email: values.email })
                .then(() => {
                  const registerData = JSON.stringify({ ...values, ...this.state });
                  return this.userRegister(registerData);
                })
                .catch(err => {
                  actions.setFieldError('general', err.message);
                })
                .finally(() => {
                  actions.setSubmitting(false);
                });
            }}
            validationSchema={validationSchema}
          >
            {formikProps => (
              <View>
                <StyledInput
                  label='Nome'
                  formikProps={formikProps}
                  formikKey='name'
                  value={formikProps.values['name']}
                  placeholder='Nome'
                />

                <StyledInput
                  label='Iniciais do sobrenome'
                  formikProps={formikProps}
                  formikKey='lastName'
                  value={formikProps.values['lastName']}
                  placeholder='Iniciais do sobrenome'
                />

                <StyledInput
                  label='CPF'
                  formikProps={formikProps}
                  formikKey='cpf'
                  value={formikProps.values['cpf']}
                />

                {/* sexo */}
                <View style={{ marginTop: 30 }}>
                  <Text>Sexo</Text>
                  <View style={{ width: '100%', borderWidth: 1, borderColor: 'black' }}>
                    <Picker
                      selectedValue={this.state.sex}
                      style={{ width: '100%' }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.changeSelect('sex', itemValue)
                      }>
                      <Picker.Item label='Masculino' value='masculino' />
                      <Picker.Item label='Feminino' value='feminino' />
                    </Picker>
                  </View>
                </View>

                {/* genero */}

                <View style={{ marginTop: 30 }}>
                  <Text>Gênero</Text>
                  <View style={{ width: '100%', borderWidth: 1, borderColor: 'black' }}>
                    <Picker
                      selectedValue={this.state.gender}
                      style={{ width: '100%' }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.changeSelect('gender', itemValue)
                      }>
                      <Picker.Item label='Masculino' value='masculino' />
                      <Picker.Item label='Feminino' value='feminino' />
                      <Picker.Item label='Transgênero' value='transgenero' />
                      <Picker.Item label='Outro' value='outro' />
                    </Picker>
                  </View>
                  {this.state.showOtherGender ?
                    <StyledInput
                      label='Qual gênero?'
                      style={{ width: '100%', borderBottomWidth: 1, marginTop: 10, borderBottomColor: 'black' }}
                      formikProps={formikProps}
                      formikKey='otherGender'
                      placeholder='Ex.: Binário'
                    />
                    : null}
                </View>

                <StyledInput
                  label='Nascimento'
                  formikProps={formikProps}
                  formikKey='birthdate'
                  placeholder='01/01/2010'
                  value={this.state.birthdate != '' ? moment(birthdate).format('DD/MM/YYYY') : ''}
                  onFocus={this._showDateTimePicker}
                />
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={(date) => this._handleDatePicked(date, formikProps)}
                  onCancel={this._hideDateTimePicker}
                />

                {/* estado civil */}

                <View style={{ marginTop: 30 }}>
                  <Text>Estado civil</Text>
                  <View style={{ width: '100%', borderWidth: 1, borderColor: 'black' }}>
                    <Picker
                      selectedValue={this.state.civilState}
                      style={{ width: '100%' }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.changeSelect('civilState', itemValue)
                      }>
                      <Picker.Item label='solteiro' value='solteiro' />
                      <Picker.Item label='casado' value='casado' />
                      <Picker.Item label='divorciado' value='divorciado' />
                      <Picker.Item label='viuvo' value='viuvo' />
                    </Picker>
                  </View>
                </View>

                {/* país */}

                <View style={{ marginTop: 30 }}>
                  <Text>Páis</Text>
                  <View style={{ width: '100%', borderWidth: 1, borderColor: 'black' }}>
                    <Picker
                      selectedValue={this.state.contry}
                      style={{ width: '100%' }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.changeSelect('contry', itemValue)
                      }>
                      <Picker.Item label='Brasil' value='brasil' />
                      <Picker.Item label='Outro' value='outro' />
                    </Picker>
                  </View>
                  {this.state.showOtherContry ?
                    <StyledInput
                      label='Qual país?'
                      style={{ width: '100%', borderBottomWidth: 1, marginTop: 10, borderBottomColor: 'black' }}
                      formikProps={formikProps}
                      formikKey='otherContry'
                      placeholder='Ex.: Espanha'
                    />
                    : null}
                </View>

                {/* endereço */}

                <StyledInput
                  label='Estado'
                  formikProps={formikProps}
                  formikKey='state'
                  value={formikProps.values['state']}
                  placeholder='São Paulo'
                />

                <StyledInput
                  label='Cidade'
                  formikProps={formikProps}
                  formikKey='city'
                  value={formikProps.values['city']}
                  placeholder='São Paulo'
                />

                <StyledInput
                  label='CEP'
                  formikProps={formikProps}
                  formikKey='zipCode'
                  value={formikProps.values['zipCode']}
                  placeholder='00000-000'
                />

                {/* renda familiar */}

                <View style={{ marginTop: 30 }}>
                  <Text>Renda Familiar</Text>
                  <View style={{ width: '100%', borderWidth: 1, borderColor: 'black' }}>
                    <Picker
                      selectedValue={this.state.familyIncome}
                      style={{ width: '100%' }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.changeSelect('familyIncome', itemValue)
                      }>
                      <Picker.Item label='Até R$ 998,00' value='998' />
                      <Picker.Item label='999| até R$ 1996,00' value='999_1996' />
                      <Picker.Item label='De R$ 1997,00 até R$ 3992,00' value='1997_3992' />
                      <Picker.Item label='De R$ 3993,00 até R$ 6986,00' value='3993_6986' />
                      <Picker.Item label='De R$ 6987,00 até R$ 9980,00' value='6987_9980' />
                      <Picker.Item label='De R$ 9981,00 até R$ 14970,00' value='9981_14970' />
                      <Picker.Item label='De R$ 14971,00 até R$ 19960,00' value='14971_19960' />
                      <Picker.Item label='Mais de R$ 19961,00' value='19961' />
                    </Picker>
                  </View>
                </View>

                {/* escolaridade */}

                <View style={{ marginTop: 30 }}>
                  <Text>Escolaridade</Text>
                  <View style={{ width: '100%', borderWidth: 1, borderColor: 'black' }}>
                    <Picker
                      selectedValue={this.state.schooling}
                      style={{ width: '100%' }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.changeSelect('schooling', itemValue)
                      }>
                      <Picker.Item label='Sem escolaridade' value='Sem escolaridade' />
                      <Picker.Item label='Ensino Fundamental 1 – 1ª a 5ª (incompleto)' value='fundamental1_incompleto)' />
                      <Picker.Item label='Ensino Fundamental 1 – 1ª a 5ª (completo)' value='fundamental1_completo)' />
                      <Picker.Item label='Ensino Fundamental 2 – 6ª a 9ª (incompleto)' value='fundamental2_incompleto)' />
                      <Picker.Item label='Ensino Fundamental 2 – 6ª a 9ª (completo)' value='fundamental2_completo)' />
                      <Picker.Item label='Ensino Médio – 1º a 3º ano do 2º grau (incompleto)' value='medio_incompleto)' />
                      <Picker.Item label='Ensino Médio – 1º a 3º ano do 2º grau (completo)' value='medio_completo)' />
                      <Picker.Item label='Nível técnico/Tecnólogo (incompleto)' value='tecnico_tecnologo_incompleto)' />
                      <Picker.Item label='Nível técnico/Tecnólogo (completo)' value='tecnico_tecnologo_completo)' />
                      <Picker.Item label='Superior (incompleto)' value='superior_incompleto)' />
                      <Picker.Item label='Superior (completo)' value='superior_completo)' />
                      <Picker.Item label='Pós-graduação 1 – Especialização/Mestrado (incompleto)' value='pos_graduação1_mestrado_incompleto)' />
                      <Picker.Item label='Pós-graduação 1 – Especialização/Mestrado (completo)' value='pos_graduação1_mestrado_completo)' />
                      <Picker.Item label='Pós-graduação 2 – Doutorado (incompleto)' value='pos_graduação2_doutorado_incompleto)' />
                      <Picker.Item label='Pós-graduação 2 – Doutorado (completo)' value='pos_graduação2_doutorado_completo)' />
                    </Picker>
                  </View>
                </View>

                {/* Ocupação */}

                <View style={{ marginTop: 30 }}>
                  <Text>Ocupação</Text>
                  <View style={{ width: '100%', borderWidth: 1, borderColor: 'black' }}>
                    <Picker
                      selectedValue={this.state.ocupation}
                      style={{ width: '100%' }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.changeSelect('ocupation', itemValue)
                      }>
                      <Picker.Item label='Autônomo' value='autonomo' />
                      <Picker.Item label='Dona(o) de casa' value='dona_de_casa' />
                      <Picker.Item label='Empresário/Comerciante' value='empresario_comerciante' />
                      <Picker.Item label='Estudante/Universitário' value='estudante_universitario' />
                      <Picker.Item label='Funcionário de empresa privada' value='funcionario_privado' />
                      <Picker.Item label='Funcionário público' value='funcionario_publico' />
                      <Picker.Item label='Pensionista/Aposentado' value='pensionista_aposentado' />
                      <Picker.Item label='Profissional liberal' value='profissional_liberal' />
                      <Picker.Item label='Atualmente desempregado' value='atualmente_desempregado' />
                    </Picker>
                  </View>
                </View>

                {/* eu moro */}

                <View style={{ marginTop: 30 }}>
                  <Text>Eu moro</Text>
                  <View style={{ width: '100%', borderWidth: 1, borderColor: 'black' }}>
                    <Picker
                      selectedValue={this.state.imLiving}
                      style={{ width: '100%' }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.changeSelect('imLiving', itemValue)
                      }>
                      <Picker.Item label='Sozinho(a)' value='sozinho' />
                      <Picker.Item label='Com familiares' value='familiares' />
                      <Picker.Item label='Amigos' value='amigos' />
                      <Picker.Item label='Outro' value='outro' />
                    </Picker>
                  </View>
                  {
                    this.state.showOtherLiving ?
                      <StyledInput
                        label='Mora com quem?'
                        style={{ width: '100%', borderBottomWidth: 1, marginTop: 10, borderBottomColor: 'black' }}
                        formikProps={formikProps}
                        formikKey='otherLiving'
                        placeholder='Ex.: Pensionato'
                      />
                      : null
                  }
                </View>

                <StyledInput
                  label='Email'
                  formikProps={formikProps}
                  formikKey='email'
                  value={formikProps.values['email']}
                  placeholder='nome@email.com'
                />

                <StyledInput
                  label='Senha'
                  formikProps={formikProps}
                  formikKey='password'
                  placeholder='password'
                  value={formikProps.values['password']}
                  secureTextEntry
                />

                <StyledInput
                  label='Confirmar Senha'
                  formikProps={formikProps}
                  formikKey='confirmPassword'
                  value={formikProps.values['confirmPassword']}
                  placeholder='confirm password'
                  secureTextEntry
                />

                <StyledSwitch
                  label='Aceite os termos'
                  formikKey='agreeToTerms'
                  formikProps={formikProps}
                />

                {formikProps.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                    <View>
                      <Button title='Submit' onPress={formikProps.handleSubmit} />
                      <Text style={{ color: 'red' }}>{formikProps.errors.general}</Text>
                    </View>
                  )}
              </View>
            )}
          </Formik>
        </SafeAreaView>
      </ScrollView >
    );
  }
}

const FieldWrapper = ({ children, label, formikProps, formikKey }) => (
  <View style={{ marginVertical: 5 }}>
    <Text style={{ marginTop: 3 }}>{label}</Text>
    {children}
    <Text style={{ color: 'red' }}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);

const StyledInput = ({ label, formikProps, formikKey, ...rest }) => {
  const inputStyles = {
    borderWidth: 1,
    width: '100%',
    borderColor: 'black',
    marginTop: 3,
  };

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }

  return (
    <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={inputStyles}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};

const StyledSwitch = ({ formikKey, formikProps, label, ...rest }) => (
  <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
    <Switch
      value={formikProps.values[formikKey]}
      onValueChange={value => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
  </FieldWrapper>
);

const signUp = ({ email }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'a@a.com') {
        reject(new Error('You playin with that fake email address.'));
      }
      resolve(true);
    }, 1000);
  });