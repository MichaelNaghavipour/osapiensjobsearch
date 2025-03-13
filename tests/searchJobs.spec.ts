import { test, expect } from '@playwright/test';

// TODO == Improvement Idea
// TODO: implement Page Object Model for better maintainability. For example:
// class JobsPage {
//   constructor(page) {
//     this.page = page
//     this.url = 'https://osapiens.jobs.personio.com/'
//     this.jobCards = '.job-box-link'
//     this.jobTitles = '.jb-title'
//   }
// }
// TODO: stor URL, selectors and testdata separately for bettr maintnance

test('Osapiens Quality Jobs', async ({ page }) => {
  // Load the jobs page
  await page.goto('https://osapiens.jobs.personio.com/')

  // TODo: Wait for the jobs to be visible. example:
  // await page.waitForSelector('.job-box-link', { state: 'visible' })

  // Count only visible job listings
  // Hint: If we list all the jobs in DOM, we can see that there are 159 jobs in total
  const numberOfJobs = await page.locator('.job-box-link:visible').count()
  console.log(`Number of open jobs: ${numberOfJobs}`)
  
  // TODO: Verify that jobs are loaded
  // expect(numberOfJobs, 'No jobs found or page not loaded correctly').toBeGreaterThan(0)

  // Get all job titles containing word "Quality"
  const qualityJobTitles = await page.locator('.job-box-link').evaluateAll(
     // TODO: Include variations in title like 'QA' and 'QE'
    // TODO: Search case-insensitive (e.g., qa, QA, Qa, qA, etc.)
    elements => [...new Set(elements.map(el => el.textContent))]
      .filter(text => text && text.includes('Quality'))
  )
  
  console.log(`Number of jobs with "Quality" in the title: ${qualityJobTitles.length}`)

  // Assertion to fail the test if no jobs titles containing "Quality" are found
  expect(qualityJobTitles.length, 'No job titles containing "Quality" were found').toBeGreaterThan(0)
})

// Further TODOs: consider adding more test cases such as
// -> Testing search functionality
// Test filters (Category, Exmployment type, Locations, etc.)
