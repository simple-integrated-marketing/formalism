// Formalism

console.log('==============');
console.log('Formalism JS loaded');
console.log('==============');

// Polyfill
// import 'core-js/modules/es6.array.for-each.js'

/**
 * Add a class to form fields when they aren't empty
 */
const initFilledClasses = fields => {

    const handleBlurEvent = ({
        target
    }) => {
        if (target.tagName === 'SELECT' && target.options.length > 0) {
            // Check if selected option has a label, to cater for placeholders
            const selectedIndex = target.options.selectedIndex;
            target.classList.toggle(
                'is-filled',
                target.options[selectedIndex].label.length > 0
            );
        } else {
            // Otherwise, check value!
            target.classList.toggle('is-filled', target.value.length > 0);
        }
        // TODO: Cater for checkboxes and radios
    };

    // Add listeners for blur events on form fields
    fields.forEach(field => field.addEventListener('blur', handleBlurEvent));
}

/**
 * Autoexpand textareas
 */
const initTextareas = fields => {

    // Add listeners for input events on form fields
    const handleInputEvent = ({
        target
    }) => {
        if (target.tagName.toLowerCase() !== 'textarea') return;
        expandTextarea(target);
    };

    // Make a textarea expand to fit the user input
    const expandTextarea = target => {
        // Reset field height
        target.style.height = 'inherit';
        // Calculate the textarea height
        const offset = target.offsetHeight - target.clientHeight;
        // Add the height
        target.style.height = `${target.scrollHeight + offset}px`;
    };

    // Add listeners for input events on form fields
    fields.forEach(field => field.addEventListener('input', handleInputEvent));
}

const initFormalism = () => {
    const fields = document.querySelectorAll('[data-field]');
    initFilledClasses(fields);
    initTextareas(fields);
}

initFormalism();

export {
    initFormalism
}