import React, { useEffect, useState } from 'react';
import ReactVivus from 'react-vivus';
import styled from 'styled-components';

const Icon = styled(ReactVivus)(({ show=true }) => `
  opacity: ${show ? '1' : '0'};
`)
const AnimatedIcon = ({ file, id, duration=300, hovered, show, backwards}) => {
  const [vivus, setVivus] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (hovered && vivus !== null && finished) {
      vivus.stop().reset().play(backwards ? -1 : 1);
      setFinished(false);
    }

    return function cleanup() {
      // if(vivus)
      //   vivus.stop().destroy();
      // setVivus(null);
    }
  }, [hovered, show, finished]);

  return (
    <Icon
      show={show}
      id={id}
      option={{
        file: file,
        animTimingFunction: 'EASE_OUT',
        type: 'oneByOne',
        duration: duration,
        onReady: function (v) {
          setVivus(v);
        }
      }}
      style={{ height: 20, width: 20 }}
      callback={(e) => {
        setFinished(true);
      }}
    />
  )
}

export default AnimatedIcon;