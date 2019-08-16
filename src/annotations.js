import React from 'react'
import styled from 'styled-components'
import { uniqueId } from 'lodash'

import Marker from './marker'
import Annotation from './annotation'

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

const DeleteButton = styled.button`
  cursor: pointer;
  border: 0;
  background: red;
  color: #fff;
  font-weight: bold;
`

const SaveButton = styled.button`
  cursor: pointer;
  border: 0;
  font-weight: bold;
`

const AnnotationEditor = styled.textarea`
  width: 100%;
  margin: 0;
  padding: 0;
  margin: 1px;
`

// Add tests for:
// Container click click (a marker should be created)
// hover over created marker (should show tooltip)
// Delete annotation

const createNewAnnotation = ({ x, y, id }) => ({
  x,
  y,
  isOpen: true,
  id,
  content: '',
  isEditing: true,
})

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
        [id]: createNewAnnotation({ x, y, id }),
      },
    })
  }

  handleAnnotationHoverEnter = id => () => {
    const annotation = { ...this.state.annotationStore[id] }

    // No need to update the state if the annotation's tooltip tooltip is already open
    if (annotation.isOpen === true) return

    annotation.isOpen = true

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: annotation,
      },
    })
  }

  handleAnnotationHoverExit = id => () => {
    const annotation = {
      ...this.state.annotationStore[id],
    }

    // If the user is editing the annotation, don't close it on them. It'll make people grumpy! 😡
    if (annotation.isEditing) return

    // No need to update the state if the annotation's tooltip is already closed
    if (annotation.isOpen === false) return

    annotation.isOpen = false

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: annotation,
      },
    })
  }

  handleDeleteAnnotation = id => ev => {
    ev.stopPropagation()
    const annotationStore = { ...this.state.annotationStore }

    // Delete the annotation by ID
    delete annotationStore[id]

    this.setState({
      annotationStore,
    })
  }

  handleEditBlur = id => ev => {
    const newContent = ev.target.value

    const annotation = {
      ...this.state.annotationStore[id],
    }

    // No need to update the state/save the content if there wasn't a change
    if (annotation.content === newContent) return

    annotation.content = newContent
    annotation.isEditing = false

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: annotation,
      },
    })
  }

  handleEditClick = id => ev => {
    ev.stopPropagation()

    const annotation = {
      ...this.state.annotationStore[id],
    }

    // No need to update the state if the user is already editing this annotation
    if (annotation.isEditing) return

    annotation.isEditing = true

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: annotation,
      },
    })
  }

  render() {
    const { annotationStore } = this.state

    return (
      <Container onClick={this.handleSelection}>
        {Object.values(annotationStore).map(
          ({ x, y, isOpen, id, content, isEditing }) => (
            <Annotation
              key={`marker-${id}`}
              x={x}
              y={y}
              annotationId={id}
              // We are currying for these event handlers, so if performance starts to become an issue
              // We should look into memoising the event handlers
              // https://medium.com/@Charles_Stover/cache-your-react-event-listeners-to-improve-performance-14f635a62e15
              onMouseEnter={this.handleAnnotationHoverEnter(id)}
              onMouseLeave={this.handleAnnotationHoverExit(id)}
            >
              <Marker x={x} y={y} />
              {isOpen && (
                <Tooltip x={x} y={y}>
                  {isEditing && (
                    <AnnotationEditor
                      autoFocus
                      defaultValue={content}
                      onClick={this.handleEditClick(id)}
                      onBlur={this.handleEditBlur(id)}
                    />
                  )}
                  {!isEditing && content}
                  <DeleteButton
                    type='button'
                    onClick={this.handleDeleteAnnotation(id)}
                  >
                    delete
                  </DeleteButton>
                  <SaveButton>save</SaveButton>
                </Tooltip>
              )}
            </Annotation>
          )
        )}
      </Container>
    )
  }
}

export default Annotations
