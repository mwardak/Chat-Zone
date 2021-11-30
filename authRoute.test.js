//require fetchUsers from chatpage.js to test fetchUser function
const { fetchUser } = require("./client/src/components/ChatPage.js");

test("should fetch active user from database and tokeb from local storage", () => {
  const user = fetchUser();
  expect(user).to("test");
});
