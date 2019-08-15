import React from 'react'
import styled from 'styled-components'

import { MARKER_SIZE } from './marker'

const Tooltip = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #333;
  border-radius: 2px;

  width: 100px;
  height: 100px;
  margin-left: 5px;
  top: ${props => props.y - MARKER_SIZE / 2}px;
  left: ${props => props.x + MARKER_SIZE / 2}px;
`

export default Tooltip
