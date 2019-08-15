import React from 'react'
import styled from 'styled-components'

export const MARKER_SIZE = 30

const Marker = styled.div`
  background: red;

  /* The location of the middle of the marker should be where the user clicked */
  top: ${props => props.y - MARKER_SIZE / 2}px;
  left: ${props => props.x - MARKER_SIZE / 2}px;
  position: absolute;
  width: ${MARKER_SIZE}px;
  height: ${MARKER_SIZE}px;
  cursor: pointer;
`

export default Marker
