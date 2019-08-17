import React from 'react'

import Annotations from './annotations'

import '@testing-library/jest-dom/extend-expect'
import { render /*, fireEvent*/ } from '@testing-library/react'

describe('Annotations', () => {
  it('should render annotations without crashing', () => {
    render(<Annotations />)
  })
  // it('should create an annotation when the container is clicked', () => {
  //   const container = render(<Annotations />)

  //   fireEvent.click(container.firstChild, {
  //     pageX: 100,
  //     pageY: 100,
  //   })
  // })
  // it('should show the tooltip upon hover of a marker', () => {})
  // it('delete an annotation when the delete button is clicked', () => {})
  // it('should edit an annotation', () => {})
  // it('should close the annotation when <x>', () => {})
  // it('should open the annotation when <y>', () => {})
  // it('should retain the "open" state of an annotation when edited', () => {})
})
