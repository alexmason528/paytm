import React from 'react'
import { Button, Form, Select, Input, InputNumber } from 'antd'
import { get } from 'lodash'

const { Option } = Select

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const ReceiptForm = ({ initialValues, currencies, onSubmit }) => {
  function handleSubmit(values) {
    onSubmit({ ...values, id: get(initialValues, 'id') })
  }

  return (
    <Form
      {...formItemLayout}
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="currency"
        label="Currency"
        hasFeedback
        rules={[{ required: true, message: 'Please select a currency!' }]}
      >
        <Select placeholder="Please select a currency">
          {currencies.map(currency => (
            <Option key={currency} value={currency}>
              {currency}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, message: 'Please input amount!' }]}
      >
        <InputNumber min={1} />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input description!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="secondary">Canel</Button>
        <Button type="primary" htmlType="submit" className="ml-1">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ReceiptForm
