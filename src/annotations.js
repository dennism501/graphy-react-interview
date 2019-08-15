import React from 'react'
import styled from 'styled-components'
import { reject, uniqueId } from 'lodash'

import Marker, { MARKER_SIZE } from './marker'
import Tooltip from './tooltip'

// do your magic here 👇
// 😎

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: palegreen;

  /* Using this so */
  position: relative;
`

const Annotation = styled.div`
  position: absolute;
  top: ${props => props.y - MARKER_SIZE / 2}px;
  left: ${props => props.x - MARKER_SIZE / 2}px;

  /* Adding margin so there is a small window outside the annotation where it won't hide */
  margin: 5px;
`

class Annotations extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      annotationStore: {},
    }

    this.handleSelection = this.handleSelection.bind(this)
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

  handleAnnotationHoverEnter(id) {
    const annotation = this.state.annotationStore[id]

    // We don't need to do anything if the annotation's tooltip tooltip is already open
    if (annotation.isOpen === true) return

    annotation.isOpen = true

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: annotation,
      },
    })
  }

  handleAnnotationHoverExit(id) {
    const annotation = this.state.annotationStore[id]

    // We don't need to do anything if the annotation's tooltip is already closed
    if (annotation.isOpen === false) return

    annotation.isOpen = false

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: annotation,
      },
    })
  }

  handleDeleteAnnotation(ev, id) {
    ev.stopPropagation()

    // Delete the annotation by ID
    const annotationStore = reject(
      this.state.annotationStore,
      annotation => annotation.id === id
    )

    this.setState({
      annotationStore,
    })
  }

  render() {
    const { annotationStore } = this.state

    return (
      <Container onClick={this.handleSelection}>
        {Object.values(annotationStore).map(({ x, y, isOpen, id, content }) => (
          <Annotation
            key={`marker-${id}`}
            x={x}
            y={y}
            id={id}
            onMouseEnter={() => this.handleAnnotationHoverEnter(id)}
            onMouseLeave={() => this.handleAnnotationHoverExit(id)}
          >
            <Marker x={x} y={y} />
            {isOpen && (
              <Tooltip x={x} y={y}>
                {content}
                <button
                  type='button'
                  onClick={ev => this.handleDeleteAnnotation(ev, id)}
                >
                  delete
                </button>
              </Tooltip>
            )}
          </Annotation>
        ))}
      </Container>
    )
  }
}

export default Annotations
