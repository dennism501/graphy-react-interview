import React from 'react'

import Annotations from './annotations'

import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

describe('Annotations', () => {
  it('should create an annotation when the container is clicked', () => {
    const container = render(<Annotations />)

    fireEvent.click(container, {
      pageX: 100,
      pageY: 100,
    })
  })
  it('should show the tooltip upon hover of a marker', () => {})
  it('delete an annotation when the delete button is clicked', () => {})
  it('edit an annotation', () => {})
  // it('When the annotation should/shouldn't close', () => {})
})
