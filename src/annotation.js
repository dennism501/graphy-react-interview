import styled from 'styled-components'

import { MARKER_SIZE, MARKER_BORDER_SIZE } from './marker'

const ANNOTATION_SPACING = 5

const TOTAL_MARKER_SIZE = MARKER_SIZE + MARKER_BORDER_SIZE
const MARKER_CENTRE_POINT = Math.ceil(TOTAL_MARKER_SIZE / 2)

const Annotation = styled.div`
  position: absolute;
  /* Centering the marker position to the initial click. */
  top: ${props => props.y - MARKER_CENTRE_POINT - ANNOTATION_SPACING}px;
  left: ${props => props.x - MARKER_CENTRE_POINT - ANNOTATION_SPACING}px;

  /* Adding spacing so there is a small window outside the annotation where it won't hide */
  padding: ${ANNOTATION_SPACING}px;

  display: flex;
  flex-direction: column;
`

export default Annotation
