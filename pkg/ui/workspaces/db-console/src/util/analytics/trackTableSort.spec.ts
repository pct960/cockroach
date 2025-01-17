// Copyright 2020 The Cockroach Authors.
//
// Use of this software is governed by the Business Source License
// included in the file licenses/BSL.txt.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the Apache License, Version 2.0, included in the file
// licenses/APL.txt.

import { get, isString } from "lodash";
import { createSandbox } from "sinon";
import { track } from "./trackTableSort";

const sandbox = createSandbox();

describe("trackTableSort", () => {
  afterEach(() => {
    sandbox.reset();
  });

  it("should only call track once", () => {
    const spy = sandbox.spy();
    track(spy)();
    expect(spy.calledOnce).toBe(true);
  });

  it("should send the right event", () => {
    const spy = sandbox.spy();
    const expected = "Table Sort";

    track(spy)();

    const sent = spy.getCall(0).args[0];
    const event = get(sent, "event");

    expect(isString(event)).toBe(true);
    expect(event === expected).toBe(true);
  });

  it("should send the correct payload", () => {
    const spy = sandbox.spy();
    const tableName = "Test table";
    const title = "test";

    track(spy)(tableName, title, "asc");

    const sent = spy.getCall(0).args[0];
    const table = get(sent, "properties.tableName");
    const columnName = get(sent, "properties.columnName");
    const direction = get(sent, "properties.sortDirection");

    expect(isString(table)).toBe(true);
    expect(table === tableName).toBe(true);

    expect(isString(columnName)).toBe(true);
    expect(title === columnName).toBe(true);

    expect(isString(direction)).toBe(true);
    expect(direction === "asc").toBe(true);
  });
});
