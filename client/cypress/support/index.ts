export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login({
        username,
        password,
      }: {
        username: string;
        password: string;
      }): Chainable<Promise<void>>;
      getBySel(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
