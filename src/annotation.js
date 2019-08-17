import styled, { css } from 'styled-components'

import { MARKER_SIZE } from './marker'
import { TOOLTIP_WIDTH } from './tooltip'

const MARKER_CENTRE_POINT = Math.ceil(MARKER_SIZE / 2)

export const AnnotationEditor = styled.textarea`
  width: 100%;
  margin: 0;
  border-radius: 3px;
  border: 1px solid #222;
  min-width: ${TOOLTIP_WIDTH}px;
  transition: 0.2s all ease;
  outline: 0;
  padding: 10px;

  &:focus {
    outline: 0;
    border-color: #2980b9;
  }
`

export const AnnotationContent = styled.div`
  width: 100%;
  font-size: 0.75em;
  color: grey;
  border: 1px solid transparent;
  min-width: ${TOOLTIP_WIDTH}px;
`

const Annotation = styled.div`
  position: absolute;
  /* Centering the marker position to the initial click. */
  top: ${props => props.y - MARKER_CENTRE_POINT}px;
  left: ${props => props.x - MARKER_CENTRE_POINT}px;

  display: flex;
  flex-direction: row;
`

export default Annotation
