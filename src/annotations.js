import React from 'react'
import styled from 'styled-components'
import { reject, uniqueId } from 'lodash'

import Marker, { MARKER_SIZE } from './marker'
const ANNOTATION_SPACING = 5

import Tooltip from './tooltip'

const ID_PREFIX = 'annotation_'

// TODO: implement Tooltip out of bounds check:
// if body.width < (tooltipwidth + padding + tooltip.x)
// if body.height < (tooltipheight + padding + tooltip.y)

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: palegreen;

  /* Using this so */
  position: relative;
`

const Annotation = styled.div`
  position: absolute;
  /* Centering the marker position to the initial click. */
  top: ${props => props.y - MARKER_SIZE / 2 - ANNOTATION_SPACING}px;
  left: ${props => props.x - MARKER_SIZE / 2 - ANNOTATION_SPACING}px;

  /* Adding spacing so there is a small window outside the annotation where it won't hide */
  padding: ${ANNOTATION_SPACING}px;
`

const DeleteButton = styled.button`
  cursor: pointer;
  border: 0;
  background: red;
  color: #fff;
  font-weight: bold;
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

    const id = uniqueId(ID_PREFIX)

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
    const annotation = { ...this.state.annotationStore[id] }

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
    const annotation = {
      ...this.state.annotationStore[id],
    }

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
    const annotationStore = { ...this.state.annotationStore }

    // Delete the annotation by ID
    delete annotationStore[id]

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
            annotationId={id}
            onMouseEnter={() => this.handleAnnotationHoverEnter(id)}
            onMouseLeave={() => this.handleAnnotationHoverExit(id)}
          >
            <Marker x={x} y={y} />
            {isOpen && (
              <Tooltip x={x} y={y}>
                {content}
                <DeleteButton
                  type='button'
                  onClick={ev => this.handleDeleteAnnotation(ev, id)}
                >
                  delete
                </DeleteButton>
              </Tooltip>
            )}
          </Annotation>
        ))}
      </Container>
    )
  }
}

export default Annotations
