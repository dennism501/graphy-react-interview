import React from 'react'
import styled from 'styled-components'
import { findIndex, get, find, uniqueId } from 'lodash'

import Marker, { MARKER_SIZE } from './marker'
import Tooltip from './tooltip'

// do your magic here 👇
// 😎

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: palegreen;
`

const Annotation = styled.div`
  position: absolute;
  top: ${props => props.y - MARKER_SIZE / 2}px;
  left: ${props => props.x - MARKER_SIZE / 2}px;
`

class Annotations extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      annotationStore: {},
    }

    this.handleSelection = this.handleSelection.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
  }

  handleSelection(ev) {
    const { pageX: x, pageY: y } = ev

    const id = uniqueId()

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: {
          x,
          y,
          isOpen: true,
          id,
          content: 'Some string',
        },
      },
    })
  }

  handleMarkerClick(ev, id) {
    // Make sure we don't trigger any other events (i.e.)
    ev.stopPropagation()

    const annotation = this.state.annotationStore[id]

    // There isn't a corresponding annotation, so we cannot continue
    if (!annotation) return

    // If the annotation is open, close it, and vice-versa
    if (annotation.isOpen) {
      annotation.isOpen = false
    } else {
      annotation.isOpen = true
    }

    this.setState({
      ...this.state.annotationStore,
      [id]: annotation,
    })
  }

  render() {
    const { annotationStore } = this.state

    return (
      <Container onClick={this.handleSelection}>
        {Object.values(annotationStore).map(({ x, y, isOpen, id, content }) => (
          <Annotation key={`marker-${id}`} x={x} y={y} id={id}>
            <Marker
              x={x}
              y={y}
              onClick={ev => this.handleMarkerClick(ev, id)}
            />
            {isOpen && (
              <Tooltip x={x} y={y}>
                {content}
              </Tooltip>
            )}
          </Annotation>
        ))}
      </Container>
    )
  }
}

export default Annotations
