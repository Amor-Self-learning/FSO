import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BlogFrom from './BlogForm';

describe('<BlogForm />', () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  };

  it('It calls addToBlogs with write details when new note is created', async () => {
    const mockAddToBlogs = vi.fn();
    const user = userEvent.setup();

    render(
      <BlogFrom
        action=""
        addToBlogs={mockAddToBlogs}
        setMessage={() => {}}
        setBlogFormVisible={() => {}}
      />
    );
    const title = screen.getByRole('textbox', { name: /title/i });
    const author = screen.getByRole('textbox', { name: /author/i });
    const url = screen.getByRole('textbox', { name: /url/i });
    const button = screen.getByRole('button', { name: /create/i });
    await user.type(title, blog.title);
    await user.type(author, blog.author);
    await user.type(url, blog.url);
    await user.click(button);
    expect(mockAddToBlogs.mock.calls).toHaveLength(1);
    expect(mockAddToBlogs.mock.calls[0][0].title).toMatch(blog);
  });
});
