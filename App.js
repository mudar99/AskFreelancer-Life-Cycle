import { Component } from 'react';
import "../src/Styles/style.css";

import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Register from './Register/Register';
import Profile from './Portfolio/Profile';
import Initialize from './Initialize/Initialize';
import MainPage from './Main Page/MainPage';
import Complaints from './CMS/Complaints';
import Dashboard from './CMS/Dashboard';
import Chat from './Chat/Chat';
import CMS from './CMS/CMS';
import Category from './CMS/Category';
import CMS_Login from './CMS/CMS_Login';
import NotFound from './NotFound/NotFound';
import GalleriaCaption from './Guest - Services/GalleriaCaption';
import Services from './CMS/Services';
import Admins from './CMS/Admins';
import IDs from './CMS/IDs';
import Roles from './CMS/Roles';
import Permissions from './CMS/Permissions';
import PublicMessagesPage from './Chat/Chat';
import Tests from './CMS/Tests';

class App extends Component {

  render() {
    return (

      <div className=''>
        <BrowserRouter >
          <Routes>
            <Route exact path="/" element={<Register />} />

            <Route path="*" element={<NotFound />} />
            <Route exact path="/Initialize" element={<Initialize />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/MainPage" element={<MainPage />} />
            {/* <Route path="/Chat" element={<PublicMessagesPage />} /> */}

            <Route path="/Guest_Services" element={<GalleriaCaption />} />
            <Route path="/CMS_Login" element={<CMS_Login />} />
            <Route path="CMS" element={<CMS />} >
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="Admins" element={<Admins />} />
              <Route path="IDs" element={<IDs />} />
              <Route path="Tests" element={<Tests />} />
              <Route path="Roles" element={<Roles />} />
              <Route path="Permissions" element={<Permissions />} />
              <Route path="Category" element={<Category />} />
              <Route path="Services" element={<Services />} />
              <Route path="Complaints" element={<Complaints />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );

  }
}

export default App;