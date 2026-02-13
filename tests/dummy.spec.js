import { expect } from '@playwright/test';
import { test } from '../ui-lib/fixtures.js';
import createDescribe from '../ui-lib/describe.js';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';

const describe = createDescribe("dummy.spec.js");

describe('Dummy category', () => {
        test('Page title', async ({ page }) => {
            await page.goto('/');
            await expect(page).toHaveTitle('What is this site? | Wise Trout');
        })
});

describe('Using CSV module', () => {
    const csv = readFileSync('metadata/suites/dummy-suite/data.csv');
    const records = parse(csv, {
        columns: true,
        skip_empty_lines: true
    })
    records.forEach(record => {
        test(record.label, async ({page}) => {
            await page.goto(record.URL);
            await expect(page).toHaveTitle(record.title  + ' | Wise Trout');
        })
    })
});