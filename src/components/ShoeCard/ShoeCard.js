import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';



const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'
  
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          { variant === "on-sale" && <SaleFlag>Sale</SaleFlag> }
          { variant === "new-release" && <NewFlag>Just released!</NewFlag>}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price 
            style={{ 
              '--color': 
                variant === 'on-sale' && COLORS.gray[700],
              '--textDecoration': 
                variant === 'on-sale' && "line-through"
            }}
            // other option with ternary operator, same result 
            // style={{ 
            //   '--color': 
            //     variant === 'on-sale' ? COLORS.gray[700] : undefined,
            //   '--textDecoration': 
            //     variant === 'on-sale' ? "line-through" : undefined
            // }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          { variant === "on-sale" 
            ? <SalePrice>{formatPrice(salePrice)}</SalePrice>
            : undefined
          }
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  
`;

const Flag = styled.div`
  position: absolute;
  top: 16px;
  right: -4px;
  padding-top: 8px; 
  padding-bottom: 8px;
  padding-left: 12px; 
  padding-right: 12px; 
  border-radius: 2px; 
  font-weight: ${WEIGHTS.bold};
  color: ${COLORS.white}; 
`

const SaleFlag = styled(Flag)`
  background-color: ${COLORS.primary};
`

const NewFlag = styled(Flag)`
  background-color: ${COLORS.secondary};
`

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px; 
`;

const Row = styled.div`
  display: flex; 
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--textDecoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
