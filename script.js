/**
 * KCSE SCOREBOARD BUILDER
 * A comprehensive JavaScript implementation for the Kenyan Certificate
 * of Secondary Education (KCSE) grading system simulation.
 * 
 * This script handles:
 * - Subject selection and validation
 * - Mark input and validation
 * - Grade calculation based on subject-specific scales
 * - Best 7 subjects selection
 * - Mean grade calculation
 * - Dynamic UI updates and error handling
 * - Print-ready scoreboard generation
 */

// ============================================
// CONSTANTS AND GLOBAL VARIABLES
// ============================================

// Subject database with codes, names, and grading scales
const SUBJECTS = {
    '101': { 
        name: 'ENGLISH', 
        mandatory: true,
        grades: [
            { grade: 'A', min: 80, max: 100, points: 12 },
            { grade: 'A-', min: 75, max: 79, points: 11 },
            { grade: 'B+', min: 70, max: 74, points: 10 },
            { grade: 'B', min: 65, max: 69, points: 9 },
            { grade: 'B-', min: 60, max: 64, points: 8 },
            { grade: 'C+', min: 55, max: 59, points: 7 },
            { grade: 'C', min: 50, max: 54, points: 6 },
            { grade: 'C-', min: 45, max: 49, points: 5 },
            { grade: 'D+', min: 40, max: 44, points: 4 },
            { grade: 'D', min: 35, max: 39, points: 3 },
            { grade: 'D-', min: 30, max: 34, points: 2 },
            { grade: 'E', min: 0, max: 29, points: 1 }
        ]
    },
    '102': { 
        name: 'KISWAHILI', 
        mandatory: true,
        grades: [
            { grade: 'A', min: 78, max: 100, points: 12 },
            { grade: 'A-', min: 73, max: 77, points: 11 },
            { grade: 'B+', min: 68, max: 72, points: 10 },
            { grade: 'B', min: 63, max: 67, points: 9 },
            { grade: 'B-', min: 58, max: 62, points: 8 },
            { grade: 'C+', min: 53, max: 57, points: 7 },
            { grade: 'C', min: 48, max: 52, points: 6 },
            { grade: 'C-', min: 43, max: 47, points: 5 },
            { grade: 'D+', min: 38, max: 42, points: 4 },
            { grade: 'D', min: 33, max: 37, points: 3 },
            { grade: 'D-', min: 28, max: 32, points: 2 },
            { grade: 'E', min: 0, max: 27, points: 1 }
        ]
    },
    '121': { 
        name: 'MATHEMATICS', 
        mandatory: true,
        grades: [
            { grade: 'A', min: 70, max: 100, points: 12 },
            { grade: 'A-', min: 65, max: 69, points: 11 },
            { grade: 'B+', min: 60, max: 64, points: 10 },
            { grade: 'B', min: 55, max: 59, points: 9 },
            { grade: 'B-', min: 49, max: 54, points: 8 },
            { grade: 'C+', min: 43, max: 48, points: 7 },
            { grade: 'C', min: 37, max: 42, points: 6 },
            { grade: 'C-', min: 31, max: 36, points: 5 },
            { grade: 'D+', min: 25, max: 30, points: 4 },
            { grade: 'D', min: 19, max: 24, points: 3 },
            { grade: 'D-', min: 12, max: 18, points: 2 },
            { grade: 'E', min: 0, max: 11, points: 1 }
        ]
    },
    '231': { 
        name: 'BIOLOGY', 
        mandatory: false,
        grades: [
            { grade: 'A', min: 80, max: 100, points: 12 },
            { grade: 'A-', min: 75, max: 79, points: 11 },
            { grade: 'B+', min: 70, max: 74, points: 10 },
            { grade: 'B', min: 65, max: 69, points: 9 },
            { grade: 'B-', min: 60, max: 64, points: 8 },
            { grade: 'C+', min: 55, max: 59, points: 7 },
            { grade: 'C', min: 50, max: 54, points: 6 },
            { grade: 'C-', min: 45, max: 49, points: 5 },
            { grade: 'D+', min: 40, max: 44, points: 4 },
            { grade: 'D', min: 35, max: 39, points: 3 },
            { grade: 'D-', min: 30, max: 34, points: 2 },
            { grade: 'E', min: 0, max: 29, points: 1 }
        ]
    },
    '232': { 
        name: 'PHYSICS', 
        mandatory: false,
        grades: [
            { grade: 'A', min: 60, max: 100, points: 12 },
            { grade: 'A-', min: 55, max: 59, points: 11 },
            { grade: 'B+', min: 50, max: 54, points: 10 },
            { grade: 'B', min: 45, max: 49, points: 9 },
            { grade: 'B-', min: 40, max: 44, points: 8 },
            { grade: 'C+', min: 35, max: 39, points: 7 },
            { grade: 'C', min: 30, max: 34, points: 6 },
            { grade: 'C-', min: 25, max: 29, points: 5 },
            { grade: 'D+', min: 20, max: 24, points: 4 },
            { grade: 'D', min: 15, max: 19, points: 3 },
            { grade: 'D-', min: 10, max: 14, points: 2 },
            { grade: 'E', min: 0, max: 9, points: 1 }
        ]
    },
    '233': { 
        name: 'CHEMISTRY', 
        mandatory: false,
        grades: [
            { grade: 'A', min: 65, max: 100, points: 12 },
            { grade: 'A-', min: 60, max: 64, points: 11 },
            { grade: 'B+', min: 55, max: 59, points: 10 },
            { grade: 'B', min: 50, max: 54, points: 9 },
            { grade: 'B-', min: 45, max: 49, points: 8 },
            { grade: 'C+', min: 40, max: 44, points: 7 },
            { grade: 'C', min: 35, max: 39, points: 6 },
            { grade: 'C-', min: 30, max: 34, points: 5 },
            { grade: 'D+', min: 25, max: 29, points: 4 },
            { grade: 'D', min: 20, max: 24, points: 3 },
            { grade: 'D-', min: 15, max: 19, points: 2 },
            { grade: 'E', min: 0, max: 14, points: 1 }
        ]
    },
    '311': { 
        name: 'HISTORY', 
        mandatory: false,
        grades: [
            { grade: 'A', min: 80, max: 100, points: 12 },
            { grade: 'A-', min: 75, max: 79, points: 11 },
            { grade: 'B+', min: 70, max: 74, points: 10 },
            { grade: 'B', min: 65, max: 69, points: 9 },
            { grade: 'B-', min: 60, max: 64, points: 8 },
            { grade: 'C+', min: 55, max: 59, points: 7 },
            { grade: 'C', min: 50, max: 54, points: 6 },
            { grade: 'C-', min: 45, max: 49, points: 5 },
            { grade: 'D+', min: 40, max: 44, points: 4 },
            { grade: 'D', min: 35, max: 39, points: 3 },
            { grade: 'D-', min: 30, max: 34, points: 2 },
            { grade: 'E', min: 0, max: 29, points: 1 }
        ]
    },
    '312': { 
        name: 'GEOGRAPHY', 
        mandatory: false,
        grades: [
            { grade: 'A', min: 66, max: 100, points: 12 },
            { grade: 'A-', min: 61, max: 65, points: 11 },
            { grade: 'B+', min: 56, max: 60, points: 10 },
            { grade: 'B', min: 51, max: 55, points: 9 },
            { grade: 'B-', min: 46, max: 50, points: 8 },
            { grade: 'C+', min: 41, max: 45, points: 7 },
            { grade: 'C', min: 36, max: 40, points: 6 },
            { grade: 'C-', min: 31, max: 35, points: 5 },
            { grade: 'D+', min: 25, max: 30, points: 4 },
            { grade: 'D', min: 21, max: 25, points: 3 },
            { grade: 'D-', min: 16, max: 20, points: 2 },
            { grade: 'E', min: 0, max: 15, points: 1 }
        ]
    },
    '313': { 
        name: 'CRE', 
        mandatory: false,
        grades: [
            { grade: 'A', min: 90, max: 100, points: 12 },
            { grade: 'A-', min: 85, max: 89, points: 11 },
            { grade: 'B+', min: 80, max: 84, points: 10 },
            { grade: 'B', min: 75, max: 79, points: 9 },
            { grade: 'B-', min: 70, max: 74, points: 8 },
            { grade: 'C+', min: 65, max: 69, points: 7 },
            { grade: 'C', min: 60, max: 64, points: 6 },
            { grade: 'C-', min: 55, max: 59, points: 5 },
            { grade: 'D+', min: 50, max: 54, points: 4 },
            { grade: 'D', min: 45, max: 49, points: 3 },
            { grade: 'D-', min: 40, max: 44, points: 2 },
            { grade: 'E', min: 0, max: 39, points: 1 }
        ]
    },
    '314': { 
        name: 'IRE', 
        mandatory: false,
        grades: [
            { grade: 'A', min: 90, max: 100, points: 12 },
            { grade: 'A-', min: 85, max: 89, points: 11 },
            { grade: 'B+', min: 80, max: 84, points: 10 },
            { grade: 'B', min: 75, max: 79, points: 9 },
            { grade: 'B-', min: 70, max: 74, points: 8 },
            { grade: 'C+', min: 65, max: 69, points: 7 },
            { grade: 'C', min: 60, max: 64, points: 6 },
            { grade: 'C-', min: 55, max: 59, points: 5 },
            { grade: 'D+', min: 50, max: 54, points: 4 },
            { grade: 'D', min: 45, max: 49, points: 3 },
            { grade: 'D-', min: 40, max: 44, points: 2 },
            { grade: 'E', min: 0, max: 39, points: 1 }
        ]
    },
    '443': { 
        name: 'AGRICULTURE', 
        mandatory: false,
        grades: [
            { grade: 'A', min: 88, max: 100, points: 12 },
            { grade: 'A-', min: 83, max: 87, points: 11 },
            { grade: 'B+', min: 78, max: 82, points: 10 },
            { grade: 'B', min: 73, max: 77, points: 9 },
            { grade: 'B-', min: 68, max: 72, points: 8 },
            { grade: 'C+', min: 63, max: 67, points: 7 },
            { grade: 'C', min: 58, max: 62, points: 6 },
            { grade: 'C-', min: 53, max: 57, points: 5 },
            { grade: 'D+', min: 48, max: 52, points: 4 },
            { grade: 'D', min: 43, max: 47, points: 3 },
            { grade: 'D-', min: 38, max: 42, points: 2 },
            { grade: 'E', min: 0, max: 37, points: 1 }
        ]
    },
    '565': { 
        name: 'BUSINESS STUDIES', 
        mandatory: false,
        grades: [
            { grade: 'A', min: 80, max: 100, points: 12 },
            { grade: 'A-', min: 75, max: 79, points: 11 },
            { grade: 'B+', min: 70, max: 74, points: 10 },
            { grade: 'B', min: 65, max: 69, points: 9 },
            { grade: 'B-', min: 60, max: 64, points: 8 },
            { grade: 'C+', min: 55, max: 59, points: 7 },
            { grade: 'C', min: 50, max: 54, points: 6 },
            { grade: 'C-', min: 45, max: 49, points: 5 },
            { grade: 'D+', min: 40, max: 44, points: 4 },
            { grade: 'D', min: 35, max: 39, points: 3 },
            { grade: 'D-', min: 30, max: 34, points: 2 },
            { grade: 'E', min: 0, max: 29, points: 1 }
        ]
    },
    '503': { 
        name: 'ARABIC', 
        mandatory: false,
        grades: [
            { grade: 'A', min: 88, max: 100, points: 12 },
            { grade: 'A-', min: 83, max: 87, points: 11 },
            { grade: 'B+', min: 78, max: 82, points: 10 },
            { grade: 'B', min: 73, max: 77, points: 9 },
            { grade: 'B-', min: 68, max: 72, points: 8 },
            { grade: 'C+', min: 63, max: 67, points: 7 },
            { grade: 'C', min: 58, max: 62, points: 6 },
            { grade: 'C-', min: 53, max: 57, points: 5 },
            { grade: 'D+', min: 48, max: 52, points: 4 },
            { grade: 'D', min: 43, max: 47, points: 3 },
            { grade: 'D-', min: 38, max: 42, points: 2 },
            { grade: 'E', min: 0, max: 37, points: 1 }
        ]
    },
    '451': { 
        name: 'COMPUTER STUDIES', 
        mandatory: false,
        grades: [
            { grade: 'A', min: 88, max: 100, points: 12 },
            { grade: 'A-', min: 83, max: 87, points: 11 },
            { grade: 'B+', min: 78, max: 82, points: 10 },
            { grade: 'B', min: 73, max: 77, points: 9 },
            { grade: 'B-', min: 68, max: 72, points: 8 },
            { grade: 'C+', min: 63, max: 67, points: 7 },
            { grade: 'C', min: 58, max: 62, points: 6 },
            { grade: 'C-', min: 53, max: 57, points: 5 },
            { grade: 'D+', min: 48, max: 52, points: 4 },
            { grade: 'D', min: 43, max: 47, points: 3 },
            { grade: 'D-', min: 38, max: 42, points: 2 },
            { grade: 'E', min: 0, max: 37, points: 1 }
        ]
    }
};

// Subject options for dropdown (excluding mandatory ones which will be auto-added)
const SUBJECT_OPTIONS = [
    { code: '231', name: 'BIOLOGY' },
    { code: '232', name: 'PHYSICS' },
    { code: '233', name: 'CHEMISTRY' },
    { code: '311', name: 'HISTORY' },
    { code: '312', name: 'GEOGRAPHY' },
    { code: '313', name: 'CRE' },
    { code: '314', name: 'IRE' },
    { code: '443', name: 'AGRICULTURE' },
    { code: '565', name: 'BUSINESS STUDIES' },
    { code: '503', name: 'ARABIC' },
    { code: '451', name: 'COMPUTER STUDIES' }
];

// DOM Elements
let studentNameInput, indexNumberInput, subjectCountSelect, calculateBtn, resetBtn;
let subjectContainer, resultsContainer, printBtn, preloader, mainContainer;
let nameError, indexError, countError;
let currentDate, currentYear;

// Application state
let selectedSubjects = [];
let studentResults = [];
let meanGrade = '';

// ============================================
// INITIALIZATION FUNCTION
// ============================================

/**
 * Initializes the application by setting up DOM references,
 * event listeners, and default state.
 */
function initializeApp() {
    // Set current date and year
    const now = new Date();
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById('currentYear').textContent = now.getFullYear();
    
    // Get DOM elements
    studentNameInput = document.getElementById('studentName');
    indexNumberInput = document.getElementById('indexNumber');
    subjectCountSelect = document.getElementById('subjectCount');
    calculateBtn = document.getElementById('calculateBtn');
    resetBtn = document.getElementById('resetBtn');
    subjectContainer = document.getElementById('subjectContainer');
    resultsContainer = document.getElementById('resultsContainer');
    printBtn = document.getElementById('printBtn');
    preloader = document.getElementById('preloader');
    mainContainer = document.getElementById('mainContainer');
    
    // Error message elements
    nameError = document.getElementById('nameError');
    indexError = document.getElementById('indexError');
    countError = document.getElementById('countError');
    
    // Set up event listeners
    setupEventListeners();
    
    // Hide preloader after a short delay
    setTimeout(() => {
        preloader.classList.add('hidden');
        mainContainer.style.opacity = '0';
        mainContainer.style.display = 'block';
        
        setTimeout(() => {
            mainContainer.style.transition = 'opacity 0.5s ease';
            mainContainer.style.opacity = '1';
        }, 50);
    }, 1500);
}

// ============================================
// EVENT LISTENER SETUP
// ============================================

/**
 * Sets up all event listeners for the application.
 */
function setupEventListeners() {
    // Subject count change listener
    subjectCountSelect.addEventListener('change', handleSubjectCountChange);
    
    // Calculate button click listener
    calculateBtn.addEventListener('click', handleCalculateResults);
    
    // Reset button click listener
    resetBtn.addEventListener('click', handleResetForm);
    
    // Print button click listener
    printBtn.addEventListener('click', handlePrintScoreboard);
    
    // Input validation listeners
    studentNameInput.addEventListener('input', validateStudentName);
    indexNumberInput.addEventListener('input', validateIndexNumber);
    
    // Prevent form submission on Enter key in inputs
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
}

// ============================================
// SUBJECT HANDLING FUNCTIONS
// ============================================

/**
 * Handles the change event for the subject count dropdown.
 * Generates subject selection fields based on the selected count.
 */
function handleSubjectCountChange() {
    const count = parseInt(subjectCountSelect.value);
    countError.textContent = '';

    // Validate subject count
    if (isNaN(count) || count < 7 || count > 9) {
        countError.textContent = 'Please select between 7 and 9 subjects';
        subjectContainer.innerHTML = `
            <div class="info-box">
                <i class="fas fa-info-circle"></i>
                <p>Select the number of subjects above to display subject selection fields. <strong>Mandatory subjects:</strong> English, Kiswahili, and Mathematics.</p>
            </div>
        `;
        selectedSubjects = [];
        return;
    }

    // Clear previous subject fields
    subjectContainer.innerHTML = '';

    // Add mandatory subjects first
    selectedSubjects = [
        { code: '101', name: SUBJECTS['101'].name, mandatory: true },
        { code: '102', name: SUBJECTS['102'].name, mandatory: true },
        { code: '121', name: SUBJECTS['121'].name, mandatory: true }
    ];

    // Create subject fields for mandatory subjects
    selectedSubjects.forEach((subject, index) => {
        createSubjectField(subject, index);
    });

    // Calculate how many optional subjects need to be selected by the user
    const optionalCount = count - 3; // Subtract mandatory subjects

    // Add placeholder fields where the user will manually select optional subjects
    for (let i = 0; i < optionalCount; i++) {
        // Use an empty placeholder; the user will pick the subject from the dropdown
        selectedSubjects.push({ code: '', name: 'Select subject', mandatory: false });
        createOptionalSubjectField(selectedSubjects.length - 1);
    }

    // Add info about best 7 subjects
    const infoBox = document.createElement('div');
    infoBox.className = 'info-box';
    infoBox.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <p><strong>Note:</strong> Only the best 7 subjects will be used for calculating the mean grade. Mandatory subjects (English, Kiswahili, Mathematics) must be included. For optional subjects, please use the dropdowns to choose the subjects you took.</p>
    `;
    subjectContainer.appendChild(infoBox);

    // Ensure dropdown options are synced (no duplicates)
    updateSubjectSelectOptions();
}

/**
 * Creates a subject input field for the given subject.
 * @param {Object} subject - The subject object containing code, name, and mandatory flag
 * @param {number} index - The index of the subject in the selectedSubjects array
 */
function createSubjectField(subject, index) {
    const subjectField = document.createElement('div');
    subjectField.className = 'subject-field';
    subjectField.dataset.index = index;

    // Create subject field HTML
    subjectField.innerHTML = `
        <div class="subject-field-header">
            <h4>${subject.name} <span class="subject-code">(${subject.code})</span></h4>
            ${subject.mandatory ? '<span class="mandatory-badge">Mandatory</span>' : ''}
        </div>
        <div class="subject-field-content">
            <div>
                <label for="mark-${subject.code}">Enter Marks (0-100)</label>
                <input 
                    type="number" 
                    id="mark-${subject.code}" 
                    class="form-control mark-input" 
                    min="0" 
                    max="100" 
                    placeholder="Enter marks"
                    data-subject="${subject.code}"
                >
                <div class="error-message" id="error-${subject.code}"></div>
            </div>
            <div>
                <label for="grade-${subject.code}">Grade</label>
                <input 
                    type="text" 
                    id="grade-${subject.code}" 
                    class="form-control grade-display" 
                    readonly 
                    placeholder="Will be calculated"
                >
            </div>
        </div>
    `;

    subjectContainer.appendChild(subjectField);

    // Add input event listener for mark validation
    const markInput = subjectField.querySelector('.mark-input');
    markInput.addEventListener('input', function() {
        validateMarkInput(this);
        updateGradeDisplay(this);
    });
}

/**
 * Creates an optional subject field with a dropdown so the user can pick the subject manually.
 * @param {number} index - Index in selectedSubjects where this placeholder lives
 */
function createOptionalSubjectField(index) {
    const subjectField = document.createElement('div');
    subjectField.className = 'subject-field';
    subjectField.dataset.index = index;

    // Build the dropdown options
    const optionsHtml = SUBJECT_OPTIONS.map(opt => `<option value="${opt.code}">${opt.name}</option>`).join('\n');

    subjectField.innerHTML = `
        <div class="subject-field-header">
            <label for="select-subject-${index}">Select Optional Subject</label>
        </div>
        <div class="subject-field-content">
            <div>
                <select id="select-subject-${index}" class="form-control subject-select">
                    <option value="">-- Select subject --</option>
                    ${optionsHtml}
                </select>
                <div class="error-message" id="error-select-${index}"></div>
            </div>
            <div>
                <label for="grade-select-${index}">Grade</label>
                <input 
                    type="text" 
                    id="grade-select-${index}" 
                    class="form-control grade-display" 
                    readonly 
                    placeholder="Will be calculated when marks entered"
                >
            </div>
        </div>
        <div class="subject-field-content">
            <div>
                <label for="mark-select-${index}">Enter Marks (0-100)</label>
                <input 
                    type="number" 
                    id="mark-select-${index}" 
                    class="form-control mark-input" 
                    min="0" 
                    max="100" 
                    placeholder="Enter marks"
                    disabled
                >
                <div class="error-message" id="error-mark-select-${index}"></div>
            </div>
        </div>
    `;

    subjectContainer.appendChild(subjectField);

    const selectEl = subjectField.querySelector('.subject-select');
    const markInput = subjectField.querySelector(`#mark-select-${index}`);
    const gradeInput = subjectField.querySelector(`#grade-select-${index}`);

    // When user picks a subject, update selectedSubjects and enable mark input
    selectEl.addEventListener('change', function() {
        const code = this.value;

        // Clear previous error
        const selectError = document.getElementById(`error-select-${index}`);
        selectError.textContent = '';

        if (!code) {
            // User cleared selection
            selectedSubjects[index] = { code: '', name: 'Select subject', mandatory: false };
            markInput.disabled = true;
            markInput.value = '';
            markInput.removeAttribute('data-subject');
            gradeInput.value = '';
            markInput.id = `mark-select-${index}`;
            gradeInput.id = `grade-select-${index}`;
            // Reset the error element id inside this field (use the field's error message element)
            const fieldError = subjectField.querySelector('.error-message');
            if (fieldError) fieldError.id = `error-mark-select-${index}`;
            updateSubjectSelectOptions();
            return;
        }

        // Set the selected subject info
        const subjectName = SUBJECTS[code] ? SUBJECTS[code].name : SUBJECT_OPTIONS.find(o => o.code === code).name;
        selectedSubjects[index] = { code: code, name: subjectName, mandatory: false };

        // Update mark input to use the subject code for ids and data attributes
        markInput.disabled = false;
        // Rename error element id so validate functions can find it by `error-<code>`
        const fieldError = subjectField.querySelector('.error-message');
        if (fieldError) fieldError.id = `error-${code}`;
        markInput.id = `mark-${code}`;
        markInput.setAttribute('data-subject', code);
        gradeInput.id = `grade-${code}`;

        // Use oninput to avoid attaching multiple listeners on repeated changes
        markInput.oninput = function() {
            validateMarkInput(this);
            updateGradeDisplay(this);
        };

        // Update header display to show chosen subject
        const header = subjectField.querySelector('.subject-field-header');
        header.innerHTML = `<h4>${subjectName} <span class="subject-code">(${code})</span></h4>`;

        // Sync options across other selects to prevent duplicates
        updateSubjectSelectOptions();
    });
}

/**
 * Ensures subject dropdowns do not allow selecting the same subject twice.
 */
function updateSubjectSelectOptions() {
    const selects = document.querySelectorAll('.subject-select');
    const chosen = new Set();

    // Collect chosen codes
    selects.forEach(s => { if (s.value) chosen.add(s.value); });

    // For each select, enable/disable options based on other selections
    selects.forEach(select => {
        const currentValue = select.value;
        Array.from(select.options).forEach(option => {
            if (!option.value) return; // placeholder
            // If option is chosen elsewhere and not the current select value, disable it
            if (option.value !== currentValue && chosen.has(option.value)) {
                option.disabled = true;
            } else {
                option.disabled = false;
            }
        });
    });
}

/**
 * Validates a mark input field.
 * @param {HTMLInputElement} input - The mark input element
 */
function validateMarkInput(input) {
    const mark = parseFloat(input.value);
    const subjectCode = input.dataset.subject;
    const errorElement = document.getElementById(`error-${subjectCode}`);
    
    // Clear previous error
    if (errorElement) errorElement.textContent = '';
    input.classList.remove('error');
    
    // Validate mark
    if (isNaN(mark)) {
        if (input.value.trim() !== '') {
            if (errorElement) errorElement.textContent = 'Please enter a valid number';
            input.classList.add('error');
        }
        return;
    }
    
    if (mark < 0 || mark > 100) {
        if (errorElement) errorElement.textContent = 'Marks must be between 0 and 100';
        input.classList.add('error');
        return;
    }
    
    // Mark is valid
    input.classList.remove('error');
}

/**
 * Updates the grade display for a subject based on the entered mark.
 * @param {HTMLInputElement} input - The mark input element
 */
function updateGradeDisplay(input) {
    const mark = parseFloat(input.value);
    const subjectCode = input.dataset.subject;
    const gradeDisplay = document.getElementById(`grade-${subjectCode}`);
    
    if (isNaN(mark) || mark < 0 || mark > 100) {
        gradeDisplay.value = '';
        gradeDisplay.className = 'form-control grade-display';
        return;
    }
    
    // Calculate grade based on mark
    const gradeInfo = calculateGrade(subjectCode, mark);
    if (gradeInfo) {
        gradeDisplay.value = gradeInfo.grade;
        gradeDisplay.className = `form-control grade-display grade-${gradeInfo.grade.replace('+', '-plus').replace('-', '-minus')}`;
    } else {
        gradeDisplay.value = 'Error';
        gradeDisplay.className = 'form-control grade-display';
    }
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Validates the student name input.
 */
function validateStudentName() {
    const name = studentNameInput.value.trim();
    
    if (name.length === 0) {
        nameError.textContent = 'Student name is required';
        studentNameInput.classList.add('error');
        return false;
    }
    
    if (name.length < 3) {
        nameError.textContent = 'Name must be at least 3 characters';
        studentNameInput.classList.add('error');
        return false;
    }
    
    nameError.textContent = '';
    studentNameInput.classList.remove('error');
    return true;
}

/**
 * Validates the index number input.
 */
function validateIndexNumber() {
    const index = indexNumberInput.value.trim();
    
    if (index.length === 0) {
        indexError.textContent = 'Index number is required';
        indexNumberInput.classList.add('error');
        return false;
    }
    
    if (index.length < 5) {
        indexError.textContent = 'Index number must be at least 5 characters';
        indexNumberInput.classList.add('error');
        return false;
    }
    
    indexError.textContent = '';
    indexNumberInput.classList.remove('error');
    return true;
}

/**
 * Validates all subject marks.
 * @returns {boolean} True if all marks are valid, false otherwise
 */
function validateAllMarks() {
    let isValid = true;
    const markInputs = document.querySelectorAll('.mark-input');
    
    markInputs.forEach(input => {
        const mark = parseFloat(input.value);
        const subjectCode = input.dataset.subject;
        const errorElement = document.getElementById(`error-${subjectCode}`);
        
        // Check if mark is empty
        if (isNaN(mark)) {
            if (errorElement) errorElement.textContent = 'Marks are required for all subjects';
            input.classList.add('error');
            isValid = false;
            return;
        }
        
        // Check if mark is within valid range
        if (mark < 0 || mark > 100) {
            if (errorElement) errorElement.textContent = 'Marks must be between 0 and 100';
            input.classList.add('error');
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validates that all mandatory subjects are included.
 * @returns {boolean} True if all mandatory subjects are included, false otherwise
 */
function validateMandatorySubjects() {
    const mandatorySubjects = ['101', '102', '121'];
    let missingSubjects = [];
    
    mandatorySubjects.forEach(code => {
        const input = document.getElementById(`mark-${code}`);
        if (!input || isNaN(parseFloat(input.value))) {
            missingSubjects.push(SUBJECTS[code].name);
        }
    });
    
    if (missingSubjects.length > 0) {
        countError.textContent = `Missing marks for mandatory subjects: ${missingSubjects.join(', ')}`;
        return false;
    }
    
    return true;
}

// ============================================
// GRADE CALCULATION FUNCTIONS
// ============================================

/**
 * Calculates the grade for a subject based on the mark.
 * @param {string} subjectCode - The subject code
 * @param {number} mark - The mark obtained
 * @returns {Object|null} Grade information object or null if not found
 */
function calculateGrade(subjectCode, mark) {
    const subject = SUBJECTS[subjectCode];
    if (!subject) return null;
    
    // Find the grade that matches the mark
    for (const gradeInfo of subject.grades) {
        if (mark >= gradeInfo.min && mark <= gradeInfo.max) {
            return {
                grade: gradeInfo.grade,
                points: gradeInfo.points
            };
        }
    }
    
    return null;
}

/**
 * Calculates results for all subjects and determines the best 7.
 */
function calculateResults() {
    studentResults = [];
    
    // Calculate grade and points for each subject
    selectedSubjects.forEach(subject => {
        const input = document.getElementById(`mark-${subject.code}`);
        const mark = parseFloat(input.value);
        
        if (!isNaN(mark)) {
            const gradeInfo = calculateGrade(subject.code, mark);
            if (gradeInfo) {
                studentResults.push({
                    code: subject.code,
                    name: subject.name,
                    mark: mark,
                    grade: gradeInfo.grade,
                    points: gradeInfo.points,
                    mandatory: subject.mandatory
                });
            }
        }
    });
    
    // Sort by points (descending) to get best subjects
    studentResults.sort((a, b) => b.points - a.points);
    
    // Ensure mandatory subjects are included in best 7
    const mandatoryResults = studentResults.filter(r => r.mandatory);
    const optionalResults = studentResults.filter(r => !r.mandatory);
    
    // Take top optional subjects to make total of 7
    const bestOptionalCount = Math.min(optionalResults.length, 7 - mandatoryResults.length);
    const bestOptional = optionalResults.slice(0, bestOptionalCount);
    
    // Combine mandatory and best optional subjects
    const bestSeven = [...mandatoryResults, ...bestOptional];
    
    // Sort best seven alphabetically by subject name for display
    bestSeven.sort((a, b) => a.name.localeCompare(b.name));
    
    // Calculate mean grade points
    const totalPoints = bestSeven.reduce((sum, subject) => sum + subject.points, 0);
    const meanPoints = totalPoints / 7;
    
    // Convert mean points to grade
    meanGrade = convertPointsToGrade(meanPoints);
    
    return { bestSeven, meanGrade };
}

/**
 * Converts mean points to a grade.
 * @param {number} points - The mean points
 * @returns {string} The corresponding grade
 */
function convertPointsToGrade(points) {
    // Round to nearest integer
    const roundedPoints = Math.round(points);
    
    // Map points to grades
    if (roundedPoints >= 12) return 'A';
    if (roundedPoints >= 11) return 'A-';
    if (roundedPoints >= 10) return 'B+';
    if (roundedPoints >= 9) return 'B';
    if (roundedPoints >= 8) return 'B-';
    if (roundedPoints >= 7) return 'C+';
    if (roundedPoints >= 6) return 'C';
    if (roundedPoints >= 5) return 'C-';
    if (roundedPoints >= 4) return 'D+';
    if (roundedPoints >= 3) return 'D';
    if (roundedPoints >= 2) return 'D-';
    return 'E';
}

// ============================================
// UI UPDATE FUNCTIONS
// ============================================

/**
 * Handles the calculate results button click.
 */
function handleCalculateResults() {
    // Validate all inputs
    const isNameValid = validateStudentName();
    const isIndexValid = validateIndexNumber();
    const areMarksValid = validateAllMarks();
    const areMandatorySubjectsValid = validateMandatorySubjects();
    
    if (!isNameValid || !isIndexValid || !areMarksValid || !areMandatorySubjectsValid) {
        // Scroll to the first error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // Calculate results
    const { bestSeven, meanGrade } = calculateResults();
    
    // Generate results display
    generateResultsDisplay(bestSeven, meanGrade);
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Generates the results display HTML.
 * @param {Array} bestSeven - Array of the best 7 subjects
 * @param {string} meanGrade - The calculated mean grade
 */
function generateResultsDisplay(bestSeven, meanGrade) {
    const studentName = studentNameInput.value.trim();
    const indexNumber = indexNumberInput.value.trim();
    
    // Create scoreboard HTML
    const scoreboardHTML = `
        <div class="scoreboard">
            <div class="scoreboard-header">
                <h3>KCSE SCOREBOARD</h3>
                <p class="scoreboard-subtitle">Kenya Certificate of Secondary Education - Official Grading</p>
            </div>
            <div class="scoreboard-body">
                <div class="student-info">
                    <div class="student-info-item">
                        <div class="student-info-label">Student Name</div>
                        <div class="student-info-value">${studentName}</div>
                    </div>
                    <div class="student-info-item">
                        <div class="student-info-label">Index Number</div>
                        <div class="student-info-value">${indexNumber}</div>
                    </div>
                    <div class="student-info-item">
                        <div class="student-info-label">Grading Date</div>
                        <div class="student-info-value">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                    <div class="student-info-item">
                        <div class="student-info-label">Subjects Graded</div>
                        <div class="student-info-value">${bestSeven.length} (Best 7)</div>
                    </div>
                </div>
                
                <table class="results-table">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${bestSeven.map(subject => `
                            <tr>
                                <td class="subject-name">${subject.name}</td>
                                <td>
                                    <span class="grade-badge grade-${subject.grade.replace('+', '-plus').replace('-', '-minus')}">
                                        ${subject.grade}
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="mean-grade-container">
                    <div class="mean-grade-label">MEAN GRADE</div>
                    <div class="mean-grade-value">${meanGrade}</div>
                </div>
                
                <div class="grading-note">
                    <p><i class="fas fa-info-circle"></i> <strong>Note:</strong> This scoreboard is based on the best 7 subjects as per KCSE regulations. Mandatory subjects (English, Kiswahili, Mathematics) are included in the calculation.</p>
                </div>
            </div>
        </div>
    `;
    
    // Update results container
    resultsContainer.innerHTML = scoreboardHTML;
    
    // Show print button container
    document.getElementById('printContainer').style.display = 'block';
}

/**
 * Handles the reset form button click.
 */
function handleResetForm() {
    // Clear all inputs
    studentNameInput.value = '';
    indexNumberInput.value = '';
    subjectCountSelect.value = '';
    
    // Clear error messages
    nameError.textContent = '';
    indexError.textContent = '';
    countError.textContent = '';
    
    // Remove error classes
    studentNameInput.classList.remove('error');
    indexNumberInput.classList.remove('error');
    
    // Clear subject container
    subjectContainer.innerHTML = `
        <div class="info-box">
            <i class="fas fa-info-circle"></i>
            <p>Select the number of subjects above to display subject selection fields. <strong>Mandatory subjects:</strong> English, Kiswahili, and Mathematics.</p>
        </div>
    `;
    
    // Clear results
    resultsContainer.innerHTML = `
        <div class="placeholder-results">
            <div class="placeholder-icon">
                <i class="fas fa-file-alt"></i>
            </div>
            <h3>Results will appear here</h3>
            <p>Enter student information and subject marks, then click "Calculate Results"</p>
        </div>
    `;
    
    // Hide print button
    document.getElementById('printContainer').style.display = 'none';
    
    // Reset state
    selectedSubjects = [];
    studentResults = [];
    meanGrade = '';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// PRINT FUNCTIONALITY
// ============================================

/**
 * Handles the print scoreboard button click.
 */
function handlePrintScoreboard() {
    window.print();
}

// ============================================
// INITIALIZE APPLICATION
// ============================================

// Initialize the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);