import React from 'react'

import Annotation from './annotation'

import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

test('Creates an annotation at the required location', () => {
  // Our test will have the marker size + padding + border hard coded. This is intentional:
  // So that we have an firm/nonchanging input and output (i.e. x = 100, padding = 5, marker size = 10, border = 1)
  // We don't want to exactly duplicate the application logic, as it will make the test brittle
  // See: https://www.freecodecamp.org/news/the-right-way-to-test-react-components-548a4736ab22/

  const { container } = render(<Annotation x={100} y={50} />)

  expect(container.firstChild).toHaveStyle('top: 39px')
  expect(container.firstChild).toHaveStyle('left: 89px')
})
