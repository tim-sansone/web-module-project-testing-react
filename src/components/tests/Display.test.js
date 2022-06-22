import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import { showData as data } from "./Data";
import mockFetchShow from "../../api/fetchShow";
jest.mock("../../api/fetchShow")

test('renders without errors with no props', () => {
    render(<Display />)
});

test('renders Show component when the button is clicked ', async () => {
    render(<Display />)
    mockFetchShow.mockResolvedValueOnce(data)

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
        const container = screen.queryByTestId("show-container")
        expect(container).not.toBeNull();
        expect(container).toBeInTheDocument();
    })

});

test('renders show season options matching your data when the button is clicked', async () => {
    render(<Display />)
    mockFetchShow.mockResolvedValueOnce(data)

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
        const options = screen.queryAllByTestId("season-option");
        expect(options).toHaveLength(4);
    })
});
