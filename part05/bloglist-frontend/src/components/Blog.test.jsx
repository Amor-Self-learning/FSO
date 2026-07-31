import { screen, render } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    user: '6a69f297e9c77d7a6e9bb826',
  };
  it('Renders only title and author by default.', () => {
    render(<Blog blog={blog} />);
    const title = screen.getByText(blog.title);
    const author = screen.getByText(blog.author);
    const url = screen.queryByText(blog.url);
    const likes= screen.queryByText(blog.likes);
    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  it('Renders full details when view btn is clicked.', async () => {
    render(<Blog blog={blog} />);
    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);
    const title = screen.getByText(blog.title);
    const author = screen.getByText(blog.author);
    const url = screen.queryByText(blog.url);
    const likes= screen.queryByText(blog.likes);
    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  });

  it('calls handleLikeClick twice when like button is clicked twice', async () => {
    const setMessage = (message) => console.log(message);
    const handleMock = vi.fn();
    render(<Blog blog={blog} setMessage={setMessage} handleLikeClick={handleMock}/>);
    const user = userEvent.setup();
    const viewButton = screen.getByRole('button', { name: 'View' });
    await user.click(viewButton);
    const likeButton = screen.getByRole('button', { name: 'Like' });
    await user.click(likeButton);
    await user.click(likeButton);
    expect(handleMock.mock.calls).toHaveLength(2);
  });
});