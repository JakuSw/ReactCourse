import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DangerousButton >Click me</DangerousButton>
        <PrimaryButton >Click me</PrimaryButton>
        <Button >Click me</Button>
        <StyledButton>Click me too!</StyledButton>
        <DangerButton>Warning!</DangerButton>
      </header>
    </div>
  );
}

const StyledButton = styled.button`
  --normal-background: green;
  --hover-background: darkgreen;
  --active-background: lightgreen;
  outline: none;
  font-size: 20px; 
  color: white; 
  background-color: var(--normal-background); 
  border: none;
  border-radius: ${props => props.borderRadius || 5}px;
  padding: 10px;
  margin: 10px;

  &:hover {
  background-color: var(--hover-background);

  }

  &:active {
  background-color: var(--active-background);
  }
`;

const DangerButton = styled(StyledButton)`
  --normal-background: red;
  --hover-background: darkred;
  --active-background: pink;
`;


function Button(props){
  const buttonStyle = {};
  buttonStyle["--border-radius"] = "5px";
  return <StyledButton className="Button" style={buttonStyle}>{props.children}</StyledButton>
}

function PrimaryButton(props){
  const buttonStyle = {};
  buttonStyle["--normal-background"] = "blue";
  buttonStyle["--hover-background"] = "darkblue";
  buttonStyle["--active-background"] = "lightblue";
  buttonStyle["--border-radius"] = "5px";
  return <StyledButton className="Button" borderRadius={20} style={buttonStyle}>{props.children}</StyledButton>
}

function DangerousButton(props){
  const buttonStyle = {};
  buttonStyle["--normal-background"] = "red";
  buttonStyle["--hover-background"] = "darkred";
  buttonStyle["--active-background"] = "pink";
  buttonStyle["--border-radius"] = "5px";
  return <StyledButton className="Button" style={buttonStyle}>{props.children}</StyledButton>
}

export default App;
