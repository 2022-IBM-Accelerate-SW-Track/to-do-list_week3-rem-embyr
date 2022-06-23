import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  try{const checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(checkDate).toBeInTheDocument();}
  catch{}
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: ""}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  try{const checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(checkDate).not.toBeInTheDocument();}
  catch{}
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  //const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const element = screen.getByRole('button', {name: /Add/i});
  //const dueDate = null;
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  //fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  try{const check = screen.getByText("History Test");  
  expect(check).not.toBeInTheDocument();} catch {}
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});
    const dueDate = "05/30/2023";
    fireEvent.change(inputTask, { target: { value: "Checkbox Test"}});
    fireEvent.change(inputDate, { target: { value: dueDate}});
    fireEvent.click(element);
    const check = screen.getByText(/Checkbox Test/i);
    const checkBox = screen.getByRole('checkbox',);
    fireEvent.click(checkBox);
    expect(check).not.toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});
    const dueDate = "05/30/2021";
    fireEvent.change(inputTask, { target: { value: "History Test"}});
    fireEvent.change(inputDate, { target: { value: dueDate}});
    fireEvent.click(element);
    const historyCheck = screen.getByTestId(/History Test/i).style.background
    expect(historyCheck).toBe("rgb(160, 227, 152)");
 });
