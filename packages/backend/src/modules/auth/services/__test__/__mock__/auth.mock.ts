// Import this named export into your test file:
export const mockUserRegister = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return { userRegister: mockUserRegister };
});

export default mock;
