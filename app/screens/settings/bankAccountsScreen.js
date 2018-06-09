import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
} from './../../redux/actions';

import { standardizeString } from './../../util/general';

import Header from './../../components/header';
import { Output, Input, InputContainer } from './../../components/common';
import CardList from './../../components/CardList';

class BankAccountsScreen extends Component {
  static navigationOptions = {
    title: 'Bank accounts',
  };

  renderContent = item => {
    const { viewStyleContent } = styles;
    const {
      bank_name,
      bank_code,
      branch_code,
      type,
      number,
      swift,
      iban,
      bic,
    } = item;
    return (
      <View style={viewStyleContent}>
        {bank_name ? <Output label="Bank name" value={bank_name} /> : null}
        {bank_code ? <Output label="Bank code" value={bank_code} /> : null}
        {branch_code ? (
          <Output label="Branch name" value={branch_code} />
        ) : null}
        {type ? <Output label="Type" value={type} /> : null}
        {number ? <Output label="Number" value={number} /> : null}
        {swift ? <Output label="Swift" value={swift} /> : null}
        {iban ? <Output label="IBAN" value={iban} /> : null}
        {bic ? <Output label="BIC" value={bic} /> : null}
      </View>
    );
  };

  renderDetail = () => {
    const { temp_bank_account, updateError, updateInputField } = this.props;
    const {
      name,
      number,
      type,
      bank_name,
      bank_code,
      branch_code,
      swift,
      iban,
      bic,
    } = temp_bank_account;

    return (
      <View>
        <Input
          label="Account holder"
          placeholder="e.g. John Snow"
          autoCapitalize="none"
          value={name}
          inputError={updateError}
          onChangeText={input =>
            updateInputField('bank_account', 'name', input)
          }
        />
        <Input
          label="Account number"
          placeholder="e.g. 4083764677"
          autoCapitalize="none"
          value={number}
          onChangeText={input =>
            updateInputField('bank_account', 'number', input)
          }
        />
        <Input
          label="Account type"
          placeholder="e.g. Cheque account"
          autoCapitalize="none"
          value={type}
          onChangeText={input =>
            updateInputField('bank_account', 'type', input)
          }
        />
        <Input
          label="Bank name"
          placeholder="e.g. Bank of World"
          autoCapitalize="none"
          value={bank_name}
          onChangeText={input =>
            updateInputField('bank_account', 'bank_name', input)
          }
        />
        <Input
          label="Bank code"
          placeholder="e.g. 12324"
          autoCapitalize="none"
          value={bank_code}
          onChangeText={input =>
            updateInputField('bank_account', 'bank_code', input)
          }
        />
        <Input
          label="Branch code"
          placeholder="e.g. 46589"
          autoCapitalize="none"
          value={branch_code}
          onChangeText={input =>
            updateInputField('bank_account', 'branch_code', input)
          }
        />
        <Input
          label="Swift code"
          placeholder="Usually 8 or 11 characters"
          autoCapitalize="none"
          value={swift}
          onChangeText={input =>
            updateInputField('bank_account', 'swift', input)
          }
        />
        <Input
          label="IBAN number"
          placeholder="34 alphanumeric characters"
          autoCapitalize="none"
          value={iban}
          onChangeText={input =>
            updateInputField('bank_account', 'iban', input)
          }
        />
        <Input
          label="BIC number"
          placeholder="Usually 8 or 11 characters"
          autoCapitalize="none"
          value={bic}
          onChangeText={input => updateInputField('bank_account', 'bic', input)}
        />
      </View>
    );
    // }
    return;
  };

  render() {
    const {
      bank_account,
      loading_bank_account,
      temp_bank_account,
      newItem,
      updateItem,
      showDetail,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Bank accounts"
          headerRightIcon={showDetail ? 'done' : 'add'}
          headerRightOnPress={
            showDetail
              ? () => updateItem('bank_account', temp_bank_account)
              : () => newItem('bank_account')
          }
        />
        <CardList
          type="bank_account"
          data={bank_account}
          tempItem={temp_bank_account}
          loadingData={loading_bank_account}
          identifier="bank_name"
          renderContent={this.renderContent}
          renderDetail={this.renderDetail}
          emptyListMessage="No bank accounts added yet"
          canDelete
          canEdit
        />
      </View>
    );
  }
}

const styles = {
  viewStyleContent: {
    padding: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
};

const mapStateToProps = ({ user }) => {
  const {
    bank_account,
    loading_bank_account,
    temp_bank_account,
    showDetail,
  } = user;
  return {
    bank_account,
    loading_bank_account,
    temp_bank_account,
    showDetail,
  };
};

export default connect(mapStateToProps, {
  fetchData,
  newItem,
  editItem,
  updateItem,
  deleteItem,
  updateInputField,
})(BankAccountsScreen);
