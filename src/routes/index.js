import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Dashboard from 'containers/pages/Dashboard'
import MainLayout from 'containers/layouts/MainLayout'

const Routes = () => (
  <MainLayout>
    <BrowserRouter>
      <Route exact path="/" component={Dashboard} />
    </BrowserRouter>
  </MainLayout>
)

export default Routes
