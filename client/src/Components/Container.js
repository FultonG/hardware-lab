import styled from 'styled-components';

const Container = styled.div(({width = '100%', height = '100%', padding = '0', wrap = "nowrap", direction = "row", justify = "flex-start", margin = "0", align="normal", overflow}) => `
  display: flex;
  width: ${width};
  height: ${height};
  padding: ${padding};
  margin: ${margin};
  flex-wrap: ${wrap};
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  ${overflow && 'overflow-y: scroll;'}
`);

export default Container;