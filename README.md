# Portfolio Website

A personal portfolio website built with modern web technologies, featuring a responsive dark theme design, animated UI elements, and comprehensive SEO optimization for maximum visibility and performance.

🌐 **Live Site**: [https://chawardolaniket.vercel.app](https://chawardolaniket.vercel.app)

## Features

- **SEO Optimized**: Complete meta tags, structured data, sitemap, and social media optimization
- **Responsive Design**: Optimized for all device sizes
- **Animated UI**: Smooth animations and transitions using Framer Motion
- **Interactive Sections**:
  - Hero section with animated text
  - About section with blur-reveal text effect
  - Skills showcase with tech tiles
  - Projects portfolio with project details
  - GitHub integration showing contribution activity
  - Contact form with EmailJS integration
- **Custom Animations**: MetaBalls animation, northern lights effect, and more
- **GitHub Activity Visualization**: Contribution heatmap and repository stats

## Technologies Used

- **Frontend Framework**: React with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, React-bits
- **3D Elements**: Spline
- **External APIs**:
  - GitHub API for repository and contribution data
  - LeetCode Stats API for coding statistics
- **Form Processing**: EmailJS for contact form submissions
- **UI Components**: React-bits components with spotlight effects, themed cards
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/aniketchawardol/portfolio
   cd portfolio
   ```

2. Install dependencies

   ```sh
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the project root with the following variables:

   ```
   VITE_APP_GITHUB_TOKEN=your_github_token
   VITE_SERVICE_ID=your_emailjs_service_id
   VITE_TEMPLATE_ID=your_emailjs_template_id
   VITE_PUBLIC_KEY=your_emailjs_public_key
   ```

4. Start the development server
   ```sh
   npm run dev
   # or
   yarn dev
   ```

## Customization

The portfolio is designed to be easily customizable:

- **Personal Information**: Update content in component files
- **Projects**: Modify the `projects` array in `ProjectsSection.jsx`
- **Skills**: Edit the `allTechnologies` array in `SkillsSection.jsx`
- **Color Schemes**: Modify the gradient variables in each section component
- **GitHub Integration**: Update the username in `GitHubStats.jsx` component

## Building for Production

```sh
npm run build
# or
yarn build
```

The build artifacts will be located in the `dist/` directory.

## Deployment

This site can be deployed to any static site hosting service such as Vercel, Netlify, or GitHub Pages.

```sh
npm run preview
# or
yarn preview
```

## Resources

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React-bits](https://www.reactbits.dev/) - UI component library
- [Spline](https://spline.design/) - 3D design tool
- [All Free Fonts](https://www.allfreefonts.co/) - Font resources
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [EmailJS](https://www.emailjs.com/) - Email sending service
