import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { Button, Col, Drawer, Row, Typography, message } from 'antd'
import { PlusOutlined, CheckOutlined } from '@ant-design/icons'
import { keys } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { Receipt, ReceiptForm } from 'components'

const { Title } = Typography

const Dashboard = () => {
  const [receipts, setReceipts] = useState([
    {
      id: uuidv4(),
      description: 'Number 1',
      amount: 500,
      currency: 'CAD',
    },
    {
      id: uuidv4(),
      description: 'Number 1',
      amount: 500,
      currency: 'CAD',
    },
    {
      id: uuidv4(),
      description: 'Number 1',
      amount: 500,
      currency: 'CAD',
    },
    {
      id: uuidv4(),
      description: 'Number 1',
      amount: 500,
      currency: 'CAD',
    },
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [editingReceipt, setEditingReceipt] = useState(null)
  const [exchangeRateData, setExchangeRateData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchExchangeRateData()
  }, [])

  const totalExpense = useMemo(() => {
    if (!exchangeRateData) {
      return 0
    }

    const { rates } = exchangeRateData

    return receipts.reduce((total, receipt) => {
      const { amount, currency } = receipt

      const rate = rates[currency]

      if (rate) {
        total += amount * rate
      }

      return total
    }, 0)
  }, [receipts, exchangeRateData])

  async function fetchExchangeRateData() {
    setLoading(true)

    try {
      const { data } = await axios.get(
        'https://api.exchangeratesapi.io/latest?base=CAD',
      )
      setExchangeRateData(data)

      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function handleDelete(id) {
    setReceipts(receipts.filter(receipt => receipt.id !== id))
  }

  function handleEdit(receipt) {
    setEditingReceipt(receipt)
    toggleDrawer()
  }

  function toggleDrawer() {
    setIsOpen(!isOpen)
  }

  function handleSubmit(values) {
    if (!values.id) {
      setReceipts([...receipts, { ...values, id: uuidv4() }])
    } else {
      setReceipts(
        receipts.map(receipt => (receipt.id === values.id ? values : receipt)),
      )
    }

    setEditingReceipt(null)
    toggleDrawer()
  }

  function handleReceiptsSubmit() {
    if (totalExpense > 1000) {
      message.error('Your total expense is exceeded $1000 CAD')
      return
    }

    console.log(receipts)
  }

  if (!exchangeRateData) {
    return null
  }

  return (
    <div className="page-dashboard">
      <Row justify="space-between">
        <Col>
          <Title level={3}>Receipts</Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            disabled={receipts.length >= 5 || loading}
            onClick={toggleDrawer}
          >
            Add
          </Button>

          <Button
            type="danger"
            icon={<CheckOutlined />}
            disabled={receipts.length === 0}
            className="ml-1"
            onClick={handleReceiptsSubmit}
          >
            Submit
          </Button>
        </Col>
      </Row>
      <Row gutter={24}>
        {receipts.map(receipt => (
          <Col xs={24} sm={12} md={6} xl={4} key={receipt.id} className="mb-1">
            <Receipt
              {...receipt}
              loading={loading}
              total={totalExpense}
              rates={exchangeRateData.rates}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        ))}
      </Row>

      <Drawer
        title={editingReceipt ? 'Edit Receipt' : 'Create Receipt'}
        visible={isOpen}
        destroyOnClose
        width={500}
        onClose={toggleDrawer}
      >
        <ReceiptForm
          initialValues={editingReceipt}
          currencies={keys(exchangeRateData.rates)}
          onSubmit={handleSubmit}
        />
      </Drawer>
    </div>
  )
}

export default Dashboard
