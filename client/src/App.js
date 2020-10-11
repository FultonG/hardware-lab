import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from './Components/Container';
import SideNav from './Components/SideNav';
import AnimatedIcon from './Components/AnimatedIcon';
import HomeIcon from './icons/home.svg';
import AnalyticsIcon from './icons/analytics.svg';
import Dashboard from './Pages/Dashboard';
import Monitor from './Pages/Monitor';

const App = () => {
  return (
    <Router>
      <Container>
        <SideNav navItems={NavItems}></SideNav>
        <Container width="85%">
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/monitor">
              <Monitor/>
            </Route>
          </Switch>
        </Container>
      </Container>
    </Router>
  );
}

const NavItems = [
  {
    text: 'Dashboard',
    link: '/',
    icon: <AnimatedIcon file={HomeIcon} id="dashboard-link" duration={300} />
  },
  {
    text: 'Monitor',
    link: '/monitor',
    icon: <AnimatedIcon file={AnalyticsIcon} id="monitor-link" duration={300} />
  }
]

export default App;
