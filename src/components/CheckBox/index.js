import React, { Component } from 'react';
import { Input, Select, Form, Button, DatePicker, Checkbox } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

const mapPropsToFields = props => {
  const { fields, searchList } = props;
  if (fields) {
    const formFileds = {};
    Object.keys(fields).forEach(item => {
      formFileds[item] = Form.createFormField({ value: fields[item] });
    });
    searchList.forEach(item => {
      if (item.type === 'DATE') {
        formFileds[item.key] = Form.createFormField({ value: moment(fields[item.key]) });
      } else if (item.type === 'RANGEDATE') {
        if (item.key === 'audit_date') {
          if (fields.audit_start_date && fields.audit_end_date) {
            formFileds[item.key] = Form.createFormField({
              value: [moment(fields.audit_start_date), moment(fields.audit_end_date)],
            });
          }
        } else if (item.key === 'create_date') {
          if (fields.create_start_date && fields.create_end_date) {
            formFileds[item.key] = Form.createFormField({
              value: [moment(fields.create_start_date), moment(fields.create_end_date)],
            });
          }
        }
      }
    });
    return formFileds;
  }
  return {};
};
@Form.create({ mapPropsToFields })
export default class CheckBox extends Component {
  handleReset = () => {
    if (this.props.searchReset) {
      this.props.searchReset();
    } else {
      this.props.form.resetFields();
    }
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      Object.entries(values).forEach(([k, v]) => {
        if (typeof v === 'string') {
          values[k] = v.trim();
        }
      });
      this.props.searchSumbit(values);
    });
  };

  initFormList = () => {
    const { getFieldDecorator } = this.props.form;
    const { searchList } = this.props;
    const formItemList = [];
    if (searchList && searchList.length > 0) {
      searchList.forEach(item => {
        const {
          name,
          key,
          params,
          placeholder,
          options = [],
          width = '120px',
          onSelect,
          onSearch,
        } = item;
        let itemObj = null;
        switch (item.type) {
          case 'INPUT':
            itemObj = (
              <FormItem label={name} key={key}>
                {getFieldDecorator(key, { ...params })(
                  <Input style={{ width }} placeholder={placeholder} />,
                )}
              </FormItem>
            );
            break;
          case 'SELECT':
            itemObj = (
              <FormItem label={name} key={key}>
                {getFieldDecorator(key, { ...params })(
                  <Select style={{ width }} placeholder={placeholder} onSelect={onSelect}>
                    {options.map(select => (
                      <Option value={select.id} key={select.id}>
                        {select.name}
                      </Option>
                    ))}
                  </Select>,
                )}
              </FormItem>
            );
            break;
          case 'SEARCHSELECT':
            itemObj = (
              <FormItem label={name} key={key}>
                {getFieldDecorator(key, { ...params })(
                  <Select
                    style={{ width }}
                    placeholder={placeholder}
                    onSelect={onSelect}
                    showSearch
                    filterOption={false}
                    onSearch={onSearch}
                  >
                    {options.map(select => (
                      <Option value={select.id} key={select.id}>
                        {select.name}
                      </Option>
                    ))}
                  </Select>,
                )}
              </FormItem>
            );
            break;
          case 'DATE':
            itemObj = (
              <FormItem label={name} key={key}>
                {getFieldDecorator(key, { ...params })(
                  <DatePicker style={{ width, display: 'inline-block' }} />,
                )}
              </FormItem>
            );
            break;
          case 'RANGEDATE':
            itemObj = (
              <FormItem label={name} key={key}>
                {getFieldDecorator(key, { ...params })(
                  <RangePicker style={{ width, display: 'inline-block' }} allowClear={false} />,
                )}
              </FormItem>
            );
            break;
          case 'CHECKBOX':
            itemObj = (
              <FormItem key={key}>
                {getFieldDecorator(key, { valuePropName: 'checked' })(<Checkbox>{name}</Checkbox>)}
              </FormItem>
            );
            break;
          default:
            break;
        }
        formItemList.push(itemObj);
      });
    }

    return formItemList;
  };

  render() {
    return (
      <Form layout="inline">
        {this.initFormList()}
        <FormItem>
          <Button type="primary" onClick={this.handleSearch}>
            查询
          </Button>
          {!this.props.isNoReset && (
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
          )}
        </FormItem>
      </Form>
    );
  }
}
