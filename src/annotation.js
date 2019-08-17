import styled, { css } from 'styled-components'

import { MARKER_SIZE } from './marker'

const TOTAL_MARKER_SIZE = MARKER_SIZE
const MARKER_CENTRE_POINT = Math.ceil(TOTAL_MARKER_SIZE / 2)

const Annotation = styled.div`
  position: absolute;
  /* Centering the marker position to the initial click. */
  top: ${props => props.y - MARKER_CENTRE_POINT}px;
  left: ${props => props.x - MARKER_CENTRE_POINT}px;

  display: flex;
  flex-direction: row;
`

export default Annotation
