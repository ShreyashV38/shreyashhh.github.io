<wizard-report>
# PostHog post-wizard report

The wizard has completed a full PostHog analytics integration for your React Router v7 (Declarative mode) portfolio application. PostHog is initialized in `src/main.tsx` with `PostHogProvider` and `PostHogErrorBoundary` wrapping the app, enabling automatic error capture for unhandled React errors. Environment variables are stored in `.env` and referenced via `import.meta.env`. A total of 14 custom events are tracked across 5 key files, covering every major visitor interaction — CTA clicks, project engagement, contact form submissions, portfolio likes, peer review submissions, and certificate and social link clicks.

| Event Name | Description | File |
|---|---|---|
| `contact_form_submitted` | User submits the contact form with their message. | `src/sections/Contact.tsx` |
| `portfolio_liked` | User clicks the like button to like the portfolio. | `src/sections/Contact.tsx` |
| `portfolio_unliked` | User clicks the like button to unlike the portfolio. | `src/sections/Contact.tsx` |
| `social_link_clicked` | User clicks a social media link in the contact section. | `src/sections/Contact.tsx` |
| `project_github_clicked` | User clicks the GitHub link on a project card to view source code. | `src/sections/Projects.tsx` |
| `project_live_clicked` | User clicks the live demo link on a project card. | `src/sections/Projects.tsx` |
| `view_all_projects_clicked` | User clicks the View All Projects link to navigate to the full projects page. | `src/sections/Projects.tsx` |
| `hero_view_projects_clicked` | User clicks the View Projects CTA button in the hero section. | `src/sections/Hero.tsx` |
| `hero_contact_clicked` | User clicks the Contact Me CTA button in the hero section. | `src/sections/Hero.tsx` |
| `hero_social_link_clicked` | User clicks a social media link in the hero section. | `src/sections/Hero.tsx` |
| `review_submitted` | User submits a review with a rating and comment. | `src/sections/Reviews.tsx` |
| `review_liked` | User likes a review entry. | `src/sections/Reviews.tsx` |
| `view_all_certificates_clicked` | User clicks the View All Certificates link to navigate to the certificates page. | `src/sections/Certificates.tsx` |
| `certificate_image_clicked` | User clicks on a certificate image to view the full certificate. | `src/sections/Certificates.tsx` |

## Next steps

We've built a dashboard and five insights to keep an eye on user behavior:

- **Dashboard**: [Analytics basics (wizard)](https://us.posthog.com/project/506160/dashboard/1828049)
- **Insight**: [Contact form submissions (wizard)](https://us.posthog.com/project/506160/insights/lFogkoC7)
- **Insight**: [Portfolio engagement funnel (wizard)](https://us.posthog.com/project/506160/insights/MftJKFEB)
- **Insight**: [Social link clicks by platform (wizard)](https://us.posthog.com/project/506160/insights/CBMDeClo)
- **Insight**: [Portfolio likes over time (wizard)](https://us.posthog.com/project/506160/insights/txNE3jld)
- **Insight**: [Project clicks by title (wizard)](https://us.posthog.com/project/506160/insights/cW7f4mXo)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `VITE_PUBLIC_POSTHOG_PROJECT_TOKEN` and `VITE_PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-react-react-router-7-declarative/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
