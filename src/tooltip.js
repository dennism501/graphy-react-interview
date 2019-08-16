import styled from 'styled-components'

import { MARKER_SIZE } from './marker'

const TOOLTIP_SIZE = 125

const Tooltip = styled.div`
  position: relative;
  background: white;
  border: 1px solid #333;
  border-radius: 2px;
  padding: 5px;
  width: ${TOOLTIP_SIZE}px;
  min-width: ${TOOLTIP_SIZE}px;
  max-width: ${TOOLTIP_SIZE * 2}px;
  min-height: ${TOOLTIP_SIZE}px;
  max-height: ${TOOLTIP_SIZE * 2}px;
  margin-left: 5px;
  top: -${MARKER_SIZE}px;
  left: ${MARKER_SIZE}px;
  cursor: text;
  overflow: hidden;
  text-overflow: ellipsis;

  opacity: 0.8;
  transition: opacity 0.25s ease-in-out;

  &:hover {
    opacity: 1;
  }

  display: flex;
  flex-direction: column;
`

export default Tooltip
