import styled from 'styled-components'

export const MARKER_SIZE = 25
export const MARKER_BORDER_SIZE = 2

const Marker = styled.div`
  background: #fff;

  position: relative;
  width: ${MARKER_SIZE}px;
  height: ${MARKER_SIZE}px;
  border-radius: ${MARKER_SIZE}px;
  border: ${MARKER_BORDER_SIZE}px solid #000;

  z-index: 1;

  &:hover {
    /* We want the marker to appear above other markers if a user hovers over it */
    z-index: 2;
    cursor: pointer;
  }
`

export default Marker
