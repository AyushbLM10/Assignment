/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
		  keyframes: {
			heartbeat: {
			  '0%, 100%': { transform: 'scale(1)' },
			  '50%': { transform: 'scale(1.3)' },
			},
		  },
		  animation: {
			heartbeat: 'heartbeat 1s infinite',
		  },
		},
	  },
	  plugins: [],
	};
