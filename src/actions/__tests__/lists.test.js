import * as actions from "../lists";

describe("lists actions", () => {
  it("should create a list action", () => {
    expect(actions.createList()).toEqual(
      expect.objectContaining({
        type: "CREATE_LIST",
        payload: expect.objectContaining({
          id: expect.any(String),
          name: "New list",
          cards: []
        })
      })
    );
  });

  it("should create an attachToList action object", () => {
    const cardId = 0;
    const listId = 0;
    expect(actions.attachToList(cardId, listId)).toEqual(
      expect.objectContaining({
        type: "ATTACH_TO_LIST",
        payload: expect.objectContaining({
          listId,
          cardId
        })
      })
    );
  });
});
