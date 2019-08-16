import styled from 'styled-components'

export const MARKER_SIZE = 10
export const MARKER_BORDER_SIZE = 1

const Marker = styled.div`
  background: #fff;

  position: relative;
  width: ${MARKER_SIZE}px;
  height: ${MARKER_SIZE}px;
  border-radius: ${MARKER_SIZE}px;
  border: ${MARKER_BORDER_SIZE}px solid #000;

  opacity: ${props => (props.isOpen ? '1' : '0.5')};
  z-index: 1;
  transition: opacity 0.25s ease-in-out;

  &:hover {
    opacity: 1;
    cursor: pointer;
    /* We want the marker to appear above other markers if a user hovers over it */
    z-index: 2;
  }
`

export default Marker
