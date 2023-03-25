import React from 'react';
import Grid from '@mui/material/Grid';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import { HomePage } from './Pages/HomePage'
import { ContactPage } from './Pages/ContactPage'
import { ViewerPage } from './Pages/ViewerPage'


const App : React.FunctionComponent = () => {

  return (

    <BrowserRouter>

      <Grid container spacing = { 2 }>

        { /** ナビゲーション（Drawer） リンク先を変更 */ }
        <Grid container item className = 'Navigation'>

          <Grid item xs = { 6 } sm = { 2 }>
            <Link to = '/home' style = { { textDecoration: 'none' , fontWeight: 'bold' } }>
              <span>Home</span>
            </Link>
          </Grid>

          <Grid item xs = { 6 }  sm = { 2 }>
            <Link to = '/viewer' style = { { textDecoration: 'none' , fontWeight: 'bold' } }>
              <span>Works</span>
            </Link>
          </Grid>

          <Grid item xs = { 6 } sm = { 2 }>
            <Link to = '/contact' style = { { textDecoration: 'none' , fontWeight: 'bold' } }>
              <span>Contact</span>
            </Link>
          </Grid>

        </Grid>

        { /** メインコンテンツ URLに応じて表示内容を変更 */ }
        <Grid container item className = 'Main'>
          <Routes>
            <Route path = '/'         element = { <HomePage />} />
            <Route path = '/home'     element = { <HomePage />} />
            <Route path = '/viewer'   element = { <ViewerPage />} />
            <Route path = '/contact'  element = { <ContactPage />} />
          </Routes>
        </Grid>

      </Grid>

    </BrowserRouter>

  );

};


export default App;