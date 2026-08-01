const loginWith = async (username, password, page) => {
  await page.getByLabel(/username/i).fill(username);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole('button', { name: /login/i}).click();
}

const createBlogWith = async (title, author, url, page) => {
  await page.getByRole('button', { name: /create new blog/i}).click();
  await page.getByLabel(/title/i).fill(title);
  await page.getByLabel(/author/i).fill(author);
  await page.getByLabel(/url/i).fill(url);
  await page.getByRole('button', { name: /create/i }).click();
  await page.locator('li').filter({ hasText: /title/i }).filter({ hasText: title }).waitFor();
}

module.exports = { loginWith, createBlogWith };