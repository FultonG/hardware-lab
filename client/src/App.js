import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Container from './Components/Container';
import SideNav from './Components/SideNav';
import AnimatedIcon from './Components/AnimatedIcon';
import HomeIcon from './icons/home.svg';
import AnalyticsIcon from './icons/analytics.svg';
import Dashboard from './Pages/Dashboard';

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
    text: 'Analytics',
    link: '/analytics',
    icon: <AnimatedIcon file={AnalyticsIcon} id="analytics-link" duration={300} />
  }
]

export default App;
