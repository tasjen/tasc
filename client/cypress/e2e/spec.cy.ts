describe("Todo app", () => {
  const user = {
    username: "test_username",
    password: "test_password",
  };
  beforeEach(() => {
    cy.request("POST", "http://localhost:3000/api/testing/reset");
    cy.request("POST", "http://localhost:3000/api/users/", user);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", () => {
    cy.getBySel("login-username").should("be.visible");
    cy.getBySel("login-password").should("be.visible");
  });

  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.getBySel("login-username").type("test_username");
      cy.getBySel("login-password").type("test_password");
      cy.getBySel("login-button").click();
      cy.contains(user.username);
    });

    it("fails with wrong credentials", () => {
      cy.getBySel("login-username").type("test_username");
      cy.getBySel("login-password").type("wrong");
      cy.getBySel("login-button").click();
      cy.contains("invalid username or password")
      cy.getBySel("login-button").should("be.visible");
    });
  });

  describe("When logged in", () => {
    beforeEach(() => {
      cy.login(user);
    });

    it("A project can be created", () => {
      cy.contains("+ Add project").click();
      cy.getBySel("project-name-input").type("test_project_name");
      cy.getBySel('add-project-button').click();
      cy.getBySel('project-list').children().should("have.length", 1)
      cy.contains("test_project_name");
    });
  });
});
