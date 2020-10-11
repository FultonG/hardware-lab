import React, { useState } from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 15%;
  max-width: 300px;
  border-radius: 5px;
  background: white;
  align-items: center;
`;

const Brand = styled.img`
  width: 75%;
  margin: 20px 0px;
`;

const Nav = styled.nav`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  color: #343f4c;
  text-decoration: none;
  text-align: text-bottom;
  height: 75px;
  width: 100%;
  align-items: center;
  &.active {
    border-right: 2px solid #8ED275;
  }
  &:hover {
    background: #8ED275;
    color: white;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 40%;
`;

const SideNav = ({ logo, navItems }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <Container>
      <Brand src={logo}></Brand>
      <Nav>
        {navItems.map((item, index) => (
          <StyledNavLink key={index} to={item.link} exact activeClassName="active" 
          onMouseEnter={() => setHoveredIndex(index)} 
          onMouseLeave={() => setHoveredIndex(null)}>
            <IconContainer>{React.cloneElement(item.icon, { hovered: hoveredIndex == index })}</IconContainer>{item.text}
          </StyledNavLink>
        ))}
      </Nav>
    </Container>
  )
}

export default SideNav;