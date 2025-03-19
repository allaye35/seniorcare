/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                pastelGreen: "#ccebc5",
                pastelBlue: "#b3cde0",
            },
        }
    },
    plugins: [],
};
