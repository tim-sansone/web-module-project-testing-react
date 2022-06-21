import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';
import { sampleEpisode as data } from "./Data"






test("renders without error", () => { 
    render(<Episode episode={data}/>)
});

test("renders the summary test passed as prop", () => { 

    const testData = {
        ...data,
        summary: "specific summary statement"
    }
    render(<Episode episode={testData}/>)

    const summary = screen.queryByText(/specific summary statement/i)

    expect(summary).toBeInTheDocument();
    expect(summary).not.toBeNull();
    expect(summary).toBeVisible();

})

test("renders default image when image is not defined", () => {
    const testData = {
        ...data,
        image: null
    }
    const defaultImage = "https://i.ibb.co/2FsfXqM/stranger-things.png"
    render(<Episode episode={testData}/>)

    const image = screen.queryByRole("img");

    expect(image.alt).toEqual(defaultImage);

});
