import * as actions from "../cards";

describe("cards actions", () => {
  it("CREATE_CARD: should create an action object", () => {
    const content = "test test";
    expect(actions.createCard(content)).toEqual(
      expect.objectContaining({
        type: "CREATE_CARD",
        payload: expect.objectContaining({
          id: expect.any(String),
          editing: false,
          content
        })
      })
    );
  });

  it("UPDATE_CARD: should create an action object", () => {
    const card = "test test";
    expect(actions.updateCard(card)).toEqual(
      expect.objectContaining({
        type: "UPDATE_CARD",
        payload: card
      })
    );
  });

  it("DELETE_CARD: should create an action object", () => {
    const id = "test";
    expect(actions.deleteCard(id)).toEqual(
      expect.objectContaining({
        type: "DELETE_CARD",
        payload: id
      })
    );
  });
});
