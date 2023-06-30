// Import this named export into your test file:
export const mockFindOne = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return { findOne: mockFindOne };
});

export default mock;
