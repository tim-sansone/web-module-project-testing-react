import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import Show from './../Show';
import { showData as data } from "./data"

test('renders without errors', () => {
    render(<Show show={data} selectedSeason="none"/>)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} selectedSeason="none"/>)

    const loading = screen.queryByText(/fetching data.../i);
    
    expect(loading).toBeInTheDocument();
    expect(loading).not.toBeNull();
    expect(loading).toBeVisible();
});

test('renders same number of options seasons are passed in', () => {
    const showWithTwoSeasons = {
        ...data,
        seasons: [
            {id:0, name: "Season 1", episodes: []}, 
            {id:1, name: "Season 2", episodes: []}
        ]
    }
    render(<Show show={showWithTwoSeasons} selectedSeason="none"/>)

    const options = screen.queryAllByTestId("season-option");

    expect(options).toHaveLength(2);

});

test('handleSelect is called when an season is selected', () => {
    const mockHandleSelect = jest.fn();
    render(<Show show={data} selectedSeason="none" handleSelect={mockHandleSelect}/>)
    const { seasons } = data;
    
    const options = screen.queryAllByTestId("season-option");
    const select = screen.getByLabelText(/select a season/i);
    userEvent.selectOptions(select, "0")
   
    expect(options[0].selected).toBe(true)
    expect(options[1].selected).toBe(false)
    expect(options[2].selected).toBe(false)
    expect(options[3].selected).toBe(false)
    

});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { });
