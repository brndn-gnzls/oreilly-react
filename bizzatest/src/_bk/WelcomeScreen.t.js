/**
 * screen -- used to interact with rendered components.
 * cleanup -- used to clean up the rendered component after each test.
 */
import { render, screen, cleanup } from "@testing-library/react"
import WelcomeScreen from '../WelcomeScreen'

// Unmounts every rendered component test before the next
// component is rendered to prevent memory leaks.
afterEach(() => {   // Lifecycle method -- runs after test.
    return cleanup()
})

// Define the actual test.
test("should show Welcome text to screen", () => {
    /**
     * 1. render -- Renders the WelcomeScreen component.
     * 2. screen.getByText -- Get the DOM eement that containts the text provided.
     * 3. expect -- Verify that the text is in the document using...
     * 4. toBeInDocument -- Matcher.
     */
    render(<WelcomeScreen />)
    const showText = screen.getByText(/Welcome to Bizza Conference Platform/i)
    expect(showText).toBeInTheDocument()
})