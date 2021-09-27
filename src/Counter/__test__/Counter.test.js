import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Counter from '../Counter'
import '@testing-library/jest-dom/extend-expect'


test("check if header renders correctly", () => {
    const component = render(<Counter />)
    const headerEl = component.getByTestId("header")
    expect(headerEl.textContent).toBe("My Counter")
})

test("Initial counter text should be 0", () => {
    const {getByTestId} = render(<Counter />);
    const counterEl = getByTestId("counter");
    expect(counterEl.textContent).toBe("0")
})

test("Input contains inital value of 1", () => {
    const component = render(<Counter />);
    const inputEl = component.getByTestId("input");

    expect(inputEl.value).toBe("1")
})

test("Add button renders with +", () => {
    const component = render(<Counter />);
    const buttonEl = component.getByTestId("add-btn");

    expect(buttonEl.textContent).toBe("+")
})

test("Subtract button renders with -", () => {
    const component = render(<Counter />);
    const buttonEl = component.getByTestId("sub-btn");

    expect(buttonEl.textContent).toBe("-")
})

test("check if user can  change input", () => {
    const component = render(<Counter />);
    const inputEl = component.getByTestId("input");

    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    });

    expect(inputEl.value).toBe("5")
})

test("clicking on add button adds 1 to counter", () => {
    const component = render(<Counter />)
    const counter = component.getByTestId("counter");
    const addBtn = component.getByTestId("add-btn");
    expect(counter.textContent).toBe("0")
    fireEvent.click(addBtn)
    expect(counter.textContent).toBe("1")
})

test("clicking on subtract button subtracts 1 from the counter", () => {
    const component = render(<Counter />)
    const counter = component.getByTestId("counter");
    const subBtn = component.getByTestId("sub-btn");
    expect(counter.textContent).toBe("0")
    fireEvent.click(subBtn)
    expect(counter.textContent).toBe("-1")
})

test("changing input and then click clicking on subtract button works correctly ", () => {
    const component = render(<Counter />)
    const counter = component.getByTestId("counter");
    const subBtn = component.getByTestId("sub-btn");
    const inputEl = component.getByTestId("input");

    expect(counter.textContent).toBe("0")
    fireEvent.change(inputEl, {
        target: {
            value: 5
        }
    })
    fireEvent.click(subBtn)
    expect(counter.textContent).toBe("-5")
})

test("changing input and then click clicking on add button works correctly ", () => {
    const component = render(<Counter />)
    const counter = component.getByTestId("counter");
    const addBtn = component.getByTestId("add-btn");
    const inputEl = component.getByTestId("input");

    expect(counter.textContent).toBe("0")
    fireEvent.change(inputEl, {
        target: {
            value: 5
        }
    })
    fireEvent.click(addBtn)
    expect(counter.textContent).toBe("5")
})

test("clicking on add and subtract multiple times leads to the correct number", () => {
    const component = render(<Counter />);
    const counter = component.getByTestId("counter");
    const input = component.getByTestId("input");
    const addBtn = component.getByTestId("add-btn")
    const subBtn = component.getByTestId("sub-btn")

    expect(counter.textContent).toBe("0");

    fireEvent.change(input, {
        target: {
            value: "10"
        }
    })
    fireEvent.click(addBtn)
    expect(counter.textContent).toBe("10")

    fireEvent.change(input, {
        target: {
            value: "5"
        }
    })
    fireEvent.click(addBtn)
    expect(counter.textContent).toBe("15")

    fireEvent.click(subBtn)
    fireEvent.click(subBtn)
    fireEvent.click(subBtn)
    fireEvent.click(subBtn)
    expect(counter.textContent).toBe("-5")
})

test("Counter containes correct class", () => {
    const component = render(<Counter />)
    const input = component.getByTestId("input")
    const counter = component.getByTestId("counter")
    const addBtn = component.getByTestId("add-btn")
    const subBtn = component.getByTestId("sub-btn")

    expect(counter.className).toBe("")

    fireEvent.change(input, {
        target: {
            value: "50"
        }
    })
    fireEvent.click(addBtn)
    expect(counter.className).toBe("")

    fireEvent.click(addBtn)
    expect(counter.className).toBe("green")

    fireEvent.click(addBtn)
    expect(counter.className).toBe("green")

    fireEvent.click(subBtn)
    fireEvent.click(subBtn)
    expect(counter.className).toBe("")


    fireEvent.click(subBtn)
    fireEvent.click(subBtn)
    fireEvent.click(subBtn)
    expect(counter.className).toBe("red")

    
    fireEvent.click(subBtn)
    expect(counter.className).toBe("red")
})