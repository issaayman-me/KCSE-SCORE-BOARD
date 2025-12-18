# KCSE Scoreboard

A professional, interactive web application for simulating the Kenyan Certificate of Secondary Education (KCSE) grading system. This project provides hands-on experience with JavaScript fundamentals while accurately implementing the official KCSE grading scales.

## Features

- **Interactive Subject Selection**: Choose between 7-9 subjects with mandatory inclusion of English, Kiswahili, and Mathematics
- **Accurate Grading System**: Implements subject-specific grading scales as per official KCSE guidelines
- **Best 7 Subjects Calculation**: Automatically selects the best 7 subjects for mean grade calculation
- **Input Validation**: Comprehensive validation for marks (0-100 range) and mandatory fields
- **Professional UI**: Clean, responsive design with print-ready scoreboard output
- **Error Handling**: Clear error messages for invalid inputs
- **Watermark & Branding**: Includes logo placement and watermark for official appearance

## Project Structure
KCSE SCORE BOARD/
├── index.html # Main HTML document
├── style.css # Stylesheet with responsive design
├── script.js # JavaScript with all application logic
├── README.md # This documentation file
└── assets/
└── logo.png # Application logo (used as favicon and watermark)

## How to Use

1. **Enter Student Details**: Fill in the student's full name and index number
2. **Select Subject Count**: Choose between 7, 8, or 9 subjects from the dropdown
3. **Enter Subject Marks**: Input marks (0-100) for each subject
   - Mandatory subjects: English, Kiswahili, Mathematics (automatically included)
   - Grades are automatically calculated as you enter marks
4. **Calculate Results**: Click "Calculate Results" to generate the scoreboard
5. **View & Print**: Review the professional scoreboard and print if needed

## Grading System

The application follows official KCSE grading scales:

- Each subject has its own unique grading scale
- Grades range from A (highest) to E (lowest)
- Only the best 7 subjects are considered for mean grade calculation
- Mean grade is calculated by:
  1. Converting subject grades to points (A=12, A-=11, B+=10, etc.)
  2. Calculating the average of the best 7 subjects' points
  3. Converting the average points back to a letter grade

## Technical Implementation

### JavaScript Concepts Demonstrated

- **Variables & Data Structures**: Subject database stored in objects/arrays
- **Functions & Control Flow**: Modular functions with clear separation of concerns
- **DOM Manipulation**: Dynamic generation of subject fields and results
- **Event Handling**: Comprehensive user interaction management
- **Form Validation**: Real-time validation with error feedback
- **Dynamic UI Updates**: Live grade calculation and display

### Key Functions

- `initializeApp()`: Sets up the application and event listeners
- `handleSubjectCountChange()`: Dynamically generates subject input fields
- `calculateGrade()`: Determines grade based on subject-specific scales
- `calculateResults()`: Computes best 7 subjects and mean grade
- `validateAllMarks()`: Ensures all inputs are within valid ranges
- `generateResultsDisplay()`: Creates the professional scoreboard output

## Learning Objectives

This project helps learners understand:

1. **Subject-specific grading rules** and how to map raw marks to grades
2. **Conditional logic** for both validation and computation
3. **Sorting algorithms** for selecting best scores
4. **Professional UI development** with logos, watermarks, and print-friendly layouts
5. **Modular JavaScript programming** with clear separation of concerns

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Future Enhancements

Potential improvements for this project include:

1. **Multiple Student Management**: Store and compare multiple student results
2. **Local Storage**: Save results between browser sessions
3. **Data Export**: Export results as CSV or PDF
4. **Themed Dashboards**: Different visual themes for schools
5. **Advanced Analytics**: Performance trends and comparative analysis

## License

This project is created for educational purposes. Feel free to modify and extend it for learning or practical use.

## Credits

Developed as a beginner-friendly project to teach JavaScript fundamentals while simulating the official KCSE grading system.