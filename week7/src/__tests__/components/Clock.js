import React from "react";
import ReactDOM from "react-dom";
import Clock from "../../components/Clock"
import renderer from "react-test-renderer"

var root = null;
var clockRenderer = null;
describe('<Clock />', () => {
    describe('when given hours, minutes, seconds (DOM)', () => {
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

    describe('when given hours, minutes, seconds (TestRenderer)', () => {
        beforeEach(() => {
            clockRenderer = renderer.create(
                <Clock hours={2} minutes={5} seconds={10}/>, root
            );
        });

        it('renders properly', () => {
            expect(clockRenderer.toJSON()).toMatchSnapshot();
        });
    
        it('sets a Clock className', () => {
            expect(clockRenderer.toJSON().props).toMatchObject({"className": expect.stringMatching(/Clock/)});
        });
        
    });

    it('sets classname to empty string when not given', () => {
        expect(<Clock hours={2} minutes={5} seconds={10}/>).toEqual(<Clock className="" hours={2} minutes={5} seconds={10} />);
    });
});