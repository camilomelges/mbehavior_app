import React, { Component } from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator,
  Text,
  View,
  Switch,
  Picker,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import api from '../config/api';

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
  birth: yup
    .string()
    .label('Nascimento')
    .required('Campo obrigatório')
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
      sex: 'm',
      gender: 'm',
      civilState: 's',
      contry: 'brazil',
      familyIncome: '998',
      schooling: 'Sem escolaridade',
      ocupation: 'Autônomo',
      imLiving: 'alone'
    }

    console.log(api);
  };

  changeSelect = (type, value) => {    
    switch (type) {
      case 'sex':
          this.setState({ sex: value })
        break;
      case 'gender':
          this.setState({ gender: value })
        break;
      case 'civilState':
          this.setState({ civilState: value })
        break;
      case 'contry':
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
          this.setState({ imLiving: value })
        break;
    }
  }

  render() {
    return (
      <ScrollView style={{ marginTop: 20, flex: 1, width: '100%' }}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', width: '100%', paddingLeft: '5%', paddingRight: '5%' }}>
          <Formik
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              name: '',
              lastName: '',
              cpf: '',
              otherGender: '',
              birth: '',
              otherContry: '',
              otherLiving: '',
              agreeToTerms: false,
            }}
            onSubmit={(values, actions) => {
              signUp({ email: values.email })
                .then(() => {
                  alert(JSON.stringify({...values, ...this.state}));
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
                  label="Nome"
                  formikProps={formikProps}
                  formikKey="name"
                  placeholder="Nome"
                  autoFocus
                />

                <StyledInput
                  label="Iniciais do sobrenome"
                  formikProps={formikProps}
                  formikKey="lastName"
                  placeholder="Iniciais do sobrenome"
                />

                <StyledInput
                  label="CPF"
                  formikProps={formikProps}
                  formikKey="cpf"
                />

                {/* sexo */}
                <View style={{marginTop: 30}}>
                <Text>Sexo</Text>
                <View style={{ width: '100%', borderWidth: 1, borderColor: 'black' }}>
                  <Picker
                    selectedValue={this.state.sex}
                    style={{ width: '100%' }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.changeSelect('sex', itemValue)
                    }>
                    <Picker.Item label="Masculino" value='m'/>
                    <Picker.Item label="Feminino" value="f"/>
                  </Picker>
                </View>
                </View>

                {/* genero */}

                <View style={{marginTop: 30}}>
                  <Text>Gênero</Text>
                  <View style={{ width: '100%', borderWidth: 1, borderColor: 'black' }}>
                    <Picker
                      selectedValue={this.state.gender}
                      style={{ width: '100%' }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.changeSelect('gender', itemValue)
                      }>
                      <Picker.Item label="Masculino" value='m'/>
                      <Picker.Item label="Feminino" value="f"/>
                      <Picker.Item label="Transgênero" value='t'/>
                      <Picker.Item label="Outro" value='o'/>
                    </Picker>
                  </View>
                  <StyledInput
                    label="Qual gênero?"
                    style={{ width: '100%', borderBottomWidth: 1, marginTop: 10, borderBottomColor: 'black' }}
                    formikProps={formikProps}
                    formikKey="otherGender"
                    placeholder="Ex.: Binário"
                  />
                </View>

                <StyledInput
                  label="Nascimento"
                  formikProps={formikProps}
                  formikKey="birth"
                  placeholder="01/01/2010"
                />

                {/* estado civil */}

                <View style={{marginTop: 30}}>
                  <Text>Estado civil</Text>
                  <View style={{ width: '100%', borderWidth: 1, borderColor: 'black' }}>
                    <Picker
                      selectedValue={this.state.civilState}
                      style={{ width: '100%' }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.changeSelect('civilState', itemValue)
                      }>
                      <Picker.Item label="solteiro" value='s'/>
                      <Picker.Item label="casado" value="c"/>
                      <Picker.Item label="divorciado" value='d'/>
                      <Picker.Item label="viuvo" value='v'/>
                    </Picker>
                  </View>
                </View>

                {/* país */}

                <View style={{marginTop: 30}}>
                  <Text>Páis</Text>
                  <View style={{ width: '100%', borderWidth: 1, borderColor: 'black' }}>
                    <Picker
                      selectedValue={this.state.contry}
                      style={{ width: '100%' }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.changeSelect('contry', itemValue)
                      }>
                      <Picker.Item label="Brasil" value='brazil'/>
                      <Picker.Item label="Outro" value="outro"/>
                    </Picker>
                  </View>
                  <StyledInput
                    label="Qual país?"
                    style={{ width: '100%', borderBottomWidth: 1, marginTop: 10, borderBottomColor: 'black' }}
                    formikProps={formikProps}
                    formikKey="otherContry"
                    placeholder="Ex.: Espanha"
                  />
                </View>

                {/* endereço */}

                <StyledInput
                  label="Estado"
                  formikProps={formikProps}
                  formikKey="state"
                  placeholder="São Paulo"
                />

                <StyledInput
                  label="Cidade"
                  formikProps={formikProps}
                  formikKey="city"
                  placeholder="São Paulo"
                />

                <StyledInput
                  label="CEP"
                  formikProps={formikProps}
                  formikKey="zipcode"
                  placeholder="00000-000"
                />

                {/* renda familiar */}

                <View style={{marginTop: 30}}>
                  <Text>Renda Familiar</Text>
                  <View style={{ width: '100%', borderWidth: 1, borderColor: 'black' }}>
                    <Picker
                      selectedValue={this.state.familyIncome}
                      style={{ width: '100%' }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.changeSelect('familyIncome', itemValue)
                      }>
                      <Picker.Item label="Até R$ 998,00" value='998'/>
                      <Picker.Item label="999| até R$ 1996,00" value='999|1996'/>
                      <Picker.Item label="De R$ 1997,00 até R$ 3992,00" value='1997|3992'/>
                      <Picker.Item label="De R$ 3993,00 até R$ 6986,00" value='3993|6986'/>
                      <Picker.Item label="De R$ 6987,00 até R$ 9980,00" value='6987|9980'/>
                      <Picker.Item label="De R$ 9981,00 até R$ 14970,00" value='9981|14970'/>
                      <Picker.Item label="De R$ 14971,00 até R$ 19960,00" value='14971|19960'/>
                      <Picker.Item label="Mais de R$ 19961,00" value='19961'/>
                    </Picker>
                  </View>
                </View>

                {/* escolaridade */}

                <View style={{marginTop: 30}}>
                  <Text>Escolaridade</Text>
                  <View style={{ width: '100%', borderWidth: 1, borderColor: 'black' }}>
                    <Picker
                      selectedValue={this.state.schooling}
                      style={{ width: '100%' }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.changeSelect('schooling', itemValue)
                      }>
                      <Picker.Item label="Sem escolaridade" value='Sem escolaridade'/>
                      <Picker.Item label="Ensino Fundamental 1 – 1ª a 5ª (incompleto)" value='Ensino Fundamental 1 – 1ª a 5ª (incompleto)'/>
                      <Picker.Item label="Ensino Fundamental 1 – 1ª a 5ª (completo)" value='Ensino Fundamental 1 – 1ª a 5ª (completo)'/>
                      <Picker.Item label="Ensino Fundamental 2 – 6ª a 9ª (incompleto)" value='Ensino Fundamental 2 – 6ª a 9ª (incompleto)'/>
                      <Picker.Item label="Ensino Fundamental 2 – 6ª a 9ª (completo)" value='Ensino Fundamental 2 – 6ª a 9ª (completo)'/>
                      <Picker.Item label="Ensino Médio – 1º a 3º ano do 2º grau (incompleto)" value='Ensino Médio – 1º a 3º ano do 2º grau (incompleto)'/>
                      <Picker.Item label="Ensino Médio – 1º a 3º ano do 2º grau (completo)" value='Ensino Médio – 1º a 3º ano do 2º grau (completo)'/>
                      <Picker.Item label="Nível técnico/Tecnólogo (incompleto)" value='Nível técnico/Tecnólogo (incompleto)'/>
                      <Picker.Item label="Nível técnico/Tecnólogo (completo)" value='Nível técnico/Tecnólogo (completo)'/>
                      <Picker.Item label="Superior (incompleto)" value='Superior (incompleto)'/>
                      <Picker.Item label="Superior (completo)" value='Superior (completo)'/>
                      <Picker.Item label="Pós-graduação 1 – Especialização/Mestrado (incompleto)" value='Pós-graduação 1 – Especialização/Mestrado (incompleto)'/>
                      <Picker.Item label="Pós-graduação 1 – Especialização/Mestrado (completo)" value='Pós-graduação 1 – Especialização/Mestrado (completo)'/>
                      <Picker.Item label="Pós-graduação 2 – Doutorado (incompleto)" value='Pós-graduação 2 – Doutorado (incompleto)'/>
                      <Picker.Item label="Pós-graduação 2 – Doutorado (completo)" value='Pós-graduação 2 – Doutorado (completo)'/>
                    </Picker>
                  </View>
                </View>

                {/* Ocupação */}

                <View style={{marginTop: 30}}>
                  <Text>Ocupação</Text>
                  <View style={{ width: '100%', borderWidth: 1, borderColor: 'black' }}>
                    <Picker
                      selectedValue={this.state.ocupation}
                      style={{ width: '100%' }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.changeSelect('ocupation', itemValue)
                      }>
                      <Picker.Item label="Autônomo" value='Autônomo'/>
                      <Picker.Item label="Dona(o) de casa" value='Dona(o) de casa'/>
                      <Picker.Item label="Empresário/Comerciante" value='Empresário/Comerciante'/>
                      <Picker.Item label="Estudante/Universitário" value='Estudante/Universitário'/>
                      <Picker.Item label="Funcionário de empresa privada" value='Funcionário de empresa privada'/>
                      <Picker.Item label="Funcionário público" value='Funcionário público'/>
                      <Picker.Item label="Pensionista/Aposentado" value='Pensionista/Aposentado'/>
                      <Picker.Item label="Profissional liberal" value='Profissional liberal'/>
                      <Picker.Item label="Atualmente desempregado" value='Atualmente desempregado'/>
                    </Picker>
                  </View>
                </View>

                {/* eu moro */}

                <View style={{marginTop: 30}}>
                  <Text>Eu moro</Text>
                  <View style={{ width: '100%', borderWidth: 1, borderColor: 'black' }}>
                    <Picker
                      selectedValue={this.state.imLiving}
                      style={{ width: '100%' }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.changeSelect('imLiving', itemValue)
                      }>
                      <Picker.Item label="Sozinho(a)" value='alone'/>
                      <Picker.Item label="Com familiares" value='withFamiliars'/>
                      <Picker.Item label="Amigos" value='withFriends'/>
                      <Picker.Item label="Outro" value='other'/>
                    </Picker>
                  </View>
                  <StyledInput
                    label="Mora com quem?"
                    style={{ width: '100%', borderBottomWidth: 1, marginTop: 10, borderBottomColor: 'black' }}
                    formikProps={formikProps}
                    formikKey="otherLiving"
                    placeholder="Ex.: Pensionato"
                  />
                </View>

                <StyledInput
                  label="Email"
                  formikProps={formikProps}
                  formikKey="email"
                  placeholder="nome@email.com"
                />

                <StyledInput
                  label="Senha"
                  formikProps={formikProps}
                  formikKey="password"
                  placeholder="password"
                  secureTextEntry
                />

                <StyledInput
                  label="Confirmar Senha"
                  formikProps={formikProps}
                  formikKey="confirmPassword"
                  placeholder="confirm password"
                  secureTextEntry
                />

                <StyledSwitch
                  label="Aceite os termos"
                  formikKey="agreeToTerms"
                  formikProps={formikProps}
                />

                {formikProps.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                    <View>
                      <Button title="Submit" onPress={formikProps.handleSubmit} />
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
        reject(new Error("You playin' with that fake email address."));
      }
      resolve(true);
    }, 1000);
});