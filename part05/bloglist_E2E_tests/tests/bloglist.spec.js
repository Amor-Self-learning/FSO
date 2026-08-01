const { describe, beforeEach, expect, test } = require('@playwright/test');
const baseURL = 'http://localhost:5173';
const helper = require('./helper');

describe('Blog App', () => {
  beforeEach(async ({page, request}) => {
    await request.post(`${baseURL}/api/testing/reset`);
    await request.post(`${baseURL}/api/users`, {
      data: {
        name: 'Abdul Samad',
        username: 'amorzephyr',
        password: 'Zephyr@CS'
      }
    });
    await request.post(`${baseURL}/api/users`, {
      data: {
        name : 'Haris Baig',
        username: 'haris_baig',
        password: 'Haris@CS'
      }
    })
    await page.goto(baseURL);
  });

  test('Login form is shown', async ({page}) => {
    await expect(page.getByLabel(/username/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /login/i})).toBeVisible();
  });

  describe('Login', () => {
    test('Succeed with correct crendentials', async ({page}) => {
      helper.loginWith('amorzephyr', 'Zephyr@CS', page);
      await expect(page.getByText('Succesfully logged in as amorzephyr')).toBeVisible();
    });

    test('Failed with wrong credentials', async ({page}) => {
      helper.loginWith('amorzephyr', 'wrong', page);
      await expect(page.getByText('Succesfully logged in as amorzephyr')).not.toBeVisible();
      await expect(page.getByText('Invalid username or password')).toBeVisible();
    });
  });

  describe('When logged in', () => {
    test('New blog can be created', async ({page}) => {
      helper.loginWith('amorzephyr', 'Zephyr@CS', page);
      helper.createBlogWith('Next JS', 'Abdul Samad', 'https://amorzephyr.io/blogs/nextjs', page);
      await expect(page.getByText(/Added a new blog Next JS by Abdul Samad/i)).toBeVisible();
      await expect(page.locator('li').filter({ hasText: /title/i }).filter({ hasText: /Next JS/ })).toBeVisible();
      await expect(page.locator('li').filter({ hasText: /author/i }).filter({ hasText: /Abdul Samad/ })).toBeVisible();
    });

    test('A blog can be liked', async ({page}) => {
      helper.loginWith('amorzephyr', 'Zephyr@CS', page);
      helper.createBlogWith('Next JS', 'Abdul Samad', 'https://amorzephyr.io/blogs/nextjs', page);
      await page.getByRole('button', { name: 'view' }).click();
      await page.getByRole('button', { name: 'like' }).click();
      await expect(page.locator('li').filter({ hasText: /likes/i}).filter({hasText: /1/})).toBeVisible();
    })

    test('A blog added by the user can be deleted', async ({page}) => {
      helper.loginWith('amorzephyr', 'Zephyr@CS', page);
      helper.createBlogWith('Next JS', 'Abdul Samad', 'https://amorzephyr.io/blogs/nextjs', page);
      await page.getByRole('button', { name: 'view' }).click();
      page.on('dialog', async dialog => {
        await dialog.accept();
      });
      await page.getByRole('button', { name: /delete/i }).click();
      await expect(page.getByText(/Successfully deleted blog Next JS/i)).toBeVisible();
      await expect(page.locator('li').filter({ hasText: /title/i }).filter({ hasText: /Next JS/ })).not.toBeVisible();
      await expect(page.locator('li').filter({ hasText: /author/i }).filter({ hasText: /Abdul Samad/ })).not.toBeVisible();
    });

    test('Show delete button on blog only if blog is added by the user', async ({page}) => {
      await helper.loginWith('amorzephyr', 'Zephyr@CS', page);
      await helper.createBlogWith('Next JS', 'Abdul Samad', 'https://amorzephyr.io/blogs/nextjs', page);
      await page.getByRole('button', { name: /logout/i}).click();
      await helper.loginWith('haris_baig', 'Haris@CS', page);
      await expect(page.getByRole('button', { name: /delete/i })).not.toBeVisible();
    });

    test('Blogs are sorted by number of likes high to low', async ({page, request}) => {
    await helper.loginWith('amorzephyr', 'Zephyr@CS', page);
    await helper.createBlogWith('Next JS', 'Abdul Samad', 'https://amorzephyr.io/blogs/nextjs', page);
    await helper.createBlogWith('Python', 'Fahad Rqfiq', 'https://fahad.io/blogs/python', page);
    await helper.createBlogWith('C/C++', 'Abdul Samad', 'https://zephyr.io/blogs/cpp', page);
    await helper.createBlogWith('Express JS', 'Zephyr', 'https://zephyr.os/blogs/expressjs', page);

    const lastBlog = page.locator('.blog').last();
    await lastBlog.getByRole('button', { name: /view/i }).click();
    await lastBlog.getByRole('button', { name: /like/i }).click();
    await lastBlog.getByRole('button', { name: /like/i }).click();
    await lastBlog.getByRole('button', { name: /hide/i }).click();

    const firstBlog = page.locator('.blog').first();
    await lastBlog.getByRole('button', { name: /view/i }).click();
    await firstBlog.getByRole('button', { name: /like/i }).click();

    const allBlogs = page.locator('.blog');
    await expect(allBlogs).toHaveCount(4);

    await expect(
      allBlogs.first().locator('li').filter({ has: page.locator('b').filter({ hasText: /title/i }) })
    ).toContainText(/Express JS/);
    await expect(
      allBlogs.nth(1).locator('li').filter({ has: page.locator('b').filter({ hasText: /title/i }) })
    ).toContainText(/Next JS/);
    await expect(
      allBlogs.nth(2).locator('li').filter({ has: page.locator('b').filter({ hasText: /title/i }) })
    ).toContainText(/Python/);
    await expect(
      allBlogs.last().locator('li').filter({ has: page.locator('b').filter({ hasText: /title/i })})
    ).toContainText(/C\/C\+\+/);
  });
  });
});