import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Counter from '../Counter'
import '@testing-library/jest-dom/extend-expect'


let getByTestId;
beforeEach(() => {
    const component = render(<Counter />);
    getByTestId = component.getByTestId;
})

afterEach(() => {
    cleanup() // We don't need to specify this it is called by default, I just put it here to, so that I can see what all happens
})

test("check if header renders correctly", () => {
    const headerEl = getByTestId("header")
    expect(headerEl.textContent).toBe("My Counter")
})

test("Initial counter text should be 0", () => {
    const counterEl = getByTestId("counter");
    expect(counterEl.textContent).toBe("0")
})

test("Input contains inital value of 1", () => {
    const inputEl = getByTestId("input");

    expect(inputEl.value).toBe("1")
})

test("Add button renders with +", () => {
    const buttonEl = getByTestId("add-btn");

    expect(buttonEl.textContent).toBe("+")
})

test("Subtract button renders with -", () => {
    const buttonEl = getByTestId("sub-btn");

    expect(buttonEl.textContent).toBe("-")
})

test("check if user can  change input", () => {
    const inputEl = getByTestId("input");

    fireEvent.change(inputEl, {
        target: {
            value: "5"
        }
    });

    expect(inputEl.value).toBe("5")
})

test("clicking on add button adds 1 to counter", () => {
    const counter = getByTestId("counter");
    const addBtn = getByTestId("add-btn");
    expect(counter.textContent).toBe("0")
    fireEvent.click(addBtn)
    expect(counter.textContent).toBe("1")
})

test("clicking on subtract button subtracts 1 from the counter", () => {
    const counter = getByTestId("counter");
    const subBtn = getByTestId("sub-btn");
    expect(counter.textContent).toBe("0")
    fireEvent.click(subBtn)
    expect(counter.textContent).toBe("-1")
})

test("changing input and then click clicking on subtract button works correctly ", () => {
    const counter = getByTestId("counter");
    const subBtn = getByTestId("sub-btn");
    const inputEl = getByTestId("input");

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
    const counter = getByTestId("counter");
    const addBtn = getByTestId("add-btn");
    const inputEl = getByTestId("input");

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
    const counter = getByTestId("counter");
    const input = getByTestId("input");
    const addBtn = getByTestId("add-btn")
    const subBtn = getByTestId("sub-btn")

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
    const input = getByTestId("input")
    const counter = getByTestId("counter")
    const addBtn = getByTestId("add-btn")
    const subBtn = getByTestId("sub-btn")

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