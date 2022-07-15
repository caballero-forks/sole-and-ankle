import React from 'react';
import styled from 'styled-components/macro';

import SHOES from '../../data';
import ShoeCard from '../ShoeCard';

const ShoeGrid = () => {
  return (
    <Wrapper>
      {SHOES.map((shoe) => (
        <CardWrapper key={shoe.slug}>
          <ShoeCard {...shoe} />
        </CardWrapper>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex; 
  flex-wrap: wrap;
  gap: 36px;
  margin-bottom: 28px;
`;

const CardWrapper = styled.div`
  flex: 1 0 340px;  
`

export default ShoeGrid;
