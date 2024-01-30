import { render, screen, fireEvent, cleanup } from "@testing-library/react"
import SpeakerCard from "../components/SpeakerCard/SpeakerCard"

const speaker = {
    name: "Lorem",
    occupation: "Engineer",
    company: "ACME",
    email: "admin@acme.com",
    phone: "01-333333",
}

afterEach(() => {
    return cleanup()
})

// Render the SpeakerCard component.
test("should render the SpeakerCard component", () => {
    render(<SpeakerCard />)
    const card = screen.getByTestId("card") // root element in return data-testid.
    expect(card).toBeDefined() // Ascertain the component renders.
})

test("should make sure the toggle button shows or hides details", () => {
    render(<SpeakerCard speaker={speaker} />) // render component.
    const toggleButton = screen.getByTestId("toggle-test") // button data-testid.
    expect(screen.queryByTestId("test-details")).toBeNull() // should not be shown initially.
    fireEvent.click(toggleButton) // get button by data-testid.
    expect(screen.getByTestId("test-details")).toBeInTheDocument()
})
