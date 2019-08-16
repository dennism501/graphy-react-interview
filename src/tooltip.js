import React from 'react'
import styled from 'styled-components'

import { MARKER_SIZE } from './marker'

const TOOLTIP_SIZE = 100

const Tooltip = styled.div`
  position: relative;
  background: white;
  border: 1px solid #333;
  border-radius: 2px;

  width: ${TOOLTIP_SIZE}px;
  height: ${TOOLTIP_SIZE}px;
  margin-left: 5px;
  top: -${MARKER_SIZE}px;
  left: ${MARKER_SIZE}px;
  z-index: 1;
  cursor: text;

  opacity: 0.8;
  transition: opacity 0.25s ease-in-out;

  &:hover {
    opacity: 1;
  }
`

export default Tooltip
