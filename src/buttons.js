import styled from 'styled-components'

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  align-items: flex-end;
`

export const Button = styled.button`
  cursor: pointer;
  border: 0;
  padding: 0;
  margin: 0;
  background: transparent;
  border-radius: 3px;
  transition: all 0.2s ease;
`

export const DeleteButton = styled(Button)`
  background: transparent;
  color: red;
  text-decoration: underline;
  margin-right: 10px;

  &:hover {
    color: #ba0000;
  }
`

export const SaveButton = styled(Button)`
  background: #19ad6d;
  color: #fff;
  font-weight: bold;
  text-align: center;
  padding: 10px;

  &:hover {
    background: #21825b;
  }
`
