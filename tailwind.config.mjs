/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: [
	"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	extend: {
		colors: {
			foreground: 'hsl(var(--foreground))',
			TextColor: '0x3B0014',
			background: 'hsl(var(--background))',
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			}
		},
		fontFamily: {
			sans: [
					'Poppins',
					'ChakraPetch',
					'sans-serif'
			],
			sketch: [
				'sketch',
				'cursive'
			],
			handodle: [
				'Handodle',
				'cursive'
			],
			roashe: [
				'Roashe',
				'serif'
			]
		},
		fontSize: {
			"10xl": "10rem",
			"11xl": "11rem",
			"12xl": "12rem",
			"13xl": "13rem",
		},
		theme: {
			fontWeight: {
				thin: '100',
				hairline: '100',
				extralight: '200',
				light: '300',
				normal: '400',
				medium: '500',
				semibold: '600',
				bold: '700',
				extrabold: '800',
				'extra-bold': '800',
				black: '900'
			}
		},
		keyframes: {
			'loop-scroll': {
				'0%': {
					transform: 'translateX(0)'
				},
				'100%': {
					transform: 'translateX(-50%)'
				}
			},
			"horizontal-scroll": {
				from: { transform: "translateX(0)" },
				to: { transform: "translateX(-100%)" },
			},
			"horizontal-scroll-2": {
				from: { transform: "translateX(100%)" },
				to: { transform: "translateX(0)" },
			}
		},
		animation: {
			'loop-scroll': 'loop-scroll 30s linear infinite',
			"horizontal-scroll": "horizontal-scroll linear 16s infinite",
			"horizontal-scroll-2": "horizontal-scroll-2 linear 16s infinite",
		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		}
	}
  },
  plugins: [
	require("tailwindcss-animate"),
	require('@tailwindcss/forms')
  ]
};

export default config;
