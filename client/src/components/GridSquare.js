import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
background-color: var(${props=> props.active ? "--color-primary-3": "--color-primary-5"});
  /* Align Content Vertically & Horizontally */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Firefox. Fixes issue in Firefox where text got automatically selected */
  /* https://stackoverflow.com/questions/6900124/how-to-make-certain-text-not-selectable-with-css */
  -moz-user-select: none;
  border-radius: 5px;
  color: var(--color-primary-2)
  `;

export default function GridSquare(props) {
  return <Div active={props.active && !props.children} onClick={props.onClick}>{props.children}</Div>
}