import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
background-color: var(--color-primary-3);
  /* Align Content Vertically & Horizontally */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Firefox. Fixes issue in Firefox where text got automatically selected */
  /* https://stackoverflow.com/questions/6900124/how-to-make-certain-text-not-selectable-with-css */
  -moz-user-select: none;
  border-radius: 5px;
  `;

export default function GridSquare(props) {
  return <Div>{props.children}</Div>
}