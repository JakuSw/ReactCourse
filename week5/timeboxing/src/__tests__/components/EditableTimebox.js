import {render, cleanup, fireEvent, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import EditableTimebox from "../../components/EditableTimebox"
import React from "react"

describe('<EditableTimebox />', () => {
    afterEach(cleanup);

    it('shows edit button', () => {
        const {getByText}= render(<EditableTimebox />); 
        expect(() => {
            getByText("Edit")
        }).not.toThrow();
    });

    it('allows editing the timebox', () => {
        const {getByText, debug}= render(<EditableTimebox />); 

        fireEvent.click(getByText("Edit"));
        userEvent.type(screen.getByRole("textbox"), "Testing React")
        fireEvent.click(getByText(/changes/));

        expect(() => {
            getByText(/Testing React/)
        }).not.toThrow();
    });

});