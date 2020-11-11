import React from 'react'
import { Alert, Card, Modal } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'

const { Meta } = Card

const Receipt = ({
  id,
  description,
  amount,
  currency,
  total,
  rates,
  loading,
  onEdit,
  onDelete,
}) => {
  function handleDelete() {
    Modal.confirm({
      title: 'Do you want to delete this receipt?',
      icon: <ExclamationCircleOutlined />,
      maskClosable: true,
      onOk() {
        onDelete(id)
      },
    })
  }

  function handleEdit() {
    onEdit({ id, description, amount, currency })
  }

  return (
    <Card
      actions={[
        <EditOutlined disabled={loading} key="edit" onClick={handleEdit} />,
        <DeleteOutlined
          disabled={loading}
          key="ellipsis"
          onClick={handleDelete}
        />,
      ]}
      className="receipt"
    >
      <Meta title={`${((rates[currency] || 0) * amount).toFixed(2)} CAD`} />
      <div className="receipt-description">{description}</div>

      <Alert
        type="info"
        message={`Total expense is ${total.toFixed(2)} CAD`}
        className="mt-1"
      />
    </Card>
  )
}

export default Receipt
