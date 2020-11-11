import React from 'react'
import { Layout } from 'antd'

const { Header, Content } = Layout

const MainLayout = ({ children }) => (
  <Layout className="site-layout">
    <Header />
    <Content className="site-content">
      <div className="site-page">{children}</div>
    </Content>
  </Layout>
)

export default MainLayout
