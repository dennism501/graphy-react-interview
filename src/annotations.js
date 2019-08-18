import React from 'react'
import styled from 'styled-components'

import Marker from './marker'
import Annotation, { AnnotationEditor, AnnotationContent } from './annotation'
import { DeleteButton, SaveButton, ButtonContainer } from './buttons'
import Tooltip, { TooltipTitle } from './tooltip'

// TODO: implement Tooltip out of bounds check:
// if body.width < (tooltipwidth + padding + tooltip.x)
// if body.height < (tooltipheight + padding + tooltip.y)

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff;
`

const AnnotationContentContainer = styled.div`
  cursor: text;
  flex: 1;
  display: flex;
`

let currentId = 0

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
  }

  handleSelection = ev => {
    const { pageX: x, pageY: y } = ev

    const id = currentId++

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: createNewAnnotation({ x, y, id }),
      },
    })
  }

  handleAnnotationHoverEnter(id) {
    const annotation = this.state.annotationStore[id]

    // No need to update the state if the annotation's tooltip tooltip is already open
    if (annotation.isOpen) return

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: {
          ...annotation,
          isOpen: true,
        },
      },
    })
  }

  handleAnnotationHoverExit(id) {
    const annotation = this.state.annotationStore[id]

    // If the user is editing the annotation, don't close it on them. It'll make people grumpy! 😡
    if (annotation.isEditing) return

    // No need to update the state if the annotation's tooltip is already closed
    if (!annotation.isOpen) return

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: {
          ...annotation,
          isOpen: false,
        },
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

  handleEditBlur(ev, id) {
    const newContent = ev.target.value
    const annotation = this.state.annotationStore[id]

    let { isEditing, isOpen } = annotation

    // If they didn't change the content, we can assume they've finished editing the annotation
    // We cannot close the annotation here, otherwise the "create annotation" event will occur
    if (annotation.content === newContent) {
      isEditing = false
    }

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: {
          ...annotation,
          content: newContent,
          isEditing,
          isOpen,
        },
      },
    })
  }

  handleEditClick(ev, id) {
    ev.stopPropagation()

    const annotation = this.state.annotationStore[id]

    // No need to update the state if the user is already editing this annotation
    if (annotation.isEditing) return

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: {
          ...annotation,
          isEditing: true,
        },
      },
    })
  }

  handleMarkerClick(ev, id) {
    ev.stopPropagation()

    const annotation = this.state.annotationStore[id]

    if (annotation.isEditing && annotation.isOpen) return

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: {
          ...annotation,
          isEditing: true,
          isOpen: true,
        },
      },
    })
  }

  // The field's content actually gets saved on the textarea blur
  // Potentially in the future we could save their edits as a draft and not
  // actually save it until the user clicks save.
  handleSaveAnnotation(ev, id) {
    ev.stopPropagation()

    const annotation = this.state.annotationStore[id]

    this.setState({
      annotationStore: {
        ...this.state.annotationStore,
        [id]: {
          ...annotation,
          isEditing: false,
          isOpen: false,
        },
      },
    })
  }

  // We're stopping a new annotation being created if they click within an open annotation
  handleAnnotationClick(ev) {
    ev.stopPropagation()
  }

  render() {
    const { annotationStore } = this.state

    return (
      <Container onClick={this.handleSelection} data-testid='container'>
        {Object.values(annotationStore).map(
          ({ x, y, isOpen, id, content, isEditing }) => (
            <Annotation
              // Should we just pass down the entire annotation?
              key={`marker-${id}`}
              x={x}
              y={y}
              annotationId={id}
              isOpen={isOpen}
              onClick={this.handleAnnotationClick}
              onMouseEnter={() => this.handleAnnotationHoverEnter(id)}
              onMouseLeave={() => this.handleAnnotationHoverExit(id)}
              data-testid='annotation'
            >
              <Marker
                isOpen={isOpen}
                onClick={ev => this.handleMarkerClick(ev, id)}
                data-testid='marker'
              />

              <Tooltip isOpen={isOpen} data-testid='tooltip'>
                <TooltipTitle data-testid='annotation-title'>
                  Edit Annotation
                </TooltipTitle>
                <AnnotationContentContainer
                  onClick={ev => this.handleEditClick(ev, id)}
                  data-testid='annotation-content-container'
                >
                  {isEditing && (
                    <AnnotationEditor
                      autoFocus
                      defaultValue={content}
                      onBlur={ev => this.handleEditBlur(ev, id)}
                      data-testid='annotation-editor'
                    />
                  )}
                  {!isEditing && (
                    <AnnotationContent data-testid='annotation-content'>
                      {content ? content : 'Click to edit'}
                    </AnnotationContent>
                  )}
                </AnnotationContentContainer>
                <ButtonContainer>
                  <DeleteButton
                    type='button'
                    onClick={ev => this.handleDeleteAnnotation(ev, id)}
                    data-testid='delete-annotation'
                  >
                    Delete
                  </DeleteButton>

                  <SaveButton
                    type='button'
                    onClick={ev => this.handleSaveAnnotation(ev, id)}
                    data-testid='save-annotation'
                  >
                    Save and Close
                  </SaveButton>
                </ButtonContainer>
              </Tooltip>
            </Annotation>
          )
        )}
      </Container>
    )
  }
}

export default Annotations
