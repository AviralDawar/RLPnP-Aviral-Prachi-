import React from "react";
import styled from "styled-components";

export const Heading = styled.h1`
  font-size: 14px;
  color: black;
  padding: 5px;
  margin: 0;
  font-weight: bold;
  font-color: white;
  text-align: center;
`;

export default function Footer() {
  return (
    <div>
      <Heading>© 2022 | All Rights Reserved</Heading>
    </div>
  );
}
