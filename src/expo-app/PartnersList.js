import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function PartnersList({ partners }) {
  return Object.keys(partners).map((partner, i) => {
    const { name, description, logo } = partners[partner];

    return (
      <Link to={`/booth/${partner}`} key={i}>
        <div>
          <div>
            <img src={logo} width={200} />
          </div>
          <h2>{name}</h2>
          <div>{description}</div>
        </div>
      </Link>
    );
  });
}
