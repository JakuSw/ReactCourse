import React from "react";
import ReactDOM from "react-dom";
import Clock from "../../components/Clock"

var root = null;
describe('<Clock />', () => {
    describe('when given hours, minutes, seconds', () => {
        beforeEach(() => {
            root = document.createElement("div");
            ReactDOM.render(
                <Clock hours={2} minutes={5} seconds={10}/>, root
            )
        });

        it('renders an H2 element', () => {
            expect(root.childNodes[0].nodeName).toEqual("H2");
        });
    
        it('sets a Clock className', () => {
            expect(root.childNodes[0].className).toMatch(/Clock/);
        });
    
        it('renders time proprely', () => {
            expect(root.childNodes[0].textContent).toMatch(/02:05:10/);
        });
    
        
    });
    it('sets classname to empty string when not given', () => {
        expect(<Clock hours={2} minutes={5} seconds={10}/>).toEqual(<Clock className="" hours={2} minutes={5} seconds={10} />);
    });
});